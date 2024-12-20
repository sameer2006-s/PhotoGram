import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    outDir: "./dist", // Ensure this matches tsconfig's `outDir`
    sourcemap: true, // Useful for debugging issues on Vercel
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
