import { cleanURL, URLCleanerError } from "../cleaner/index.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Background from "../islands/Background.tsx";

interface ErrorData {
  error: string;
}

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext) => {
    try {
      const fullUrl = new URL(req.url);
      const url = fullUrl.pathname.substring(1) + fullUrl.search;
      const cleanedUrl = await cleanURL(decodeURIComponent(url));

      return new Response(null, {
        status: 302,
        headers: {
          Location: cleanedUrl,
        },
      });
    } catch (error) {
      if (error instanceof URLCleanerError) {
        return ctx.render({ error: error.message });
      }
      return ctx.render({ error: "An unexpected error occurred" });
    }
  },
};

export default function UrlPage(props: PageProps<ErrorData>) {
  return (
    <>
      <Head>
        <title>Error - Detrack</title>
      </Head>
      <Background />
      <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center relative">
        <div class="max-w-[600px] w-full mx-auto">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-rose-500 mb-3">
              Unable to Clean URL
            </h1>
            <p class="text-gray-600 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              There was an issue processing your URL. Please check the URL
              format and try again.
            </p>

            {props?.data?.error && (
              <div class="mb-10 p-5 bg-rose-100/60 backdrop-blur-xl rounded-2xl border border-rose-200/40 shadow-md max-w-lg mx-auto">
                <div class="flex items-center gap-3 mb-2">
                  <svg
                    class="w-5 h-5 text-rose-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 class="text-rose-600 font-semibold">Error Details</h3>
                </div>
                <p class="text-rose-700 text-sm leading-relaxed text-left pl-8">
                  {props.data.error}
                </p>
              </div>
            )}

            <a
              href="/"
              class="group relative inline-flex items-center justify-center py-3 px-8 rounded-full font-medium text-white transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50 active:scale-95"
              style={{
                background: "#3b82f6",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow:
                  "0 4px 16px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <span class="relative z-10 flex items-center gap-2">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to Home
              </span>
              <div class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
