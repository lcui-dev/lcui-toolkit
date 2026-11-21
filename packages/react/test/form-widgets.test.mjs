import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {
  Button,
  Checkbox,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
  Progress,
  TextInput,
} from "../lib/widgets/index.js";

test("TextInput converts defaultValue to text", () => {
  const el = TextInput({ defaultValue: "hello" });
  assert.equal(el.type, "textinput");
  assert.equal(el.props.children, "hello");
});

test("TextInput render keeps defaultValue as children", () => {
  const el = TextInput({
    render: React.createElement("a", { href: "#" }),
    defaultValue: "hello",
  });
  assert.equal(el.type, "a");
  assert.equal(el.props.children, "hello");
  assert.equal("defaultValue" in el.props, false);
  assert.equal("default-value" in el.props, false);
});

test("InputGroupInput has control classes", () => {
  const el = InputGroupInput({ defaultValue: "x", className: "extra" });
  assert.equal(el.type, "textinput");
  assert.equal(el.props.className, "input-group-input input-group-control extra");
  assert.equal(el.props.children, "x");
});

test("InputGroupTextarea enables multiline", () => {
  const el = InputGroupTextarea({ placeholder: "x" });
  assert.equal(el.type, "textinput");
  assert.equal(el.props.multiline, true);
  assert.equal(el.props.className, "input-group-textarea input-group-control");
});

test("InputGroupButton defaults to ghost xs", () => {
  const el = InputGroupButton({ children: "Go" });
  assert.equal(el.type, Button);
  assert.equal(el.props.variant, "ghost");
  assert.equal(el.props.size, "xs");
  assert.equal(el.props.className, "input-group-button");
});

test("Button render to anchor adds variant classes", () => {
  const anchor = React.createElement("a", { href: "#", className: "link" });
  const el = Button({ render: anchor, variant: "primary", size: "sm", children: "Go" });
  assert.equal(el.type, "a");
  assert.equal(el.props.className, "button button-primary button-sm link");
  assert.equal("variant" in el.props, false);
  assert.equal("size" in el.props, false);
});

test("Progress maps tag and value", () => {
  const el = Progress({ value: 20 });
  assert.equal(el.type, "progress");
  assert.equal(el.props.value, 20);
});

test("Checkbox maps boolean props", () => {
  const el = Checkbox({ checked: true, indeterminate: false });
  assert.equal(el.type, "checkbox");
  assert.equal(el.props.checked, true);
  assert.equal(el.props.indeterminate, false);
});
