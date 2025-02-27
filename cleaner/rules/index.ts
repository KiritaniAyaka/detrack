import { cleanCommonTracker } from "./common-cleaner.ts";
import { bilibiliCleaner } from "./bilibili-cleaner.ts";
import { b23Redirector } from "./b23-redirector.ts";
import { taobaoCleaner } from "./taobao-cleaner.ts";
import { rednoteCleaner } from "./rednote-cleaner.ts";
import { bossZhipinCleaner } from "./boss-zhipin-cleaner.ts";
import type { RuleProcessor } from "./rule-type.ts";

const originalRules = [
  cleanCommonTracker,
  bilibiliCleaner,
  b23Redirector,
  taobaoCleaner,
  rednoteCleaner,
  bossZhipinCleaner,
];

export const rules: RuleProcessor[] = originalRules.sort(
  (a, b) => b.priority - a.priority,
);
