import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: "http://localhost:5050",
    strictPort: true,
    port: 3000,
  },
  preview: {
    port: 5050,
  },
});
