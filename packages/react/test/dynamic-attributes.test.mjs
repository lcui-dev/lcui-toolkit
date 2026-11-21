import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import compile from "../lib/compiler/compile.js";
import { CType, useState } from "../lib/index.js";

function NumberDemo() {
  const [value] = useState(20, CType.Int);
  return React.createElement("progress", { value });
}

function BoolDemo() {
  const [checked] = useState(true);
  return React.createElement("checkbox", { checked });
}

test("dynamic number attribute becomes set_attr", () => {
  const result = compile(NumberDemo, {}, { name: "number_demo" });
  assert.equal(result.node.attributes.value, undefined);
  assert.match(result.reactCode, /ui_widget_set_attr\(w, "value",/);
});

test("dynamic boolean attribute stringifies to true/false", () => {
  const result = compile(BoolDemo, {}, { name: "bool_demo" });
  assert.equal(result.node.attributes.checked, undefined);
  assert.match(result.reactCode, /ui_widget_set_attr\(w, "checked",/);
  assert.match(result.reactCode, /\? "true" : "false"/);
});
