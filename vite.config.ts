import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import react from "@vitejs/plugin-react";
import path from "path";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { defineConfig } from "vite";
import svgr from 'vite-plugin-svgr'

const isProdMode = process.env.VERCEL_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: isProdMode,
        drop_debugger: isProdMode,
      },
    },
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});
