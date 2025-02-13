import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import CopyButton from "../islands/CopyButton.tsx";

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
                  <div class="float-right right-2 top-2">
                    <CopyButton url={result} />
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
