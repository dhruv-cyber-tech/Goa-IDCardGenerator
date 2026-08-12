import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // The Lovable wrapper registers TanStack Start and Nitro itself. Configure
  // its single Nitro instance here instead of adding `nitro()` as a Vite plugin.
  nitro: {
    preset: "vercel",
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1600,
    },
  },
});
