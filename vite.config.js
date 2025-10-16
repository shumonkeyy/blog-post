// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://blog-api-eight-delta.vercel.app/",
        changeOrigin: true,
        // optional: rewrite /api -> /
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
