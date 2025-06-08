import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";

interface Props {
  url: string;
}

export default function CopyButton({ url }: Props) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = async () => {
    if (!IS_BROWSER || showSuccess) return;
    setShowSuccess(true);
    await Promise.all([
      navigator.clipboard.writeText(url),
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]);
    setShowSuccess(false);
  };

  return (
    <button
      onClick={handleClick}
      class="p-2 text-gray-500 hover:text-gray-700 hover:bg-[rgba(0,0,0,0.05)] rounded-full transition-colors"
      title="Copy to clipboard"
      type="button"
    >
      {showSuccess
        ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-green-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )
        : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
            />
          </svg>
        )}
    </button>
  );
}
