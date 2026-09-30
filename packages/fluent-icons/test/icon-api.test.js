import assert from "node:assert/strict";
import test from "node:test";
import { Checkmark, Icon } from "../dist/index.js";

test("Icon defaults to regular 24 CSS content and emits no glyph text", () => {
  const element = Icon({ name: "checkmark" });

  assert.equal(element.type, "text");
  assert.match(element.props.className, /(?:^|\s)fui-icon-checkmark(?:\s|$)/);
  assert.match(element.props.className, /(?:^|\s)fui-icon(?:\s|$)/);
  assert.doesNotMatch(element.props.className, /(?:^|\s)checkmark(?:\s|$)/);
  assert.equal(element.props.style.fontSize, undefined);
  assert.equal(element.props.children, undefined);
});

test("filled selects the matching font class and semantic class", () => {
  const element = Icon({ name: "checkmark", filled: true });

  assert.match(element.props.className, /(?:^|\s)fui-icon(?:\s|$)/);
  assert.match(element.props.className, /(?:^|\s)fui-icon-filled(?:\s|$)/);
  assert.match(element.props.className, /(?:^|\s)fui-icon-checkmark(?:\s|$)/);
  assert.doesNotMatch(element.props.className, /(?:^|\s)filled(?:\s|$)/);
  assert.equal(element.props.children, undefined);
});

test("size selects a semantic glyph class while fontSize remains visual", () => {
  const element = Icon({ name: "checkmark", size: 48 });
  const visualSize = Icon({ name: "checkmark", fontSize: 20 });

  assert.match(element.props.className, /(?:^|\s)fui-icon-glyph-48(?:\s|$)/);
  assert.equal(element.props.style.fontSize, "48px");
  assert.doesNotMatch(visualSize.props.className, /fui-icon-glyph-/);
  assert.equal(visualSize.props.style.fontSize, "20px");
});

test("missing regular 24 uses the nearest regular base glyph", () => {
  const element = Icon({ name: "arrow-curve-down-right" });

  assert.match(element.props.className, /(?:^|\s)fui-icon-arrow-curve-down-right(?:\s|$)/);
  assert.doesNotMatch(element.props.className, /fui-icon-glyph-/);
  assert.equal(element.props.style.fontSize, undefined);
});

test("a name without a representable regular glyph reports it as unavailable", () => {
  assert.throws(() => Icon({ name: "flag-pride" }), /no regular glyph available/i);
});

test("missing filled 24 reports the unavailable filled style", () => {
  assert.throws(() => Icon({ name: "clover", filled: true }), /no filled 24px glyph available/i);
});

test("missing non-default size warns and retains the base classes", () => {
  const originalWarn = console.warn;
  const warnings = [];
  console.warn = (message) => warnings.push(String(message));
  try {
    const element = Icon({ name: "checkmark", size: 999 });
    assert.match(element.props.className, /(?:^|\s)fui-icon-checkmark(?:\s|$)/);
    assert.doesNotMatch(element.props.className, /fui-icon-glyph-999/);
    assert.ok(warnings.some((warning) => warning.includes("999")));
  } finally {
    console.warn = originalWarn;
  }
});

test("per-icon exports delegate to CSS-backed Icon without glyph text", () => {
  const element = Checkmark({ title: "check" });

  assert.equal(element.type.name, "Icon");
  assert.equal(element.props.children, undefined);
});

test("exports a minimal typed icon map without internal style flags", async () => {
  const { iconMap } = await import("../dist/index.js");
  const checkmark = iconMap.checkmark;

  assert.equal(typeof checkmark.regular[24], "number");
  assert.equal(typeof checkmark.filled[24], "number");
  assert.equal("hasRegularStyle" in checkmark, false);
  assert.equal("hasFilledStyle" in checkmark, false);
});
