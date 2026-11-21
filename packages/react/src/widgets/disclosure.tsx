import React from "react";
import { createContentWidget, createWidget } from "./factory.js";
import { Text } from "./base.js";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from "./types.js";

export const Accordion = createWidget<AccordionProps>("accordion");
export const AccordionItem = createWidget<AccordionItemProps>("accordion-item");
export const AccordionTrigger = createContentWidget<AccordionTriggerProps>("accordion-trigger", {
  wrapText: (children) => <Text>{children}</Text>,
});
export const AccordionContent = createWidget<AccordionContentProps>("accordion-content");

export const Collapsible = createWidget<CollapsibleProps>("collapsible");
export const CollapsibleTrigger = createContentWidget<CollapsibleTriggerProps>(
  "collapsible-trigger",
  {
    wrapText: (children) => <Text>{children}</Text>,
  }
);
export const CollapsibleContent = createWidget<CollapsibleContentProps>("collapsible-content");
