import type React from "react";
import type { ObjectBinding } from "../../compiler/binding.js";

/**
 * LCUI parses boolean attributes from strings such as "true" / "false".
 * JSX authors normally pass real booleans, so both forms are accepted.
 */
export type Booleanish = boolean | "true" | "false";

/**
 * A widget prop may be a plain value or a compile-time binding produced by
 * `useState` / `useRef`. The compiler turns bindings into C expressions.
 */
export type WidgetProp<T> = T | ObjectBinding;

export type ButtonVariant = "outline" | "primary" | "secondary" | "ghost" | "destructive" | "link";

export type ButtonSize =
  "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost";
export type BadgeColor = "blue" | "green" | "sky" | "purple" | "red";
export type AlertVariant = "default" | "info" | "success" | "warning" | "destructive";
export type ItemVariant = "default" | "outline" | "muted";
export type ItemSize = "default" | "sm" | "xs";
export type CardSize = "default" | "sm";
export type Side = "top" | "right" | "bottom" | "left";
export type Align = "start" | "center" | "end";
export type Orientation = "horizontal" | "vertical";

export interface WidgetBaseAttributes {
  $ref?: string | { name: string; current: any };
  className?: string;
  children?: any;
  /** Replaces the component root, or the trigger content for trigger widgets. */
  render?: React.ReactElement;
  [x: string]: any;
}

export interface WidgetAttributes extends WidgetBaseAttributes {}

export type WidgetBaseProps = WidgetBaseAttributes;
export type WidgetProps = WidgetAttributes;

export type FunctionWidget<T = WidgetBaseProps> = ((props: T) => React.ReactElement) & {
  shouldPreRender?: boolean;
};
