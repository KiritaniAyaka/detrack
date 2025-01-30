import { cleanURL, URLCleanerError } from "../cleaner/index.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

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
      <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md mx-auto">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="text-center">
              <h1 class="text-2xl font-bold text-red-600 mb-4">
                Unable to Clean URL
              </h1>
              {props?.data?.error && (
                <p class="text-gray-700 mb-6">{props.data.error}</p>
              )}
              <a
                href="/"
                class="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
