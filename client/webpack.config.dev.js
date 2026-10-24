const dotenv = require('dotenv')

const path = require('path')

const webpack = require('webpack')
const common = require('./webpack.config.common.js')

const { merge } = require('webpack-merge')

const resolve = filePath => path.resolve(__dirname, filePath)

const serverEnv = dotenv.config({
  path: path.resolve(__dirname, '../server/.env'),
  override: false
}).parsed ?? {}

const serverPort = serverEnv.API_PORT ?? '3001'

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    liveReload: true,
    open: false,
    port: 4204,
    historyApiFallback: true,
    static: resolve('dist'),
    proxy: [
      {
        context: ['/api'],
        target: `http://127.0.0.1:${serverPort}`
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      process: { env: { isProduction: false } }
    })
  ]
})