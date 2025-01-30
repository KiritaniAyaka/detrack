import { RuleProcessor } from "./rule-type.ts";

export const b23Redirector: RuleProcessor = {
  should: (url) => url.hostname.endsWith("bilibili.com"),
  process: (url) => {
    return new URL(url.origin + url.pathname);
  },
  type: "cleaner",
  priority: 1,
};
