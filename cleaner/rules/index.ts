import { cleanCommonTracker } from "./common-cleaner.ts";
import type { RuleProcessor } from "./rule-type.ts";

export const rules: RuleProcessor[] = [cleanCommonTracker].sort(
  (a, b) => a.priority - b.priority,
);
