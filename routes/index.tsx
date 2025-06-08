import { FreshContext, Handlers } from "$fresh/server.ts";
import { cleanURL, URLCleanerError } from "@/cleaner/index.ts";
import URLInput from "@/islands/URLInput.tsx";

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext) => {
    try {
      const formData = await req.formData();
      const url = formData.get("url")?.toString();
      const action = formData.get("action")?.toString();

      if (!url) {
        return ctx.render({ error: "No URL provided" });
      }

      const cleanedUrl = await cleanURL(url);

      if (action === "clean") {
        // Clean URL
        return Response.redirect(
          new URL(`/preview?result=${encodeURIComponent(cleanedUrl)}`, req.url),
        );
      }
      // Directly redirect to the cleaned URL
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

export default function Home() {
  return (
    <>
      <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center relative">
        <div class="max-w-[600px] w-full mx-auto">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Detrack</h1>
            <p class="text-gray-600 mb-8">
              Remove tracking parameters from your URLs
            </p>
          </div>
          <div>
            <form method="POST" action="/">
              <URLInput />
              <div class="flex gap-4 mt-4">
                <button
                  type="submit"
                  name="action"
                  value="goto"
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
                    Goto
                  </span>
                  <div class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button
                  type="submit"
                  name="action"
                  value="clean"
                  class="group relative w-full py-2 px-4 rounded-full font-medium text-white transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50 active:scale-95"
                  style={{
                    background: "#10b981",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <span class="relative z-10 flex items-center justify-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Clean
                  </span>
                  <div class="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
