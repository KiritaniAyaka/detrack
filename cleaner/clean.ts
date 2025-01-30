import { URLCleanerError } from "./error.ts";
import { rules } from "./rules/index.ts";
import { getCachedURL, setCachedURL } from "./cache.ts";

export async function cleanURL(urlString: string): Promise<string> {
  console.log("Start cleaning:", urlString);
  try {
    let url = new URL(urlString);
    const cached = await getCachedURL(url.toString());
    if (cached) {
      console.log("Cache hit:", cached);
      return cached;
    }

    for (const rule of rules) {
      if (rule.should(url)) {
        console.log("Rule matched:", rule.name);
        url = await rule.process(url);
        console.log("Rule processed:", url.toString());
      }
    }

    const result = url.toString();
    await setCachedURL(urlString, result);
    console.log("Cache set:", result);
    return result;
  } catch (error: unknown) {
    if (error instanceof URLCleanerError) {
      throw error;
    }
    throw new URLCleanerError("Invalid URL provided");
  }
}
