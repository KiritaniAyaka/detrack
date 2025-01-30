/// <reference lib="deno.unstable" />

import { URLCleanerError } from "./error.ts";

const kv = await Deno.openKv("cleaner_cache.db");
const ENABLE_CACHE = Deno.env.get("CACGE")?.startsWith("e");

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

export async function getCachedURL(url: string): Promise<string | null> {
  if (!ENABLE_CACHE) return null;

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
    await kv.set(key, cleanedUrl);
  } catch (error) {
    console.error("Failed to cache URL:", error);
    throw new URLCleanerError("Failed to cache URL");
  }
}
