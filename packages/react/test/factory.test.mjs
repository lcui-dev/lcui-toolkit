import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {
  createContentWidget,
  createWidget,
  mergeClassNames,
  toWidgetAttributeName,
} from "../lib/widgets/factory.js";

test("converts widget attribute names", () => {
  assert.equal(toWidgetAttributeName("className"), "class");
  assert.equal(toWidgetAttributeName("$ref"), "ref");
  assert.equal(toWidgetAttributeName("htmlFor"), "for");
  assert.equal(toWidgetAttributeName("for"), "for");
  assert.equal(toWidgetAttributeName("defaultValue"), "default-value");
  assert.equal(toWidgetAttributeName("defaultOpen"), "default-open");
  assert.equal(toWidgetAttributeName("sideOffset"), "side-offset");
  assert.equal(toWidgetAttributeName("onClick"), "onClick");
  assert.equal(toWidgetAttributeName("data-path"), "data-path");
});

test("mergeClassNames drops empty values", () => {
  assert.equal(mergeClassNames("a", null, undefined, false, "b"), "a b");
  assert.equal(mergeClassNames(), "");
});

test("createWidget converts props and merges class", () => {
  const Accordion = createWidget("accordion", { className: "base" });
  const el = Accordion({
    className: "extra",
    defaultValue: "a",
    onClick: "handler",
  });
  assert.equal(el.type, "accordion");
  assert.equal(el.props.className, "base extra");
  assert.equal(el.props["default-value"], "a");
  assert.equal(el.props.onClick, "handler");
});

test("render replaces the root and merges props/class/children", () => {
  const Button = createWidget("button");
  const el = Button({
    render: React.createElement("a", { href: "#", className: "link" }),
    className: "extra",
    id: "x",
    children: "Go",
  });
  assert.equal(el.type, "a");
  assert.equal(el.props.className, "link extra");
  assert.equal(el.props.id, "x");
  assert.equal(el.props.children, "Go");
});

test("render target keeps camelCase conversion", () => {
  const Widget = createWidget("widget");
  const el = Widget({
    render: React.createElement("a", { href: "#" }),
    defaultValue: "x",
  });
  assert.equal(el.props["default-value"], "x");
});

test("createContentWidget wraps text children", () => {
  const DialogTrigger = createContentWidget("dialog-trigger", {
    wrapText: (children) => React.createElement("button", null, children),
  });
  const el = DialogTrigger({ children: "Open" });
  assert.equal(el.type, "dialog-trigger");
  assert.equal(el.props.children.type, "button");
  assert.equal(el.props.children.props.children, "Open");
});

test("createContentWidget uses render as content", () => {
  const DialogTrigger = createContentWidget("dialog-trigger");
  const button = React.createElement("button", null, "Open");
  const el = DialogTrigger({ render: button });
  assert.equal(el.type, "dialog-trigger");
  assert.equal(el.props.children, button);
});

test("createWidget getChildren and omitProps", () => {
  const TextInput = createWidget("textinput", {
    getChildren: (props) => props.children ?? props.defaultValue,
    omitProps: ["defaultValue"],
  });
  const el = TextInput({ defaultValue: "hello" });
  assert.equal(el.props.children, "hello");
  assert.equal("defaultValue" in el.props, false);
});
