// -- CORE
const path = require('path')
// -- DEV
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
// -- DATA
const { parsed } = require('dotenv').config()

// -- ENVS
const { NODE_ENV } = process.env
const PRODUCTION = NODE_ENV === 'production'

module.exports = {
  env: {
    // Pass data from .env file
    ...parsed
  },
  useFileSystemPublicRoutes: false,
  // Declare build directory
  distDir: PRODUCTION ? './../build' : './.next',
  // Webpack config
  webpack (config) {
    config.resolve.plugins.push(new TSConfigPathsPlugin({ configFile: path.resolve(__dirname, './tsconfig.json') }))

    return config
  }
}
