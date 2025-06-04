/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc', // ADDED: For images from Postimages
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // For direct image links from Imgur
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co', // For direct image links from ImgBB
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgbox.com', // For direct image links from Imgbox
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // For images hosted on Cloudinary
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io', // For images hosted on ImageKit.io
        port: '',
        pathname: '/**',
      },
      // You can add more here if you use other specific CDNs or image hosts
      // For example, if you use a custom domain for Imgix:
      // {
      //   protocol: 'https',
      //   hostname: 'your-custom-domain.imgix.net',
      //   port: '',
      //   pathname: '/**',
      // },
      // Or for AWS CloudFront (replace with your distribution ID):
      // {
      //   protocol: 'https',
      //   hostname: '*.cloudfront.net', // Use a wildcard for subdomains if applicable
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
  // Other Next.js configurations can go here
};

module.exports = nextConfig;