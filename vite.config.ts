import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "vercel",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  // Tell TypeScript to ignore the strict type check here.
  // Vite will still read this during the build process!
  // @ts-expect-error: Lovable's types are missing standard Vite config properties
  build: {
    chunkSizeWarningLimit: 1600,
  },
});