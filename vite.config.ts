import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { VitePWA, ManifestOptions } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";

const manifest: Partial<ManifestOptions> = {
  theme_color: "#05014a",
  background_color: "#000",
  display: "minimal-ui",
  scope: "https://danikova.github.io/event-horizon/",
  start_url: "https://danikova.github.io/event-horizon/",
  name: "Event Horizon",
  short_name: "Event Horizon",
  description: "You can wait for any events or measure elapsed time.",
  icons: [
    {
      src: "icons/icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "icons/icon-256x256.png",
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: "icons/icon-384x384.png",
      sizes: "384x384",
      type: "image/png",
    },
    {
      src: "icons/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};

export default defineConfig({
  base: "/event-horizon/",
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      manifest,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
  },
});
