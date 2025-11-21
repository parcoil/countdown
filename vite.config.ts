import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "unforetellable-jovanni-silverly.ngrok-free.dev",
      "count.parcoil.com",
    ],
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
});
