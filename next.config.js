/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    optimizePackageImports: ["@radix-ui/react-icons"],
  },
  // lightningcssエラーを回避するための設定
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // フォント最適化の設定
  optimizeFonts: true,
};

export default config;
