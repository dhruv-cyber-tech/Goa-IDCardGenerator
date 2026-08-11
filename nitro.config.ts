import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  serverRoutes: [
    { handler: "./server/api/share/upload.ts", method: "POST", path: "/api/share/upload" },
    { handler: "./server/api/share/[id].ts", method: "GET", path: "/api/share/:id" },
  ],
  cloudflare: {
    wrangler: {
      kv_namespaces: [
        { binding: "HH_GOA_SHARES" }
      ]
    }
  }
});
