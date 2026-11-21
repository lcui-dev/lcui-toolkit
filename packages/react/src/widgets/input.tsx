import React from "react";
import { createTagWidget, createWidget, mergeClassNames, withWidgetMeta } from "./factory.js";
import { Button } from "./base.js";
import type {
  InputGroupAddonProps,
  InputGroupButtonProps,
  InputGroupInputProps,
  InputGroupKbdProps,
  InputGroupProps,
  InputGroupTextareaProps,
  InputGroupTextProps,
} from "./types.js";

export const InputGroup = createTagWidget<InputGroupProps>("input-group");
export const InputGroupAddon = createTagWidget<InputGroupAddonProps>("input-group-addon");
export const InputGroupText = createTagWidget<InputGroupTextProps>("input-group-text");
export const InputGroupKbd = createTagWidget<InputGroupKbdProps>("input-group-kbd");

export const InputGroupInput = createWidget<InputGroupInputProps>("textinput", {
  className: "input-group-input input-group-control",
  getChildren: (props) => props.children ?? props.defaultValue,
  omitProps: ["defaultValue"],
});

export const InputGroupTextarea = createWidget<InputGroupTextareaProps>("textinput", {
  className: "input-group-textarea input-group-control",
  props: { multiline: true },
  getChildren: (props) => props.children ?? props.defaultValue,
  omitProps: ["defaultValue"],
});

export const InputGroupButton = withWidgetMeta<InputGroupButtonProps>((props) => {
  const { render, variant, size, className, ...rest } = props;
  return (
    <Button
      {...rest}
      render={render}
      variant={variant ?? "ghost"}
      size={size ?? "xs"}
      className={mergeClassNames("input-group-button", className)}
    />
  );
});
