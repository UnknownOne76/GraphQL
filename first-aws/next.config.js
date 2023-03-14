/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
     POOL_ID: 'ap-northeast-2_RtKVTek59', 
     CLIENT_ID: '68km7r76940llp24pmtdsfq12q',
     AWS_ACCESS_KEY: 'AKIA4ZAOH664AGNU7KBN', 
     AWS_SECRET_KEY: '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'
  }
}

module.exports = nextConfig
