/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  serverRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL || "http://127.0.0.1:5221/api",
  },
  publicRuntimeConfig: {
    jikanAPI: process.env.JIKAN_API_URL || "https://api.jikan.moe/v4",
  },
  output: "standalone",
};

export default nextConfig;
