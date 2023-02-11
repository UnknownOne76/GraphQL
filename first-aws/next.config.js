/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
     POOL_ID: 'ap-northeast-2_RtKVTek59', 
     CLIENT_ID: '68km7r76940llp24pmtdsfq12q',
     AWS_ACCESS_KEY: 'AKIA4ZAOH664GQWKFHBH', 
     AWS_SECRET_KEY: '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'
  }
}

module.exports = nextConfig
