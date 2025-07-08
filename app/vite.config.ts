import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  envDir: "../",
  build: {
    outDir: "build",
  },
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@shadcn-ui": path.resolve(__dirname, "./src/shadcn-ui"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
});
