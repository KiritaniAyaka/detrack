import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import CopyButton from "../islands/CopyButton.tsx";
import BackArrow from "../components/icons/back-arrow.tsx";
import Button from "../components/button.tsx";
import RightArrow from "../components/icons/right-arrow.tsx";

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
      <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center relative">
        <div class="max-w-[600px] w-full mx-auto">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Preview</h1>
            <p class="text-gray-600 mb-8">
              Your cleaned URL is ready
            </p>
          </div>

          <div class="space-y-4">
            <div>
              <div class="relative py-4 px-6 bg-white/60 backdrop-blur-xl rounded-full border border-gray-200 shadow-md">
                <div class="absolute top-2 right-2">
                  <CopyButton url={result} />
                </div>
                <div class="pr-12 text-gray-800 break-all font-mono text-sm">
                  {result}
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <Button
                href={result}
                color="59 130 246"
                className="focus:ring-blue-400/50 w-full"
              >
                <RightArrow />
                Go to URL
              </Button>
              <Button
                href="/"
                color="107 114 128"
                className="focus:ring-gray-400/50 w-full"
              >
                <BackArrow />
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
