import React from "react";
import {
  createContentWidget,
  createTagWidget,
  createWidget,
  mergeClassNames,
  withWidgetMeta,
} from "./factory.js";
import { Button, Icon, Text } from "./base.js";
import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogMediaProps,
  AlertDialogOverlayProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuGroupProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuTriggerProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
  PortalProps,
  SelectContentProps,
  SelectGroupProps,
  SelectItemProps,
  SelectLabelProps,
  SelectProps,
  SelectSeparatorProps,
  SelectTriggerProps,
  SelectValueProps,
  TooltipContentProps,
  TooltipProps,
  TooltipTriggerProps,
} from "./types.js";

export const Dialog = createTagWidget<DialogProps>("dialog");
export const DialogTrigger = createContentWidget<DialogTriggerProps>("dialog-trigger", {
  wrapText: (children) => <Button>{children}</Button>,
});
export const DialogOverlay = createTagWidget<DialogOverlayProps>("dialog-overlay");
export const DialogContent = createTagWidget<DialogContentProps>("dialog-content");
export const DialogHeader = createTagWidget<DialogHeaderProps>("dialog-header");
export const DialogTitle = createTagWidget<DialogTitleProps>("dialog-title");
export const DialogDescription = createTagWidget<DialogDescriptionProps>("dialog-description");
export const DialogFooter = createTagWidget<DialogFooterProps>("dialog-footer");

export const DialogClose = withWidgetMeta<DialogCloseProps>((props) => {
  const { render, children, className, variant, size, ...rest } = props;
  const iconOnly = children == null && render == null;
  const content = children ?? (iconOnly ? <Icon name="dismiss" /> : undefined);
  return (
    <Button
      {...rest}
      render={render}
      variant={variant ?? (iconOnly ? "ghost" : undefined)}
      size={size ?? (iconOnly ? "icon" : undefined)}
      className={mergeClassNames("dialog-close", className)}
      data-dialog-close="true"
    >
      {content}
    </Button>
  );
});

export const AlertDialog = createTagWidget<AlertDialogProps>("alert-dialog");
export const AlertDialogTrigger = createContentWidget<AlertDialogTriggerProps>(
  "alert-dialog-trigger",
  {
    wrapText: (children) => <Button>{children}</Button>,
  }
);
export const AlertDialogOverlay = createTagWidget<AlertDialogOverlayProps>("alert-dialog-overlay");
export const AlertDialogContent = createTagWidget<AlertDialogContentProps>("alert-dialog-content");
export const AlertDialogHeader = createTagWidget<AlertDialogHeaderProps>("alert-dialog-header");
export const AlertDialogMedia = createTagWidget<AlertDialogMediaProps>("alert-dialog-media");
export const AlertDialogTitle = createTagWidget<AlertDialogTitleProps>("alert-dialog-title");
export const AlertDialogDescription = createTagWidget<AlertDialogDescriptionProps>(
  "alert-dialog-description"
);
export const AlertDialogFooter = createTagWidget<AlertDialogFooterProps>("alert-dialog-footer");
export const AlertDialogCancel = createTagWidget<AlertDialogCancelProps>("alert-dialog-cancel");
export const AlertDialogAction = createTagWidget<AlertDialogActionProps>("alert-dialog-action");

export const DropdownMenu = createTagWidget<DropdownMenuProps>("dropdown-menu");
export const DropdownMenuTrigger = createContentWidget<DropdownMenuTriggerProps>(
  "dropdown-menu-trigger",
  {
    wrapText: (children) => <Text>{children}</Text>,
  }
);
export const DropdownMenuContent =
  createTagWidget<DropdownMenuContentProps>("dropdown-menu-content");
export const DropdownMenuGroup = createTagWidget<DropdownMenuGroupProps>("dropdown-menu-group");
export const DropdownMenuLabel = createTagWidget<DropdownMenuLabelProps>("dropdown-menu-label");
export const DropdownMenuItem = createTagWidget<DropdownMenuItemProps>("dropdown-menu-item");
export const DropdownMenuCheckboxItem = createTagWidget<DropdownMenuCheckboxItemProps>(
  "dropdown-menu-checkbox-item"
);
export const DropdownMenuRadioGroup = createTagWidget<DropdownMenuRadioGroupProps>(
  "dropdown-menu-radio-group"
);
export const DropdownMenuRadioItem = createTagWidget<DropdownMenuRadioItemProps>(
  "dropdown-menu-radio-item"
);
export const DropdownMenuSeparator =
  createTagWidget<DropdownMenuSeparatorProps>("dropdown-menu-separator");
export const DropdownMenuShortcut =
  createTagWidget<DropdownMenuShortcutProps>("dropdown-menu-shortcut");
export const DropdownMenuSub = createTagWidget<DropdownMenuSubProps>("dropdown-menu-sub");
export const DropdownMenuSubTrigger = createContentWidget<DropdownMenuSubTriggerProps>(
  "dropdown-menu-sub-trigger",
  {
    wrapText: (children) => <Text>{children}</Text>,
  }
);
export const DropdownMenuSubContent = createTagWidget<DropdownMenuSubContentProps>(
  "dropdown-menu-sub-content"
);

export const Popover = createTagWidget<PopoverProps>("popover");
export const PopoverTrigger = createContentWidget<PopoverTriggerProps>("popover-trigger", {
  wrapText: (children) => <Text>{children}</Text>,
});
export const PopoverContent = createTagWidget<PopoverContentProps>("popover-content");
export const PopoverHeader = createTagWidget<PopoverHeaderProps>("popover-header");
export const PopoverTitle = createTagWidget<PopoverTitleProps>("popover-title");
export const PopoverDescription = createTagWidget<PopoverDescriptionProps>("popover-description");

export const Tooltip = createTagWidget<TooltipProps>("tooltip");
export const TooltipTrigger = createContentWidget<TooltipTriggerProps>("tooltip-trigger", {
  wrapText: (children) => <Text>{children}</Text>,
});
export const TooltipContent = createTagWidget<TooltipContentProps>("tooltip-content");

export const Select = createWidget<SelectProps>("select", {
  normalizeProps: (props) =>
    props.value === undefined && props.defaultValue !== undefined
      ? { ...props, value: props.defaultValue }
      : props,
  omitProps: ["defaultValue"],
});
export const SelectTrigger = createContentWidget<SelectTriggerProps>("select-trigger", {
  wrapText: (children) => <Text>{children}</Text>,
});
export const SelectValue = createTagWidget<SelectValueProps>("select-value");
export const SelectContent = createTagWidget<SelectContentProps>("select-content");
export const SelectGroup = createTagWidget<SelectGroupProps>("select-group");
export const SelectLabel = createTagWidget<SelectLabelProps>("select-label");
export const SelectSeparator = createTagWidget<SelectSeparatorProps>("select-separator");
export const SelectItem = createTagWidget<SelectItemProps>("select-item");

export const Portal = createTagWidget<PortalProps>("portal");
