import type {
  AlertVariant,
  BadgeColor,
  BadgeVariant,
  Booleanish,
  CardSize,
  ItemSize,
  ItemVariant,
  Orientation,
  WidgetBaseAttributes,
  WidgetProp,
} from "./common.js";
import type { ButtonAttributes } from "./form.js";

export interface BadgeAttributes extends WidgetBaseAttributes {
  variant?: WidgetProp<BadgeVariant>;
  color?: WidgetProp<BadgeColor>;
}
export type BadgeProps = BadgeAttributes;

export interface CardAttributes extends WidgetBaseAttributes {
  size?: WidgetProp<CardSize>;
}
export type CardProps = CardAttributes;

export type CardHeaderAttributes = WidgetBaseAttributes;
export type CardHeaderProps = CardHeaderAttributes;
export type CardTitleAttributes = WidgetBaseAttributes;
export type CardTitleProps = CardTitleAttributes;
export type CardDescriptionAttributes = WidgetBaseAttributes;
export type CardDescriptionProps = CardDescriptionAttributes;
export type CardActionAttributes = WidgetBaseAttributes;
export type CardActionProps = CardActionAttributes;
export type CardContentAttributes = WidgetBaseAttributes;
export type CardContentProps = CardContentAttributes;
export type CardFooterAttributes = WidgetBaseAttributes;
export type CardFooterProps = CardFooterAttributes;

export interface ItemAttributes extends WidgetBaseAttributes {
  variant?: WidgetProp<ItemVariant>;
  size?: WidgetProp<ItemSize>;
  interactive?: WidgetProp<Booleanish>;
}
export type ItemProps = ItemAttributes;

export interface ItemMediaAttributes extends WidgetBaseAttributes {
  variant?: WidgetProp<"default" | "icon" | "image">;
}
export type ItemMediaProps = ItemMediaAttributes;

export type ItemContentAttributes = WidgetBaseAttributes;
export type ItemContentProps = ItemContentAttributes;
export type ItemTitleAttributes = WidgetBaseAttributes;
export type ItemTitleProps = ItemTitleAttributes;
export type ItemDescriptionAttributes = WidgetBaseAttributes;
export type ItemDescriptionProps = ItemDescriptionAttributes;
export type ItemActionsAttributes = WidgetBaseAttributes;
export type ItemActionsProps = ItemActionsAttributes;

export type EmptyAttributes = WidgetBaseAttributes;
export type EmptyProps = EmptyAttributes;
export type EmptyHeaderAttributes = WidgetBaseAttributes;
export type EmptyHeaderProps = EmptyHeaderAttributes;
export interface EmptyMediaAttributes extends WidgetBaseAttributes {
  variant?: WidgetProp<"default" | "icon">;
}
export type EmptyMediaProps = EmptyMediaAttributes;
export type EmptyTitleAttributes = WidgetBaseAttributes;
export type EmptyTitleProps = EmptyTitleAttributes;
export type EmptyDescriptionAttributes = WidgetBaseAttributes;
export type EmptyDescriptionProps = EmptyDescriptionAttributes;
export type EmptyContentAttributes = WidgetBaseAttributes;
export type EmptyContentProps = EmptyContentAttributes;
export type EmptyActionAttributes = WidgetBaseAttributes;
export type EmptyActionProps = EmptyActionAttributes;

export interface FieldAttributes extends WidgetBaseAttributes {
  orientation?: WidgetProp<Orientation>;
}
export type FieldProps = FieldAttributes;
export type FieldSetAttributes = WidgetBaseAttributes;
export type FieldSetProps = FieldSetAttributes;
export type FieldLegendAttributes = WidgetBaseAttributes;
export type FieldLegendProps = FieldLegendAttributes;
export type FieldGroupAttributes = WidgetBaseAttributes;
export type FieldGroupProps = FieldGroupAttributes;
export interface FieldLabelAttributes extends WidgetBaseAttributes {
  for?: WidgetProp<string>;
  htmlFor?: WidgetProp<string>;
}
export type FieldLabelProps = FieldLabelAttributes;
export type FieldDescriptionAttributes = WidgetBaseAttributes;
export type FieldDescriptionProps = FieldDescriptionAttributes;
export type FieldSeparatorAttributes = WidgetBaseAttributes;
export type FieldSeparatorProps = FieldSeparatorAttributes;
export type FieldContentAttributes = WidgetBaseAttributes;
export type FieldContentProps = FieldContentAttributes;
export type FieldTitleAttributes = WidgetBaseAttributes;
export type FieldTitleProps = FieldTitleAttributes;

export interface AttachmentAttributes extends WidgetBaseAttributes {
  state?: WidgetProp<"idle" | "uploading" | "processing" | "error" | "done">;
  size?: WidgetProp<"default" | "sm" | "xs">;
  orientation?: WidgetProp<Orientation>;
}
export type AttachmentProps = AttachmentAttributes;

export interface AttachmentMediaAttributes extends WidgetBaseAttributes {
  variant?: WidgetProp<"icon" | "image">;
  src?: WidgetProp<string>;
}
export type AttachmentMediaProps = AttachmentMediaAttributes;
export type AttachmentContentAttributes = WidgetBaseAttributes;
export type AttachmentContentProps = AttachmentContentAttributes;
export type AttachmentTitleAttributes = WidgetBaseAttributes;
export type AttachmentTitleProps = AttachmentTitleAttributes;
export type AttachmentDescriptionAttributes = WidgetBaseAttributes;
export type AttachmentDescriptionProps = AttachmentDescriptionAttributes;
export type AttachmentActionsAttributes = WidgetBaseAttributes;
export type AttachmentActionsProps = AttachmentActionsAttributes;
export interface AttachmentActionAttributes extends ButtonAttributes {
  size?: WidgetProp<"icon-xs" | "icon-sm" | "icon">;
}
export type AttachmentActionProps = AttachmentActionAttributes;
export type AttachmentTriggerAttributes = ButtonAttributes;
export type AttachmentTriggerProps = AttachmentTriggerAttributes;
export type AttachmentGroupAttributes = WidgetBaseAttributes;
export type AttachmentGroupProps = AttachmentGroupAttributes;

export interface ButtonGroupAttributes extends WidgetBaseAttributes {
  orientation?: WidgetProp<Orientation>;
}
export type ButtonGroupProps = ButtonGroupAttributes;
export type ButtonGroupTextAttributes = WidgetBaseAttributes;
export type ButtonGroupTextProps = ButtonGroupTextAttributes;
export interface ButtonGroupSeparatorAttributes extends WidgetBaseAttributes {
  orientation?: WidgetProp<Orientation>;
}
export type ButtonGroupSeparatorProps = ButtonGroupSeparatorAttributes;

export interface AlertAttributes extends WidgetBaseAttributes {
  variant?: WidgetProp<AlertVariant>;
}
export type AlertProps = AlertAttributes;
export type AlertContentAttributes = WidgetBaseAttributes;
export type AlertContentProps = AlertContentAttributes;
export type AlertTitleAttributes = WidgetBaseAttributes;
export type AlertTitleProps = AlertTitleAttributes;
export type AlertDescriptionAttributes = WidgetBaseAttributes;
export type AlertDescriptionProps = AlertDescriptionAttributes;
export type AlertActionAttributes = WidgetBaseAttributes;
export type AlertActionProps = AlertActionAttributes;
