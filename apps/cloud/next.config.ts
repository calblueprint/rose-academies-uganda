import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tyckvrwfblheqxuliscl.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
