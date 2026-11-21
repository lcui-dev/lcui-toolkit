import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  CollapsibleTrigger,
  Text,
} from "../lib/widgets/index.js";

test("disclosure tags", () => {
  assert.equal(Accordion({ multiple: true }).type, "accordion");
  assert.equal(AccordionItem({ value: "a" }).type, "accordion-item");
});

test("AccordionTrigger wraps text in Text", () => {
  const el = AccordionTrigger({ children: "Title" });
  assert.equal(el.type, "accordion-trigger");
  assert.equal(el.props.children.type, Text);
});

test("CollapsibleTrigger render keeps prototype root", () => {
  const button = React.createElement("Button", null, "Open");
  const el = CollapsibleTrigger({ render: button });
  assert.equal(el.type, "collapsible-trigger");
  assert.equal(el.props.children, button);
});
