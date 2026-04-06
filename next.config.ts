/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'trackercdn.com', // Dominio de las imágenes de Tracker.gg
      },
      {
        protocol: 'https',
        hostname: 'vignette.wikia.nocookie.net', // Opcional para otros assets
      },
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
      },
      {
        protocol: 'https',
        hostname: 'd15f34w2p8l1cc.cloudfront.net',
      },
      { protocol: 'https', hostname: 'd15f34w2p8l1cc.cloudfront.net' }, // Avatares y héroes
      { protocol: 'https', hostname: 'static.playoverwatch.com' },
      { protocol: 'https', hostname: 'blz-contentstack-images.akamaized.net' }
    ],
  },
};

export default nextConfig;