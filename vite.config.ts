import { defineConfig } from "vite";

export default defineConfig({
  server: {
    watch: {
      usePolling: true, // Enables file system polling
    },
  },
  // ... other config
});
