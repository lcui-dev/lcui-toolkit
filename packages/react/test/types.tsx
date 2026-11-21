import React from "react";
import type {
  AccordionAttributes,
  AlertAttributes,
  BadgeAttributes,
  ButtonAttributes,
  CardAttributes,
  DialogAttributes,
  DropdownMenuContentAttributes,
  InputGroupInputAttributes,
  ItemAttributes,
  SelectAttributes,
  SidebarProviderAttributes,
  TextInputAttributes,
  TooltipContentAttributes,
} from "../src/widgets/types.js";

const accordion: AccordionAttributes = {
  multiple: true,
  defaultValue: "item-1",
  "default-value": "item-1",
};
const button: ButtonAttributes = { variant: "primary", size: "sm", disabled: true };
const badge: BadgeAttributes = { variant: "secondary", color: "blue" };
const alert: AlertAttributes = { variant: "success" };
const card: CardAttributes = { size: "sm" };
const dialog: DialogAttributes = { open: true, showCloseButton: false };
const content: DropdownMenuContentAttributes = {
  side: "right",
  align: "start",
  sideOffset: 4,
  "side-offset": 4,
};
const input: InputGroupInputAttributes = {
  placeholder: "Search",
  defaultValue: "a",
};
const item: ItemAttributes = { variant: "outline", size: "sm", interactive: true };
const select: SelectAttributes = {
  value: "a",
  placeholder: "Pick",
  alignItemWithTrigger: false,
  "align-item-with-trigger": false,
};
const provider: SidebarProviderAttributes = { defaultOpen: false, open: true };
const textInput: TextInputAttributes = { placeholder: "x", multiline: true };
const tooltip: TooltipContentAttributes = { side: "top", sideOffset: 4 };

void [
  accordion,
  button,
  badge,
  alert,
  card,
  dialog,
  content,
  input,
  item,
  select,
  provider,
  textInput,
  tooltip,
];

const element = (
  <widget>
    <accordion default-value="a" />
    <textinput placeholder="x" />
    <dropdown-menu />
    <button variant="primary">Save</button>
  </widget>
);
void element;
