import { URLCleanerError } from "./error.ts";

const kv = await Deno.openKv();

const CLEANER_CACHE_KEY = "cleaner_cache";
const APP_VERSION = 1;

export async function getCachedURL(url: string): Promise<string | null> {
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
