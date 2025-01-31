// @ts-types="npm:@types/user-agents@1.0.4"
import UserAgent from "user-agents";
import { RuleProcessor } from "./rule-type.ts";

export const b23Redirector: RuleProcessor = {
  name: "b23Redirector",
  should: (url) => url.hostname === "b23.tv",
  process: async (url) => {
    const response = await fetch(url, {
      redirect: "manual",
      headers: {
        "User-Agent": new UserAgent().toString(),
      },
    });
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
