/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

const removeImports = require("next-remove-imports")();

module.exports = removeImports(nextConfig);
