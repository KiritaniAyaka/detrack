import { RuleProcessor } from "../rules/rule-type.ts";
import { fetcha } from "./fetcha.ts";

interface HttpRedirectorOption {
  name: string;
  hostname: string;
}

export function createHttpRedirector({
  name,
  hostname,
}: HttpRedirectorOption): RuleProcessor {
  return {
    name,
    should: (url) => url.hostname === hostname,
    process: async (url) => {
      const response = await fetcha(url);
      console.log(response.status);
      if (!String(response.status).startsWith("3")) return url;

      const location = response.headers.get("Location");
      if (location) {
        return new URL(location);
      }
      return url;
    },
    type: "redirector",
    priority: 999,
  };
}
