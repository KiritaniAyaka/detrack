import { FreshContext, Handlers } from "$fresh/server.ts";
import { cleanURL, URLCleanerError } from "@/cleaner/index.ts";
import URLInput from "@/islands/URLInput.tsx";
import Button from "../components/button.tsx";
import RightArrow from "../components/icons/right-arrow.tsx";
import CheckCircle from "../components/icons/check-circle.tsx";

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
                <Button
                  type="submit"
                  name="action"
                  value="goto"
                  className="focus:ring-blue-400/50 w-full"
                  color="59 130 246"
                >
                  <RightArrow />
                  Goto
                </Button>
                <Button
                  type="submit"
                  name="action"
                  value="clean"
                  className="focus:ring-emerald-400/50 w-full"
                  color="16 185 129"
                >
                  <CheckCircle />
                  Clean
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
