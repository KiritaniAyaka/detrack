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
              <a
                href={result}
                class="group relative w-full py-2 px-4 rounded-full font-medium text-white transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400/50 active:scale-95"
                style={{
                  background: "#3b82f6",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                <span class="relative z-10 flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  Go to URL
                </span>
                <div class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="/"
                class="group relative w-full py-2 px-4 rounded-full font-medium text-white transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-gray-400/50 active:scale-95"
                style={{
                  background: "#6b7280",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(107, 114, 128, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                <span class="relative z-10 flex items-center justify-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back
                </span>
                <div class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
