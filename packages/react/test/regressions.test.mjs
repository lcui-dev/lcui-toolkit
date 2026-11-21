import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import compile from "../lib/compiler/compile.js";
import { Button, CType, Link, TextInput, useRef, useState } from "../lib/index.js";

function StyleDemo() {
  return React.createElement("text", { style: { color: "red" } }, "x");
}

test("style reaches the compiled node", () => {
  const result = compile(StyleDemo, {}, { name: "style_demo" });
  assert.deepEqual(result.node.attributes.style, { color: "red" });
});

function RefDemo() {
  const inputRef = useRef();
  return React.createElement("textinput", { ref: inputRef });
}

test("useRef ref attribute compiles", () => {
  const result = compile(RefDemo, {}, { name: "ref_demo" });
  assert.ok(result.refs.length > 0);
});

function RenderLinkDemo() {
  return React.createElement(Button, { render: React.createElement(Link, { href: "#" }) }, "Go");
}

test("render target that is another widget does not recurse", () => {
  const result = compile(RenderLinkDemo, {}, { name: "render_link_demo" });
  assert.equal(result.node.name, "a");
});

function InputBindingDemo() {
  const [name] = useState(10, CType.Int);
  return React.createElement(TextInput, { defaultValue: name });
}

test("TextInput defaultValue accepts an ObjectBinding", () => {
  const result = compile(InputBindingDemo, {}, { name: "input_binding_demo" });
  assert.match(result.reactCode, /ui_widget_set_text/);
});

function IntrinsicCamelCaseDemo() {
  const [open] = useState(true);
  return React.createElement("collapsible", { defaultOpen: open });
}

test("intrinsic camelCase attributes become kebab-case", () => {
  const result = compile(IntrinsicCamelCaseDemo, {}, { name: "intrinsic_demo" });
  assert.match(result.reactCode, /"default-open"/);
});
