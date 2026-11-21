import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  SidebarMenuButton,
  SidebarProvider,
} from "../lib/widgets/index.js";

test("navigation tags", () => {
  assert.equal(Breadcrumb({ path: "/a/b" }).type, "breadcrumb");
  assert.equal(BreadcrumbItem({}).type, "breadcrumb-item");
  assert.equal(SidebarProvider({ defaultOpen: false }).type, "sidebar-provider");
});

test("SidebarMenuButton adds class and keeps button props", () => {
  const el = SidebarMenuButton({ className: "extra", children: "Home" });
  assert.equal(el.type, Button);
  assert.equal(el.props.className, "sidebar-menu-button extra");
});

test("SidebarMenuButton render merges class", () => {
  const wrapper = SidebarMenuButton({
    render: React.createElement("a", { href: "#", className: "x" }),
    className: "extra",
  });
  assert.equal(wrapper.type, Button);
  const el = Button(wrapper.props);
  assert.equal(el.type, "a");
  assert.equal(el.props.className.includes("sidebar-menu-button"), true);
  assert.equal(el.props.className.includes("extra"), true);
});
