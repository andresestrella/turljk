/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  // images: {
  //   domains: [
  //     'avatars.githubusercontent.com',
  //     'avatar.tobi.sh',
  //     'cloudflare-ipfs.com',
  //     'loremflickr.com'
  //   ]
  // },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  experimental: {
    // legacyBrowsers: false,
    // browsersListForSwc: true
  }
};

module.exports = nextConfig;
