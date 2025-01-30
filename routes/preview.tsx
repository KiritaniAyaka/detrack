import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

interface PreviewData {
  result: string;
}

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const result = url.searchParams.get("result");

    if (!result) {
      return Response.redirect(new URL("/", req.url));
    }

    return ctx.render({ result });
  },
};

export default function PreviewPage(props: PageProps<PreviewData>) {
  const { result } = props.data;

  return (
    <>
      <Head>
        <title>URL Preview - Detrack</title>
      </Head>
      <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-lg mx-auto">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">
              Preview
            </h1>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Cleaned:
                </label>
                <div class="min-h-12 mt-1 p-2 bg-gray-50 rounded-md break-all relative group">
                  <div class="absolute right-2 top-2">
                    <button
                      onClick="navigator.clipboard.writeText(this.dataset.url)"
                      data-url={result}
                      class="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                      title="Copy to clipboard"
                    >
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
                    </button>
                  </div>
                  {result}
                </div>
              </div>

              <div class="flex gap-2 pt-4">
                <a
                  href={result}
                  class="flex-1 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to URL
                </a>
                <a
                  href="/"
                  class="flex-1 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
