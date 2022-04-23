/** @type {import('next').NextConfig} */
module.exports = {
  webpack5: true,
  reactStrictMode: true,
  pageExtensions: ['tsx'],
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pt-BR',
        destination: '/',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
