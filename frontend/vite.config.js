import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // <-- CRITICAL FIX: Ensures asset URLs load cleanly relative to the Vercel container build
});