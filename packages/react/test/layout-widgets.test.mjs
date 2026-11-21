import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { Alert, Badge, Card, CardHeader, Item, ItemMedia } from "../lib/widgets/index.js";

test("layout tags", () => {
  assert.equal(Card({}).type, "card");
  assert.equal(CardHeader({}).type, "card-header");
  assert.equal(Item({}).type, "item");
  assert.equal(ItemMedia({ variant: "image" }).type, "item-media");
});

test("Badge render adds badge classes", () => {
  const el = Badge({
    render: React.createElement("a", { href: "#" }),
    variant: "secondary",
    color: "blue",
  });
  assert.equal(el.type, "a");
  assert.equal(el.props.className, "badge badge-secondary badge-color-blue");
  assert.equal("variant" in el.props, false);
  assert.equal("color" in el.props, false);
});

test("Card render adds card size class", () => {
  const el = Card({ render: React.createElement("div"), size: "sm" });
  assert.equal(el.props.className, "card card-sm");
  assert.equal("size" in el.props, false);
});

test("Item render adds item variant classes", () => {
  const el = Item({
    render: React.createElement("div"),
    variant: "outline",
    size: "sm",
    interactive: true,
  });
  assert.equal(el.props.className, "item item-sm item-outline item-interactive");
});

test("Alert render adds alert variant class", () => {
  const el = Alert({ render: React.createElement("div"), variant: "destructive" });
  assert.equal(el.props.className, "alert alert-destructive");
});
