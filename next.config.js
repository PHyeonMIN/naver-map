/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  async rewrites() {
    return [
      {
        destination: 'https://naveropenapi.apigw.ntruss.com/:path*',
        source: '/example/:path*',
      },
    ];
  },
}

module.exports = nextConfig
