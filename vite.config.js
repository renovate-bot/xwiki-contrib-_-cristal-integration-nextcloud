import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      // FORCE absolute path to the bundler version of Vue.
      // This is required for "import Vue" to work correctly.
      vue: resolve(__dirname, "node_modules/vue/dist/vue.esm-bundler.js"),
    },
    dedupe: ["vue"],
  },
  build: {
    outDir: ".",
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "cristal",
      fileName: () => "js/cristal-main.js",
      formats: ['es'],
    },
    
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.length > 0 && assetInfo.names[0].endsWith(".css")) {
            return "css/cristal-main.css";
          }
          return "css/[name][extname]";
        },
        chunkFileNames: () => "js/[name]-[hash].js",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
