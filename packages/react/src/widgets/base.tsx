import { createTagWidget, createWidget } from "./factory.js";
import { buttonVariants } from "./variants.js";
import type {
  ButtonProps,
  CheckboxProps,
  IconProps,
  LabelProps,
  LinkProps,
  ProgressLabelProps,
  ProgressProps,
  ProgressValueProps,
  RadioGroupItemProps,
  RadioGroupProps,
  ShimmerContentProps,
  ShimmerProps,
  SpinnerContentProps,
  SpinnerProps,
  TextInputProps,
  TextProps,
  WidgetProps,
} from "./types.js";

export const Text = createTagWidget<TextProps>("text");
export const TextInput = createWidget<TextInputProps>("textinput", {
  getChildren: (props) => props.children ?? props.defaultValue,
  omitProps: ["defaultValue"],
});
export const Link = createTagWidget<LinkProps>("a");
export const Button = createWidget<ButtonProps>("button", {
  variants: (props) => ({
    className: buttonVariants(props as any),
    omit: ["variant", "size"],
  }),
});
export const Widget = createTagWidget<WidgetProps>("widget");
export const Icon = createTagWidget<IconProps>("icon");
export const Label = createTagWidget<LabelProps>("label");
export const Checkbox = createTagWidget<CheckboxProps>("checkbox");
export const RadioGroup = createTagWidget<RadioGroupProps>("radio-group");
export const RadioGroupItem = createTagWidget<RadioGroupItemProps>("radio-group-item");
export const Progress = createTagWidget<ProgressProps>("progress");
export const ProgressLabel = createTagWidget<ProgressLabelProps>("progress-label");
export const ProgressValue = createTagWidget<ProgressValueProps>("progress-value");
export const Spinner = createTagWidget<SpinnerProps>("spinner");
export const SpinnerContent = createTagWidget<SpinnerContentProps>("spinner-content");
export const Shimmer = createTagWidget<ShimmerProps>("shimmer");
export const ShimmerContent = createTagWidget<ShimmerContentProps>("shimmer-content");
