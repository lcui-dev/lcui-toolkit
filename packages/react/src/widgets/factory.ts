import React from "react";
import type { FunctionWidget, WidgetBaseProps } from "./types.js";
import { isObjectBinding } from "../compiler/binding.js";
import { JSXObjectBinding } from "../compiler/jsx-runtime.js";

const ATTRIBUTE_ALIASES: Record<string, string> = {
  className: "class",
  $ref: "ref",
  htmlFor: "for",
};

/**
 * React prop name → LCUI widget attribute name.
 *
 * `onXxx` event props are handled by the compiler and must not be renamed.
 * Other camelCase names become kebab-case, matching C-side `strcmp(name, ...)`
 * checks such as `default-value` and `default-open`.
 */
export function toWidgetAttributeName(name: string): string {
  if (name in ATTRIBUTE_ALIASES) {
    return ATTRIBUTE_ALIASES[name];
  }
  if (name === "for" || /^on[A-Z]/.test(name)) {
    return name;
  }
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function transformWidgetProps(props: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  Object.keys(props).forEach((key) => {
    if (key === "children" || key === "render") {
      return;
    }
    if (key === "style") {
      result.style = props.style;
      return;
    }
    result[toWidgetAttributeName(key)] = props[key];
  });
  return result;
}

export function mergeClassNames(...parts: Array<string | false | null | undefined>): string {
  return parts.filter((part): part is string => Boolean(part)).join(" ");
}

function wrapWidgetChild(child: React.ReactNode): React.ReactNode {
  return isObjectBinding(child) ? React.createElement(JSXObjectBinding, { value: child }) : child;
}

export interface WidgetVariantClasses {
  className: string;
  omit: string[];
}

export interface WidgetOptions<T extends WidgetBaseProps = WidgetBaseProps> {
  className?: string;
  props?: Partial<T>;
  variants?: (props: T) => WidgetVariantClasses | undefined;
  normalizeProps?: (props: T) => Record<string, any>;
  omitProps?: string[];
  getChildren?: (props: T) => React.ReactNode;
}

export function withWidgetMeta<T extends WidgetBaseProps>(
  render: (props: T) => React.ReactElement
): FunctionWidget<T> {
  const widget = ((props: T) => render(props)) as FunctionWidget<T>;
  widget.shouldPreRender = true;
  return widget;
}

function resolveStyleProps<T extends WidgetBaseProps>(
  props: T,
  options: WidgetOptions<T>
): Record<string, any> {
  const normalized = options.normalizeProps ? options.normalizeProps(props) : props;
  const result = { ...options.props, ...normalized } as Record<string, any>;
  (options.omitProps ?? []).forEach((key) => {
    delete result[key];
  });
  return result;
}

export function createWidget<T extends WidgetBaseProps>(
  tag: string,
  options: WidgetOptions<T> = {}
): FunctionWidget<T> {
  return withWidgetMeta<T>((props: T) => {
    const { render, children, className, ...rest } = props as T & {
      render?: React.ReactElement;
      children?: React.ReactNode;
      className?: string;
    };
    const merged = resolveStyleProps(rest as T, options);
    const resolvedChildren = wrapWidgetChild(
      options.getChildren ? options.getChildren({ ...props, ...merged } as T) : children
    );

    if (render) {
      const renderProps = (render.props ?? {}) as Record<string, any>;
      const isNativeTarget = typeof render.type === "string";
      let variantClassName: string | undefined;

      if (isNativeTarget && render.type !== tag && options.variants) {
        const variant = options.variants({ ...props, ...merged } as T);
        if (variant) {
          variantClassName = variant.className;
          variant.omit.forEach((key) => {
            delete merged[key];
          });
        }
      }

      const nextProps: Record<string, any> = isNativeTarget ? transformWidgetProps(merged) : merged;
      const nextClassName = mergeClassNames(
        variantClassName,
        options.className,
        renderProps.className,
        className
      );

      return React.cloneElement(render, {
        ...nextProps,
        ...(nextClassName ? { className: nextClassName } : {}),
        children: resolvedChildren ?? renderProps.children,
      } as any);
    }

    const elementProps = transformWidgetProps(merged);
    const elementClassName = mergeClassNames(options.className, className);
    if (elementClassName) {
      elementProps.className = elementClassName;
    }
    elementProps.children = resolvedChildren;
    return React.createElement(tag, elementProps);
  });
}

export function createTagWidget<T extends WidgetBaseProps>(
  tag: string,
  options: WidgetOptions<T> = {}
): FunctionWidget<T> {
  return createWidget(tag, options);
}

export interface ContentWidgetOptions<T extends WidgetBaseProps = WidgetBaseProps> {
  className?: string;
  props?: Partial<T>;
  wrapText?: (children: React.ReactNode) => React.ReactElement;
}

function isTextOnly(children: React.ReactNode): boolean {
  const items = React.Children.toArray(children);
  return (
    items.length > 0 && items.every((item) => typeof item === "string" || typeof item === "number")
  );
}

export function createContentWidget<T extends WidgetBaseProps>(
  tag: string,
  options: ContentWidgetOptions<T> = {}
): FunctionWidget<T> {
  return withWidgetMeta<T>((props: T) => {
    const { render, children, className } = props as T & {
      render?: React.ReactElement;
      children?: React.ReactNode;
      className?: string;
    };
    const content = wrapWidgetChild(
      render ?? (isTextOnly(children) && options.wrapText ? options.wrapText(children) : children)
    );

    return React.createElement(
      tag,
      transformWidgetProps({
        ...options.props,
        ...props,
        className: mergeClassNames(options.className, className),
      }),
      content
    );
  });
}
