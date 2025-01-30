import { RuleProcessor } from "./rule-type.ts";

export const b23Redirector: RuleProcessor = {
  should: (url) => url.hostname === "b23.tv",
  process: async (url) => {
    const response = await fetch(url);
    if (response.status !== 302) return url;

    const location = response.headers.get("Location");
    if (location) {
      return new URL(location);
    }
    return url;
  },
  type: "redirector",
  priority: 999,
};
