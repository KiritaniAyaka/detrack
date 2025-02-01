import { RuleProcessor } from "./rule-type.ts";
import { fetcha } from "../utils/fetcha.ts";

export const b23Redirector: RuleProcessor = {
  name: "b23Redirector",
  should: (url) => url.hostname === "b23.tv",
  process: async (url) => {
    const response = await fetcha(url);
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
