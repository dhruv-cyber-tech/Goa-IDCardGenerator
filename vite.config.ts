import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // You must explicitly import this!

export default defineConfig({
  vite: {
    plugins: [
      nitro({
        preset: "vercel",
      }),
    ],
    // The build object goes inside the 'vite' object here, which fixes the TypeScript error!
    build: {
      chunkSizeWarningLimit: 1600,
    },
  },
});