import { mergeClassNames } from "./factory.js";
import type {
  AlertVariant,
  BadgeColor,
  BadgeVariant,
  ButtonSize,
  ButtonVariant,
  CardSize,
  ItemSize,
  ItemVariant,
} from "./attributes/common.js";

export interface ButtonVariantOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function buttonVariants({
  variant = "outline",
  size = "default",
}: ButtonVariantOptions = {}): string {
  return mergeClassNames(
    "button",
    variant !== "outline" && `button-${variant}`,
    size !== "default" && `button-${size}`
  );
}

export interface BadgeVariantOptions {
  variant?: BadgeVariant;
  color?: BadgeColor;
}

export function badgeVariants({ variant = "default", color }: BadgeVariantOptions = {}): string {
  return mergeClassNames("badge", `badge-${variant}`, color && `badge-color-${color}`);
}

export interface AlertVariantOptions {
  variant?: AlertVariant;
}

export function alertVariants({ variant = "default" }: AlertVariantOptions = {}): string {
  return mergeClassNames(
    "alert",
    variant !== "default" && variant !== "info" && `alert-${variant}`
  );
}

export interface ItemVariantOptions {
  variant?: ItemVariant;
  size?: ItemSize;
  interactive?: boolean;
}

export function itemVariants({
  variant = "default",
  size = "default",
  interactive = false,
}: ItemVariantOptions = {}): string {
  return mergeClassNames(
    "item",
    size !== "default" && `item-${size}`,
    variant !== "default" && `item-${variant}`,
    interactive && "item-interactive"
  );
}

export interface CardVariantOptions {
  size?: CardSize;
}

export function cardVariants({ size = "default" }: CardVariantOptions = {}): string {
  return mergeClassNames("card", size !== "default" && `card-${size}`);
}
