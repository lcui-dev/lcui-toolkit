import type React from "react";
import type {
  Booleanish,
  ButtonSize,
  ButtonVariant,
  Orientation,
  WidgetBaseAttributes,
  WidgetProp,
} from "./common.js";

export type TextAttributes = WidgetBaseAttributes;
export type TextProps = TextAttributes;

export interface TextInputAttributes extends WidgetBaseAttributes {
  placeholder?: WidgetProp<string>;
  multiline?: WidgetProp<Booleanish>;
  type?: WidgetProp<string>;
  defaultValue?: WidgetProp<string | number>;
  /**
   * textinput 在内部消化 `UI_EVENT_TEXTINPUT` 后派发 `"change"`。
   * 值既可以是 React 回调，也可以是 C 函数名。
   */
  onChange?: React.FormEventHandler<HTMLElement> | string;
}
export type TextInputProps = TextInputAttributes;

export interface LabelAttributes extends WidgetBaseAttributes {
  for?: WidgetProp<string>;
  htmlFor?: WidgetProp<string>;
}
export type LabelProps = LabelAttributes;

export interface CheckboxAttributes extends WidgetBaseAttributes {
  checked?: WidgetProp<Booleanish>;
  indeterminate?: WidgetProp<Booleanish>;
}
export type CheckboxProps = CheckboxAttributes;

export interface RadioGroupAttributes extends WidgetBaseAttributes {
  value?: WidgetProp<string>;
  disabled?: WidgetProp<Booleanish>;
  orientation?: WidgetProp<Orientation>;
}
export type RadioGroupProps = RadioGroupAttributes;

export interface RadioGroupItemAttributes extends WidgetBaseAttributes {
  value?: WidgetProp<string>;
  checked?: WidgetProp<Booleanish>;
  disabled?: WidgetProp<Booleanish>;
}
export type RadioGroupItemProps = RadioGroupItemAttributes;

export interface IconAttributes extends WidgetBaseAttributes {
  library?: WidgetProp<"fluent" | "lucide">;
  name?: WidgetProp<string>;
  size?: WidgetProp<number | string>;
  filled?: WidgetProp<Booleanish>;
}
export type IconProps = IconAttributes;

export interface ProgressAttributes extends WidgetBaseAttributes {
  value?: WidgetProp<number>;
}
export type ProgressProps = ProgressAttributes;

export type ProgressLabelAttributes = WidgetBaseAttributes;
export type ProgressLabelProps = ProgressLabelAttributes;

export type ProgressValueAttributes = WidgetBaseAttributes;
export type ProgressValueProps = ProgressValueAttributes;

export interface SpinnerAttributes extends WidgetBaseAttributes {
  running?: WidgetProp<Booleanish>;
  speed?: WidgetProp<number>;
  angle?: WidgetProp<number>;
}
export type SpinnerProps = SpinnerAttributes;

export type SpinnerContentAttributes = WidgetBaseAttributes;
export type SpinnerContentProps = SpinnerContentAttributes;

export interface ShimmerAttributes extends WidgetBaseAttributes {
  running?: WidgetProp<Booleanish>;
  color?: WidgetProp<string>;
  duration?: WidgetProp<number>;
  spread?: WidgetProp<number>;
  angle?: WidgetProp<number>;
  phase?: WidgetProp<number>;
}
export type ShimmerProps = ShimmerAttributes;

export type ShimmerContentAttributes = WidgetBaseAttributes;
export type ShimmerContentProps = ShimmerContentAttributes;

export interface InputGroupAttributes extends WidgetBaseAttributes {
  disabled?: WidgetProp<Booleanish>;
}
export type InputGroupProps = InputGroupAttributes;

export interface InputGroupAddonAttributes extends WidgetBaseAttributes {
  align?: WidgetProp<"inline-start" | "inline-end" | "block-start" | "block-end">;
}
export type InputGroupAddonProps = InputGroupAddonAttributes;

export type InputGroupTextAttributes = WidgetBaseAttributes;
export type InputGroupTextProps = InputGroupTextAttributes;

export type InputGroupKbdAttributes = WidgetBaseAttributes;
export type InputGroupKbdProps = InputGroupKbdAttributes;

export interface InputGroupInputAttributes extends TextInputAttributes {
  defaultValue?: WidgetProp<string | number>;
}
export type InputGroupInputProps = InputGroupInputAttributes;

export interface InputGroupTextareaAttributes extends TextInputAttributes {
  defaultValue?: WidgetProp<string | number>;
}
export type InputGroupTextareaProps = InputGroupTextareaAttributes;

export interface ButtonAttributes extends WidgetBaseAttributes {
  variant?: WidgetProp<ButtonVariant>;
  size?: WidgetProp<ButtonSize>;
  disabled?: WidgetProp<Booleanish>;
}
export type ButtonProps = ButtonAttributes;

export interface InputGroupButtonAttributes extends ButtonAttributes {
  variant?: WidgetProp<"ghost" | "outline" | "primary" | "secondary" | "destructive" | "link">;
  size?: WidgetProp<"xs" | "icon-xs" | "sm" | "icon-sm">;
  disabled?: WidgetProp<Booleanish>;
}
export type InputGroupButtonProps = InputGroupButtonAttributes;

export interface LinkAttributes extends WidgetBaseAttributes {
  href?: WidgetProp<string>;
  target?: WidgetProp<string>;
}
export type LinkProps = LinkAttributes;

export type AnchorAttributes = LinkAttributes;
export type AnchorProps = AnchorAttributes;

export interface RouterLinkAttributes extends WidgetBaseAttributes {
  to: string;
  exact?: "exact" | "";
  "exact-active-class"?: string;
  "active-class"?: string;
}
export type RouterLinkProps = Omit<RouterLinkAttributes, "exact"> & {
  exact?: boolean;
  exactActiveClass?: string;
  activeClass?: string;
};

export interface RouterViewAttributes extends WidgetBaseAttributes {
  /** @see https://router.vuejs.org/zh/guide/essentials/named-views.html */
  name?: string;
}
export type RouterViewProps = RouterViewAttributes;

export interface ScrollbarAttributes extends WidgetBaseAttributes {
  orientation?: WidgetProp<"horizontal" | "vertical">;
}
export type ScrollbarProps = ScrollbarAttributes;
