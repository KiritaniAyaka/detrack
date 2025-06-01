import { useState } from "preact/hooks";

/**
 * Extracts URLs from a given text.
 * @param text - The text to extract URLs from.
 * @returns An array of extracted URLs.
 */
const extractUrls = (text: string): string[] => {
  const urlRegex =
    /(?:https?:\/\/)?(?:[\w\u0080-\uffff.-]+)\.(?:[\w\u0080-\uffff]{2,})(?:\/[^\s]*)?/g;
  return text.match(urlRegex) || [];
};

/**
 * Detects URLs in a given text.
 * @param input - The text to detect URLs in.
 * @returns An array of detected URLs.
 */
const detectUrl = (input: string) => {
  if (!input.trim()) return;

  const results: string[] = [];

  const urlsWithUnicode = extractUrls(input);
  results.push(...urlsWithUnicode);

  const textParts = input.split(/[\u0080-\uffff]/);
  const urlsWithoutUnicode = textParts
    .flatMap((part) => extractUrls(part))
    .filter((u) => u.length);
  results.push(...urlsWithoutUnicode);

  return [...new Set(results)]
    .filter((url) => url.trim() !== input.trim())
    .sort((a, b) => a.length - b.length);
};

interface DetectedUrlItemProps {
  url: string;
  onClick: () => void;
}

/**
 * URL item component that displays a detected URL with animation.
 */
function DetectedUrlItem({ url, onClick }: DetectedUrlItemProps) {
  return (
    <li
      className="my-2 flex items-center bg-white border border-gray-200 rounded-lg cursor-pointer select-none px-4 py-2 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
      onClick={onClick}
    >
      <div className="flex-shrink-0 mr-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
      </div>
      <span className="text-sm text-gray-700 font-medium break-all">{url}</span>
    </li>
  );
}

export default function URLInput() {
  const [url, setUrl] = useState("");

  const detectedUrls = detectUrl(url);

  return (
    <div>
      <label
        htmlFor="url"
        className="block text-xs font-medium text-gray-700"
      >
        Enter URL
      </label>
      <input
        type="url"
        name="url"
        id="url"
        placeholder="https://example.com?utm_source=..."
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        value={url}
        onInput={(e) => setUrl((e.target as HTMLInputElement).value)}
      />
      {!!detectedUrls?.length && (
        <div className="mt-4 animate-fade-in">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Are you looking for:
          </p>
          <ul className="space-y-2">
            {detectedUrls.map((url) => (
              <DetectedUrlItem
                key={url}
                url={url}
                onClick={() => setUrl(url)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
