import React from "react";
import { createTagWidget, createWidget, mergeClassNames, withWidgetMeta } from "./factory.js";
import { Button } from "./base.js";
import { alertVariants, badgeVariants, cardVariants, itemVariants } from "./variants.js";
import type {
  AlertActionProps,
  AlertContentProps,
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
  AttachmentActionProps,
  AttachmentActionsProps,
  AttachmentContentProps,
  AttachmentDescriptionProps,
  AttachmentGroupProps,
  AttachmentMediaProps,
  AttachmentProps,
  AttachmentTitleProps,
  AttachmentTriggerProps,
  BadgeProps,
  ButtonGroupProps,
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
  EmptyActionProps,
  EmptyContentProps,
  EmptyDescriptionProps,
  EmptyHeaderProps,
  EmptyMediaProps,
  EmptyProps,
  EmptyTitleProps,
  FieldContentProps,
  FieldDescriptionProps,
  FieldGroupProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldProps,
  FieldSeparatorProps,
  FieldSetProps,
  FieldTitleProps,
  ItemActionsProps,
  ItemContentProps,
  ItemDescriptionProps,
  ItemMediaProps,
  ItemProps,
  ItemTitleProps,
} from "./types.js";

export const Badge = createWidget<BadgeProps>("badge", {
  variants: (props) => ({
    className: badgeVariants(props as any),
    omit: ["variant", "color"],
  }),
});

export const Card = createWidget<CardProps>("card", {
  variants: (props) => ({
    className: cardVariants(props as any),
    omit: ["size"],
  }),
});
export const CardHeader = createTagWidget<CardHeaderProps>("card-header");
export const CardTitle = createTagWidget<CardTitleProps>("card-title");
export const CardDescription = createTagWidget<CardDescriptionProps>("card-description");
export const CardAction = createTagWidget<CardActionProps>("card-action");
export const CardContent = createTagWidget<CardContentProps>("card-content");
export const CardFooter = createTagWidget<CardFooterProps>("card-footer");

export const Item = createWidget<ItemProps>("item", {
  variants: (props) => ({
    className: itemVariants(props as any),
    omit: ["variant", "size", "interactive"],
  }),
});
export const ItemMedia = createTagWidget<ItemMediaProps>("item-media");
export const ItemContent = createTagWidget<ItemContentProps>("item-content");
export const ItemTitle = createTagWidget<ItemTitleProps>("item-title");
export const ItemDescription = createTagWidget<ItemDescriptionProps>("item-description");
export const ItemActions = createTagWidget<ItemActionsProps>("item-actions");

export const Empty = createTagWidget<EmptyProps>("empty");
export const EmptyHeader = createTagWidget<EmptyHeaderProps>("empty-header");
export const EmptyMedia = createTagWidget<EmptyMediaProps>("empty-media");
export const EmptyTitle = createTagWidget<EmptyTitleProps>("empty-title");
export const EmptyDescription = createTagWidget<EmptyDescriptionProps>("empty-description");
export const EmptyContent = createTagWidget<EmptyContentProps>("empty-content");
export const EmptyAction = createTagWidget<EmptyActionProps>("empty-action");

export const Field = createTagWidget<FieldProps>("field");
export const FieldSet = createTagWidget<FieldSetProps>("field-set");
export const FieldLegend = createTagWidget<FieldLegendProps>("field-legend");
export const FieldGroup = createTagWidget<FieldGroupProps>("field-group");
export const FieldLabel = createTagWidget<FieldLabelProps>("field-label");
export const FieldDescription = createTagWidget<FieldDescriptionProps>("field-description");
export const FieldSeparator = createTagWidget<FieldSeparatorProps>("field-separator");
export const FieldContent = createTagWidget<FieldContentProps>("field-content");
export const FieldTitle = createTagWidget<FieldTitleProps>("field-title");

export const Attachment = createTagWidget<AttachmentProps>("attachment");
export const AttachmentMedia = createTagWidget<AttachmentMediaProps>("attachment-media");
export const AttachmentContent = createTagWidget<AttachmentContentProps>("attachment-content");
export const AttachmentTitle = createTagWidget<AttachmentTitleProps>("attachment-title");
export const AttachmentDescription =
  createTagWidget<AttachmentDescriptionProps>("attachment-description");
export const AttachmentActions = createTagWidget<AttachmentActionsProps>("attachment-actions");
export const AttachmentTrigger = createTagWidget<AttachmentTriggerProps>("attachment-trigger");
export const AttachmentGroup = createTagWidget<AttachmentGroupProps>("attachment-group");

export const AttachmentAction = withWidgetMeta<AttachmentActionProps>((props) => {
  const { render, variant, size, className, ...rest } = props;
  return (
    <Button
      {...rest}
      render={render}
      variant={variant ?? "ghost"}
      size={size ?? "icon-xs"}
      className={mergeClassNames("attachment-action", className)}
    />
  );
});

export const ButtonGroup = createTagWidget<ButtonGroupProps>("button-group");
export const ButtonGroupText = createTagWidget<ButtonGroupTextProps>("button-group-text");
export const ButtonGroupSeparator =
  createTagWidget<ButtonGroupSeparatorProps>("button-group-separator");

export const Alert = createWidget<AlertProps>("alert", {
  variants: (props) => ({
    className: alertVariants(props as any),
    omit: ["variant"],
  }),
});
export const AlertContent = createTagWidget<AlertContentProps>("alert-content");
export const AlertTitle = createTagWidget<AlertTitleProps>("alert-title");
export const AlertDescription = createTagWidget<AlertDescriptionProps>("alert-description");
export const AlertAction = createTagWidget<AlertActionProps>("alert-action");
