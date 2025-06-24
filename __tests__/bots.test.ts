import { expect, test } from "vitest";

import { bots } from "@/data/bots";

test("all provided samples should validate against their associated pattern", () => {
  for (let bot of bots) {
    for (let variation of bot.variations) {
      let variationPattern = new RegExp(variation.agent_pattern);
      for (let sample of variation.agent_samples) {
        expect(variationPattern.test(sample)).toBeTruthy();
      }
    }
  }
});
