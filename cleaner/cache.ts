/// <reference lib="deno.unstable" />
import { createLogger } from "@kiritaniayaka/logging";
import { URLCleanerError } from "./error.ts";

// if DENO_DEPLOYMENT_ID exists, it runs on Deno Deploy
// Deno Deploy doesn't support path-specified database
const kv = await Deno.openKv(
  Deno.env.get("DENO_DEPLOYMENT_ID") ? undefined : "cleaner_cache.db",
);

const ENABLE_CACHE = !Deno.env.get("CACHE")?.toLowerCase()?.startsWith(
  "disable",
);

const CLEANER_CACHE_KEY = "cleaner_cache";
const APP_VERSION = 1;

const teardown = () => {
  kv.close();
  Deno.exit(0);
};

Deno.addSignalListener("SIGINT", teardown);
if (Deno.build.os !== "windows") {
  Deno.addSignalListener("SIGTERM", teardown);
}

const logger = createLogger("Cache");

export async function getCachedURL(url: string): Promise<string | null> {
  if (!ENABLE_CACHE) {
    logger.info("Cache skipped because it's disabled");
    return null;
  }

  const key = [CLEANER_CACHE_KEY, APP_VERSION, url];
  const result = await kv.get<string>(key);
  return result.value;
}

export async function setCachedURL(
  originalUrl: string,
  cleanedUrl: string,
): Promise<void> {
  const key = [CLEANER_CACHE_KEY, APP_VERSION, originalUrl];
  try {
    logger.info("Caching URL:", originalUrl, "->", cleanedUrl);
    await kv.set(key, cleanedUrl);
  } catch (error) {
    logger.error("Failed to cache URL:", error);
    throw new URLCleanerError("Failed to cache URL");
  }
}
