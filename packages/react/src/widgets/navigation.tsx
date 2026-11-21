import React from "react";
import {
  createContentWidget,
  createTagWidget,
  mergeClassNames,
  withWidgetMeta,
} from "./factory.js";
import { Button, Text } from "./base.js";
import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
  SidebarContentProps,
  SidebarFooterProps,
  SidebarGroupActionProps,
  SidebarGroupContentProps,
  SidebarGroupLabelProps,
  SidebarGroupProps,
  SidebarHeaderProps,
  SidebarMenuActionProps,
  SidebarMenuBadgeProps,
  SidebarMenuButtonProps,
  SidebarMenuItemProps,
  SidebarMenuProps,
  SidebarMenuSubButtonProps,
  SidebarMenuSubItemProps,
  SidebarMenuSubProps,
  SidebarProps,
  SidebarProviderProps,
  SidebarRailProps,
  SidebarTriggerProps,
} from "./types.js";

export const Breadcrumb = createTagWidget<BreadcrumbProps>("breadcrumb");
export const BreadcrumbList = createTagWidget<BreadcrumbListProps>("breadcrumb-list");
export const BreadcrumbItem = createTagWidget<BreadcrumbItemProps>("breadcrumb-item");
export const BreadcrumbLink = createTagWidget<BreadcrumbLinkProps>("breadcrumb-link");
export const BreadcrumbPage = createTagWidget<BreadcrumbPageProps>("breadcrumb-page");
export const BreadcrumbSeparator =
  createTagWidget<BreadcrumbSeparatorProps>("breadcrumb-separator");
export const BreadcrumbEllipsis = createTagWidget<BreadcrumbEllipsisProps>("breadcrumb-ellipsis");

export const SidebarProvider = createTagWidget<SidebarProviderProps>("sidebar-provider");
export const Sidebar = createTagWidget<SidebarProps>("sidebar");
export const SidebarRail = createTagWidget<SidebarRailProps>("sidebar-rail");
export const SidebarHeader = createTagWidget<SidebarHeaderProps>("sidebar-header");
export const SidebarFooter = createTagWidget<SidebarFooterProps>("sidebar-footer");
export const SidebarContent = createTagWidget<SidebarContentProps>("sidebar-content");
export const SidebarGroup = createTagWidget<SidebarGroupProps>("sidebar-group");
export const SidebarGroupLabel = createTagWidget<SidebarGroupLabelProps>("sidebar-group-label");
export const SidebarGroupAction = createTagWidget<SidebarGroupActionProps>("sidebar-group-action");
export const SidebarGroupContent =
  createTagWidget<SidebarGroupContentProps>("sidebar-group-content");
export const SidebarMenu = createTagWidget<SidebarMenuProps>("sidebar-menu");
export const SidebarMenuItem = createTagWidget<SidebarMenuItemProps>("sidebar-menu-item");
export const SidebarMenuAction = createTagWidget<SidebarMenuActionProps>("sidebar-menu-action");
export const SidebarMenuSub = createTagWidget<SidebarMenuSubProps>("sidebar-menu-sub");
export const SidebarMenuSubItem = createTagWidget<SidebarMenuSubItemProps>("sidebar-menu-sub-item");
export const SidebarMenuBadge = createTagWidget<SidebarMenuBadgeProps>("sidebar-menu-badge");

export const SidebarTrigger = createContentWidget<SidebarTriggerProps>("sidebar-trigger", {
  wrapText: (children) => <Text>{children}</Text>,
});

export const SidebarMenuButton = withWidgetMeta<SidebarMenuButtonProps>((props) => {
  const { className, ...rest } = props;
  return <Button {...rest} className={mergeClassNames("sidebar-menu-button", className)} />;
});

export const SidebarMenuSubButton = withWidgetMeta<SidebarMenuSubButtonProps>((props) => {
  const { className, ...rest } = props;
  return <Button {...rest} className={mergeClassNames("sidebar-menu-sub-button", className)} />;
});
