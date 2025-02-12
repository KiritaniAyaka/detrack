export function findStrBetween(
  str: string,
  before: string,
  after: string,
): string | null {
  const startIndex = str.indexOf(before);
  if (startIndex === -1) {
    return null;
  }

  const endIndex = str.indexOf(after, startIndex + before.length);
  if (endIndex === -1) {
    return null;
  }

  return str.substring(startIndex + before.length, endIndex);
}
