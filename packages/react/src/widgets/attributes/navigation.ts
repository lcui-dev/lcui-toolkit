import type { Booleanish, WidgetBaseAttributes, WidgetProp } from "./common.js";
import type { ButtonAttributes } from "./form.js";

export interface BreadcrumbAttributes extends WidgetBaseAttributes {
  path?: WidgetProp<string>;
  separator?: WidgetProp<string>;
  "collapse-from"?: WidgetProp<number>;
  collapseFrom?: WidgetProp<number>;
}
export type BreadcrumbProps = BreadcrumbAttributes;
export type BreadcrumbListAttributes = WidgetBaseAttributes;
export type BreadcrumbListProps = BreadcrumbListAttributes;
export interface BreadcrumbItemAttributes extends WidgetBaseAttributes {
  "data-path"?: string;
  "data-key"?: string;
  "data-label"?: string;
}
export type BreadcrumbItemProps = BreadcrumbItemAttributes;
export type BreadcrumbLinkAttributes = WidgetBaseAttributes;
export type BreadcrumbLinkProps = BreadcrumbLinkAttributes;
export type BreadcrumbPageAttributes = WidgetBaseAttributes;
export type BreadcrumbPageProps = BreadcrumbPageAttributes;
export type BreadcrumbSeparatorAttributes = WidgetBaseAttributes;
export type BreadcrumbSeparatorProps = BreadcrumbSeparatorAttributes;
export type BreadcrumbEllipsisAttributes = WidgetBaseAttributes;
export type BreadcrumbEllipsisProps = BreadcrumbEllipsisAttributes;

export interface SidebarProviderAttributes extends WidgetBaseAttributes {
  defaultOpen?: WidgetProp<Booleanish>;
  "default-open"?: WidgetProp<Booleanish>;
  open?: WidgetProp<Booleanish>;
}
export type SidebarProviderProps = SidebarProviderAttributes;

export interface SidebarAttributes extends WidgetBaseAttributes {
  collapsible?: WidgetProp<"offcanvas" | "icon" | "none">;
  side?: WidgetProp<"left" | "right">;
}
export type SidebarProps = SidebarAttributes;

export type SidebarTriggerAttributes = WidgetBaseAttributes;
export type SidebarTriggerProps = SidebarTriggerAttributes;
export type SidebarRailAttributes = WidgetBaseAttributes;
export type SidebarRailProps = SidebarRailAttributes;
export type SidebarHeaderAttributes = WidgetBaseAttributes;
export type SidebarHeaderProps = SidebarHeaderAttributes;
export type SidebarFooterAttributes = WidgetBaseAttributes;
export type SidebarFooterProps = SidebarFooterAttributes;
export type SidebarContentAttributes = WidgetBaseAttributes;
export type SidebarContentProps = SidebarContentAttributes;
export type SidebarGroupAttributes = WidgetBaseAttributes;
export type SidebarGroupProps = SidebarGroupAttributes;
export interface SidebarGroupLabelAttributes extends WidgetBaseAttributes {
  "data-collapsible-trigger"?: WidgetProp<Booleanish>;
  dataCollapsibleTrigger?: WidgetProp<Booleanish>;
}
export type SidebarGroupLabelProps = SidebarGroupLabelAttributes;
export type SidebarGroupActionAttributes = WidgetBaseAttributes;
export type SidebarGroupActionProps = SidebarGroupActionAttributes;
export type SidebarGroupContentAttributes = WidgetBaseAttributes;
export type SidebarGroupContentProps = SidebarGroupContentAttributes;
export type SidebarMenuAttributes = WidgetBaseAttributes;
export type SidebarMenuProps = SidebarMenuAttributes;
export type SidebarMenuItemAttributes = WidgetBaseAttributes;
export type SidebarMenuItemProps = SidebarMenuItemAttributes;
export type SidebarMenuActionAttributes = WidgetBaseAttributes;
export type SidebarMenuActionProps = SidebarMenuActionAttributes;
export type SidebarMenuSubAttributes = WidgetBaseAttributes;
export type SidebarMenuSubProps = SidebarMenuSubAttributes;
export type SidebarMenuSubItemAttributes = WidgetBaseAttributes;
export type SidebarMenuSubItemProps = SidebarMenuSubItemAttributes;
export type SidebarMenuBadgeAttributes = WidgetBaseAttributes;
export type SidebarMenuBadgeProps = SidebarMenuBadgeAttributes;

export interface SidebarMenuButtonAttributes extends ButtonAttributes {
  render?: import("react").ReactElement;
}
export type SidebarMenuButtonProps = SidebarMenuButtonAttributes;

export interface SidebarMenuSubButtonAttributes extends ButtonAttributes {
  render?: import("react").ReactElement;
}
export type SidebarMenuSubButtonProps = SidebarMenuSubButtonAttributes;

export type ScrollAreaAttributes = WidgetBaseAttributes;
export type ScrollAreaProps = ScrollAreaAttributes;
export type ScrollAreaContentAttributes = WidgetBaseAttributes;
export type ScrollAreaContentProps = ScrollAreaContentAttributes;
