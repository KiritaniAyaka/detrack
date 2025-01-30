import { RuleProcessor } from "./rule-type.ts";

export const bilibiliCleaner: RuleProcessor = {
  name: "bilibiliCleaner",
  should: (url) => url.hostname.endsWith("bilibili.com"),
  process: (url) => {
    return new URL(url.origin + url.pathname);
  },
  type: "cleaner",
  priority: 1,
};
