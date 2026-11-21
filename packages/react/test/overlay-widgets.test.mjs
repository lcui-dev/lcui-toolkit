import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {
  AlertDialogTrigger,
  Button,
  DialogClose,
  DialogTrigger,
  DropdownMenuTrigger,
  Icon,
  PopoverContent,
  Select,
  SelectItem,
} from "../lib/widgets/index.js";

test("overlay tags", () => {
  assert.equal(PopoverContent({}).type, "popover-content");
  assert.equal(SelectItem({ value: "a" }).type, "select-item");
});

test("Select defaultValue maps to value", () => {
  const el = Select({ defaultValue: "a" });
  assert.equal(el.type, "select");
  assert.equal(el.props.value, "a");
  assert.equal("default-value" in el.props, false);
});

test("DialogTrigger wraps text in a Button", () => {
  const el = DialogTrigger({ children: "Open" });
  assert.equal(el.type, "dialog-trigger");
  assert.equal(el.props.children.type, Button);
});

test("DialogTrigger render keeps prototype root", () => {
  const button = React.createElement("Button", null, "Show");
  const el = AlertDialogTrigger({ render: button });
  assert.equal(el.type, "alert-dialog-trigger");
  assert.equal(el.props.children, button);
});

test("DialogClose defaults to icon button", () => {
  const el = DialogClose({});
  assert.equal(el.type, Button);
  assert.equal(el.props.className, "dialog-close");
  assert.equal(el.props["data-dialog-close"], "true");
  assert.equal(el.props.variant, "ghost");
  assert.equal(el.props.size, "icon");
  assert.equal(el.props.children.type, Icon);
});

test("DialogClose with children keeps text and no icon defaults", () => {
  const el = DialogClose({ children: "Close" });
  assert.equal(el.props.children, "Close");
  assert.equal(el.props.variant, undefined);
  assert.equal(el.props.size, undefined);
});

test("DropdownMenuTrigger keeps element children", () => {
  const button = React.createElement("Button", null, "Open");
  const el = DropdownMenuTrigger({ children: button });
  assert.equal(el.type, "dropdown-menu-trigger");
  assert.equal(el.props.children, button);
});
