/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Pages that moved when the new design took / in October 2026.
  async redirects() {
    return [
      { source: "/v2home", destination: "/v2", permanent: true },
      { source: "/bento/home", destination: "/v3", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.digitl.me",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
