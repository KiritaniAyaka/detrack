import { createLogger } from "@kiritaniayaka/logging";
import { fetcha } from "../utils/fetcha.ts";
import { findStrBetween } from "../utils/str-between.ts";
import { RuleProcessor } from "./rule-type.ts";
import { keepSearchParams, removeAllSearchParams } from "../utils/url.ts";

const logger = createLogger("TaobaoCleaner");

export const taobaoCleaner: RuleProcessor = {
  name: "taobaoCleaner",
  should: (url) => url.hostname === "e.tb.cn",
  process: async (url) => {
    url = removeAllSearchParams(url);
    const response = await fetcha(url);
    const text = await response.text();
    const targetUrlString = findStrBetween(text, `var url = '`, `';`);
    if (!targetUrlString) {
      logger.warn("Rule matched but cannot extract target URL.");
      return url;
    }
    const targetUrl = keepSearchParams(new URL(targetUrlString), ["id"]);
    return targetUrl;
  },
  type: "redirector", // may also be a cleaner?
  priority: 999,
};
