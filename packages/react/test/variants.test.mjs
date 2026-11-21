import test from "node:test";
import assert from "node:assert/strict";
import {
  alertVariants,
  badgeVariants,
  buttonVariants,
  cardVariants,
  itemVariants,
} from "../lib/widgets/variants.js";

test("buttonVariants", () => {
  assert.equal(buttonVariants(), "button");
  assert.equal(
    buttonVariants({ variant: "primary", size: "sm" }),
    "button button-primary button-sm"
  );
});

test("badgeVariants", () => {
  assert.equal(badgeVariants(), "badge badge-default");
  assert.equal(
    badgeVariants({ variant: "secondary", color: "blue" }),
    "badge badge-secondary badge-color-blue"
  );
});

test("alertVariants", () => {
  assert.equal(alertVariants(), "alert");
  assert.equal(alertVariants({ variant: "info" }), "alert");
  assert.equal(alertVariants({ variant: "destructive" }), "alert alert-destructive");
});

test("itemVariants", () => {
  assert.equal(itemVariants(), "item");
  assert.equal(
    itemVariants({ variant: "outline", size: "sm", interactive: true }),
    "item item-sm item-outline item-interactive"
  );
});

test("cardVariants", () => {
  assert.equal(cardVariants(), "card");
  assert.equal(cardVariants({ size: "sm" }), "card card-sm");
});
