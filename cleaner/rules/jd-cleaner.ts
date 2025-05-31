import { RuleProcessor } from "./rule-type.ts";

export const jdCleaner: RuleProcessor = {
  name: "jdCleaner",
  should: (url) => url.hostname.endsWith("item.jd.com") || url.hostname.endsWith("item.m.jd.com"),
  process: (url) => {
    return new URL(url.origin + url.pathname);
  },
  type: "cleaner",
  priority: 1,
};
