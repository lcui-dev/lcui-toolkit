import type { Align, Booleanish, Side, WidgetBaseAttributes, WidgetProp } from "./common.js";
import type { ButtonAttributes } from "./form.js";

export interface DialogAttributes extends WidgetBaseAttributes {
  open?: WidgetProp<Booleanish>;
  showCloseButton?: WidgetProp<Booleanish>;
  "show-close-button"?: WidgetProp<Booleanish>;
}
export type DialogProps = DialogAttributes;
export type DialogTriggerAttributes = WidgetBaseAttributes;
export type DialogTriggerProps = DialogTriggerAttributes;
export type DialogOverlayAttributes = WidgetBaseAttributes;
export type DialogOverlayProps = DialogOverlayAttributes;
export type DialogContentAttributes = WidgetBaseAttributes;
export type DialogContentProps = DialogContentAttributes;
export type DialogHeaderAttributes = WidgetBaseAttributes;
export type DialogHeaderProps = DialogHeaderAttributes;
export type DialogTitleAttributes = WidgetBaseAttributes;
export type DialogTitleProps = DialogTitleAttributes;
export type DialogDescriptionAttributes = WidgetBaseAttributes;
export type DialogDescriptionProps = DialogDescriptionAttributes;
export type DialogFooterAttributes = WidgetBaseAttributes;
export type DialogFooterProps = DialogFooterAttributes;
export interface DialogCloseAttributes extends ButtonAttributes {}
export type DialogCloseProps = DialogCloseAttributes;

export interface AlertDialogAttributes extends WidgetBaseAttributes {
  open?: WidgetProp<Booleanish>;
}
export type AlertDialogProps = AlertDialogAttributes;
export type AlertDialogTriggerAttributes = WidgetBaseAttributes;
export type AlertDialogTriggerProps = AlertDialogTriggerAttributes;
export type AlertDialogOverlayAttributes = WidgetBaseAttributes;
export type AlertDialogOverlayProps = AlertDialogOverlayAttributes;
export interface AlertDialogContentAttributes extends WidgetBaseAttributes {
  size?: WidgetProp<"default" | "sm">;
}
export type AlertDialogContentProps = AlertDialogContentAttributes;
export type AlertDialogHeaderAttributes = WidgetBaseAttributes;
export type AlertDialogHeaderProps = AlertDialogHeaderAttributes;
export type AlertDialogMediaAttributes = WidgetBaseAttributes;
export type AlertDialogMediaProps = AlertDialogMediaAttributes;
export type AlertDialogTitleAttributes = WidgetBaseAttributes;
export type AlertDialogTitleProps = AlertDialogTitleAttributes;
export type AlertDialogDescriptionAttributes = WidgetBaseAttributes;
export type AlertDialogDescriptionProps = AlertDialogDescriptionAttributes;
export type AlertDialogFooterAttributes = WidgetBaseAttributes;
export type AlertDialogFooterProps = AlertDialogFooterAttributes;
export type AlertDialogCancelAttributes = ButtonAttributes;
export type AlertDialogCancelProps = AlertDialogCancelAttributes;
export type AlertDialogActionAttributes = ButtonAttributes;
export type AlertDialogActionProps = AlertDialogActionAttributes;

export interface DropdownMenuAttributes extends WidgetBaseAttributes {
  defaultOpen?: WidgetProp<Booleanish>;
  "default-open"?: WidgetProp<Booleanish>;
  open?: WidgetProp<Booleanish>;
  matchTriggerWidth?: WidgetProp<Booleanish>;
  "match-trigger-width"?: WidgetProp<Booleanish>;
}
export type DropdownMenuProps = DropdownMenuAttributes;
export type DropdownMenuTriggerAttributes = WidgetBaseAttributes;
export type DropdownMenuTriggerProps = DropdownMenuTriggerAttributes;
export interface DropdownMenuContentAttributes extends WidgetBaseAttributes {
  side?: WidgetProp<Side>;
  align?: WidgetProp<Align>;
  sideOffset?: WidgetProp<number>;
  "side-offset"?: WidgetProp<number>;
  alignOffset?: WidgetProp<number>;
  "align-offset"?: WidgetProp<number>;
}
export type DropdownMenuContentProps = DropdownMenuContentAttributes;
export type DropdownMenuGroupAttributes = WidgetBaseAttributes;
export type DropdownMenuGroupProps = DropdownMenuGroupAttributes;
export type DropdownMenuLabelAttributes = WidgetBaseAttributes;
export type DropdownMenuLabelProps = DropdownMenuLabelAttributes;
export interface DropdownMenuItemAttributes extends WidgetBaseAttributes {
  disabled?: WidgetProp<Booleanish>;
  variant?: WidgetProp<"default" | "destructive">;
}
export type DropdownMenuItemProps = DropdownMenuItemAttributes;
export interface DropdownMenuCheckboxItemAttributes extends WidgetBaseAttributes {
  checked?: WidgetProp<Booleanish>;
  disabled?: WidgetProp<Booleanish>;
  variant?: WidgetProp<"default" | "destructive">;
}
export type DropdownMenuCheckboxItemProps = DropdownMenuCheckboxItemAttributes;
export interface DropdownMenuRadioGroupAttributes extends WidgetBaseAttributes {
  value?: WidgetProp<string>;
}
export type DropdownMenuRadioGroupProps = DropdownMenuRadioGroupAttributes;
export interface DropdownMenuRadioItemAttributes extends WidgetBaseAttributes {
  value?: WidgetProp<string>;
  disabled?: WidgetProp<Booleanish>;
}
export type DropdownMenuRadioItemProps = DropdownMenuRadioItemAttributes;
export type DropdownMenuSeparatorAttributes = WidgetBaseAttributes;
export type DropdownMenuSeparatorProps = DropdownMenuSeparatorAttributes;
export type DropdownMenuShortcutAttributes = WidgetBaseAttributes;
export type DropdownMenuShortcutProps = DropdownMenuShortcutAttributes;
export interface DropdownMenuSubAttributes extends WidgetBaseAttributes {
  defaultOpen?: WidgetProp<Booleanish>;
  "default-open"?: WidgetProp<Booleanish>;
  open?: WidgetProp<Booleanish>;
}
export type DropdownMenuSubProps = DropdownMenuSubAttributes;
export interface DropdownMenuSubTriggerAttributes extends WidgetBaseAttributes {
  disabled?: WidgetProp<Booleanish>;
}
export type DropdownMenuSubTriggerProps = DropdownMenuSubTriggerAttributes;
export interface DropdownMenuSubContentAttributes extends DropdownMenuContentAttributes {}
export type DropdownMenuSubContentProps = DropdownMenuSubContentAttributes;

export interface PopoverAttributes extends WidgetBaseAttributes {
  open?: WidgetProp<Booleanish>;
}
export type PopoverProps = PopoverAttributes;
export type PopoverTriggerAttributes = WidgetBaseAttributes;
export type PopoverTriggerProps = PopoverTriggerAttributes;
export interface PopoverContentAttributes extends WidgetBaseAttributes {
  side?: WidgetProp<Side>;
  align?: WidgetProp<Align>;
  sideOffset?: WidgetProp<number>;
  "side-offset"?: WidgetProp<number>;
  alignOffset?: WidgetProp<number>;
  "align-offset"?: WidgetProp<number>;
}
export type PopoverContentProps = PopoverContentAttributes;
export type PopoverHeaderAttributes = WidgetBaseAttributes;
export type PopoverHeaderProps = PopoverHeaderAttributes;
export type PopoverTitleAttributes = WidgetBaseAttributes;
export type PopoverTitleProps = PopoverTitleAttributes;
export type PopoverDescriptionAttributes = WidgetBaseAttributes;
export type PopoverDescriptionProps = PopoverDescriptionAttributes;

export interface TooltipAttributes extends WidgetBaseAttributes {
  delay?: WidgetProp<number>;
}
export type TooltipProps = TooltipAttributes;
export type TooltipTriggerAttributes = WidgetBaseAttributes;
export type TooltipTriggerProps = TooltipTriggerAttributes;
export interface TooltipContentAttributes extends WidgetBaseAttributes {
  side?: WidgetProp<Side>;
  align?: WidgetProp<Align>;
  sideOffset?: WidgetProp<number>;
  "side-offset"?: WidgetProp<number>;
  alignOffset?: WidgetProp<number>;
  "align-offset"?: WidgetProp<number>;
}
export type TooltipContentProps = TooltipContentAttributes;

export interface SelectAttributes extends WidgetBaseAttributes {
  value?: WidgetProp<string>;
  defaultValue?: WidgetProp<string>;
  placeholder?: WidgetProp<string>;
  disabled?: WidgetProp<Booleanish>;
  alignItemWithTrigger?: WidgetProp<Booleanish>;
  "align-item-with-trigger"?: WidgetProp<Booleanish>;
}
export type SelectProps = SelectAttributes;
export type SelectTriggerAttributes = WidgetBaseAttributes;
export type SelectTriggerProps = SelectTriggerAttributes;
export interface SelectValueAttributes extends WidgetBaseAttributes {
  placeholder?: WidgetProp<string>;
}
export type SelectValueProps = SelectValueAttributes;
export type SelectContentAttributes = WidgetBaseAttributes;
export type SelectContentProps = SelectContentAttributes;
export type SelectGroupAttributes = WidgetBaseAttributes;
export type SelectGroupProps = SelectGroupAttributes;
export type SelectLabelAttributes = WidgetBaseAttributes;
export type SelectLabelProps = SelectLabelAttributes;
export type SelectSeparatorAttributes = WidgetBaseAttributes;
export type SelectSeparatorProps = SelectSeparatorAttributes;
export interface SelectItemAttributes extends WidgetBaseAttributes {
  value?: WidgetProp<string>;
  disabled?: WidgetProp<Booleanish>;
}
export type SelectItemProps = SelectItemAttributes;

export type PortalAttributes = WidgetBaseAttributes;
export type PortalProps = PortalAttributes;
