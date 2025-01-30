import { URLCleanerError } from "./error.ts";
import { rules } from "./rules/index.ts";

export async function cleanURL(urlString: string): Promise<string> {
  try {
    let url = new URL(urlString);
    for (const rule of rules) {
      if (rule.should(url)) {
        url = await rule.process(url);
      }
    }
    return url.toString();
  } catch (_error: unknown) {
    throw new URLCleanerError("Invalid URL provided");
  }
}
