export function removeAllSearchParams(url: URL): URL {
  const newUrl = new URL(url.toString());
  newUrl.search = "";
  return newUrl;
}

/**
 * Preserve the specified query parameters in the URL.
 * @param url URL object
 * @param paramsToKeep The names of the query parameters to keep
 * @returns New URL object
 */
export function keepSearchParams(url: URL, paramsToKeep: string[] = []): URL {
  const newUrl = new URL(url.toString());
  const params = new URLSearchParams(newUrl.search);
  const currentParams = Array.from(params.keys());

  currentParams.forEach((param) => {
    if (!paramsToKeep.includes(param)) {
      params.delete(param);
    }
  });

  newUrl.search = params.toString();
  return newUrl;
}

/**
 * Remove the specified query parameters from the URL.
 * @param url URL object
 * @param paramsToRemove The names of the query parameters to remove
 * @returns New URL object
 */
export function removeSearchParams(
  url: URL,
  paramsToRemove: string[] = [],
): URL {
  const newUrl = new URL(url.toString());
  const params = new URLSearchParams(newUrl.search);

  paramsToRemove.forEach((param) => params.delete(param));

  newUrl.search = params.toString();
  return newUrl;
}
