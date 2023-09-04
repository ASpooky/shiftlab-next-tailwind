/** @type {import('next').NextConfig} */
const { PHASE_PRODUCTION_BUILD } = require('next/constants')
const { PHASE_PRODUCTION_SERVER } = require('next/constants')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const { PHASE_EXPORT } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    //npm run devで起動された時
    return {
      env: {
        //ここで環境変数を設定する

        REACT_APP_API_URL: 'http://localhost:8080',
      },
    }
  } else if (phase === PHASE_PRODUCTION_BUILD) {
    //npm run buildで起動された時
    return {
      env: {
        //ここで環境変数を設定する
        REACT_APP_API_URL: 'https://shiftlab-api.onrender.com',
      },
    }
  } else if (phase === PHASE_PRODUCTION_SERVER) {
    //npm run startで起動された時
    return {
      env: {
        //ここで環境変数を設定する
        REACT_APP_API_URL: 'https://shiftlab-api.onrender.com',
      },
    }
  } else if (phase === PHASE_EXPORT) {
    //npm run exportで起動された時
    return {
      env: {
        //ここで環境変数を設定する
        REACT_APP_API_URL: 'https://shiftlab-api.onrender.com',
      },
    }
  }
}

/* const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    REACT_APP_API_URL: 'https://shiftlab-api.onrender.com',
  },
}

module.exports = nextConfig */
