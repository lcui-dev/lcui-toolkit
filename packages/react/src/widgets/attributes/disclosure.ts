import type { Booleanish, WidgetBaseAttributes, WidgetProp } from "./common.js";

export interface AccordionAttributes extends WidgetBaseAttributes {
  multiple?: WidgetProp<Booleanish>;
  defaultValue?: WidgetProp<string>;
  "default-value"?: WidgetProp<string>;
  value?: WidgetProp<string>;
}
export type AccordionProps = AccordionAttributes;

export interface AccordionItemAttributes extends WidgetBaseAttributes {
  value?: WidgetProp<string>;
  open?: WidgetProp<Booleanish>;
  disabled?: WidgetProp<Booleanish>;
}
export type AccordionItemProps = AccordionItemAttributes;

export interface AccordionTriggerAttributes extends WidgetBaseAttributes {
  chevron?: WidgetProp<Booleanish>;
}
export type AccordionTriggerProps = AccordionTriggerAttributes;

export type AccordionContentAttributes = WidgetBaseAttributes;
export type AccordionContentProps = AccordionContentAttributes;

export interface CollapsibleAttributes extends WidgetBaseAttributes {
  defaultOpen?: WidgetProp<Booleanish>;
  "default-open"?: WidgetProp<Booleanish>;
  open?: WidgetProp<Booleanish>;
}
export type CollapsibleProps = CollapsibleAttributes;

export type CollapsibleTriggerAttributes = WidgetBaseAttributes;
export type CollapsibleTriggerProps = CollapsibleTriggerAttributes;
export type CollapsibleContentAttributes = WidgetBaseAttributes;
export type CollapsibleContentProps = CollapsibleContentAttributes;
