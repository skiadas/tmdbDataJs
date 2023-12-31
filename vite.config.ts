/// <reference types="vitest" />

import { defineConfig } from "vite";
import webfontDownload from 'vite-plugin-webfont-dl';

export default defineConfig({
  build: {
    target: "esnext",
  },
  plugins: [
    webfontDownload(),
  ],
  test: {
    coverage: {
      provider: 'v8'
    },
  }
});

