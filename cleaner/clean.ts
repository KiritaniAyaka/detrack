import { URLCleanerError } from "./error.ts";
import { rules } from "./rules/index.ts";
import { getCachedURL, setCachedURL } from "./cache.ts";
import { createLogger } from "@kiritaniayaka/logging";

const logger = createLogger("Cleaner");

export async function cleanURL(urlString: string): Promise<string> {
  try {
    let url = new URL(urlString);
    logger.info("Start cleaning:", urlString);
    const cached = await getCachedURL(url.toString());
    if (cached) {
      logger.info("Cache hit:", cached);
      return cached;
    }

    for (const rule of rules) {
      if (rule.should(url)) {
        logger.info("Rule matched:", rule.name);
        url = await rule.process(url);
        logger.info("Rule processed:", url.toString());
      }
    }

    const result = url.toString();
    await setCachedURL(urlString, result);
    return result;
  } catch (error: unknown) {
    if (error instanceof URLCleanerError) {
      throw error;
    }
    throw new URLCleanerError("Invalid URL provided");
  }
}
