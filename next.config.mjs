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
    apiCountryBaseUrl: "https://restcountries.com/v3.1",
  },
  output: "standalone",
};

export default nextConfig;
