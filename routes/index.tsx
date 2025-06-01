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
    <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Detrack</h1>
          <p class="text-gray-600 mb-8">
            Remove tracking parameters from your URLs
          </p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <form method="POST" action="/">
            <URLInput />
            <div class="flex gap-2">
              <button
                type="submit"
                name="action"
                value="goto"
                class="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Goto
              </button>
              <button
                type="submit"
                name="action"
                value="clean"
                class="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Clean
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
