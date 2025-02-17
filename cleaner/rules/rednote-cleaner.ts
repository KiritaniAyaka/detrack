import { keepSearchParams } from "../utils/url.ts";
import { RuleProcessor } from "./rule-type.ts";

export const rednoteCleaner: RuleProcessor = {
  name: "rednoteCleaner",
  should: (url) =>
    url.hostname.endsWith("xiaohongshu.com") &&
    url.pathname.startsWith("/discovery/item/"),
  process: (url) => {
    // xsec_token is required for visit by web
    return keepSearchParams(url, ["xsec_token"]);
  },
  type: "cleaner",
  priority: 1,
};
