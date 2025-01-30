import { RuleProcessor } from "./rule-type.ts";

const TRACKER_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "_ga",
  "_gl",
  "ref",
  "source",
  "mc_cid",
  "mc_eid",
]);

export const cleanCommonTracker: RuleProcessor = {
  name: "cleanCommonTracker",
  should: () => true,
  process: (url) => {
    const params = url.searchParams;
    const cleanParams = new URLSearchParams();

    for (const [key, value] of params.entries()) {
      if (!TRACKER_PARAMS.has(key.toLowerCase())) {
        cleanParams.append(key, value);
      }
    }
    url.search = cleanParams.toString();
    return url;
  },
  type: "cleaner",
  priority: -100,
};
