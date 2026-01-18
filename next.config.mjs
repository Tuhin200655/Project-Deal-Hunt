/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
      },
      {
        protocol: "https",
        hostname: "fpqtwoehiqdrwrlddtyk.supabase.co",
      },
      // Add more domains as needed
      {
        protocol: "https",
        hostname: "m.media-amazon.com"
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com"
      }
    ],
  },
};

export default nextConfig;
