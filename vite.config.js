import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // or vue, etc.

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Content-Security-Policy": `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval';
        style-src 'self' 'unsafe-inline';
        connect-src 'self' https://*.ngrok-free.dev http://localhost:* https://localhost:*;
        img-src 'self' data: https:;
        font-src 'self' data:;
      `
        .replace(/\s+/g, " ")
        .trim(),
    },
    allowedHosts: [
      "decomposed-unshepherding-vilma.ngrok-free.dev",
      "localhost",
      "grade-manager-beta.netlify.app",
    ],
  },
});

// https://vite.dev/config
