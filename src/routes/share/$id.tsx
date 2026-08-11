import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/share/$id")({
  head: ({ params }) => ({
    meta: [
      { title: "HH Goa 2026 Builder Credential" },
      {
        name: "description",
        content: "Built in Goa. Shipping ideas, code, and chaos. #FrameInGoa",
      },
      { property: "og:title", content: "HH Goa 2026 Builder Credential" },
      {
        property: "og:description",
        content: "Built in Goa. Shipping ideas, code, and chaos. #FrameInGoa",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `/api/share/${params.id}` },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "HH Goa 2026 Builder Credential" },
      {
        name: "twitter:description",
        content: "Built in Goa. Shipping ideas, code, and chaos. #FrameInGoa",
      },
      { name: "twitter:image", content: `/api/share/${params.id}` },
    ],
  }),
  component: SharePage,
});

function SharePage() {
  const { id } = Route.useParams();
  const [broken, setBroken] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-goa-green p-4">
      <div className="max-w-2xl text-center">
        <h1 className="font-display text-4xl tracking-wide text-goa-cream md:text-5xl">
          HH GOA 2026
        </h1>
        <p className="mt-2 font-mono text-sm text-goa-pink">#FrameInGoa</p>
        <div className="mt-8">
          {!broken ? (
            <img
              src={`/api/share/${id}`}
              alt="HH Goa 2026 Builder Credential"
              className="mx-auto max-w-full rounded-lg shadow-[8px_8px_0_rgba(0,0,0,0.22)]"
              onError={() => setBroken(true)}
            />
          ) : (
            <p className="font-mono text-sm text-goa-cream/80">
              This share link is no longer available.
            </p>
          )}
        </div>
        <p className="mt-6 font-mono text-xs text-goa-cream/80">
          Built in Goa. Shipping ideas, code, and chaos. #FrameInGoa
        </p>
      </div>
    </div>
  );
}
