const webpack = require('webpack')
const common = require('./webpack.config.common.js')

const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')

const vendorChunks = [
  'react', 
  'react-dom', 
  'react-router-dom', 
  'axios', 
  'ramda', 
  'qs', 
  'socket.io-client', 
  'uuid'
]

module.exports = merge(common, {
  mode: 'production',
  entry: {
    main: '/src/index',
    home: '/src/components/Home/index.tsx',
    // add pages here
    vendor: vendorChunks
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      process: { env: { isProduction: true } }
    })
  ]
})
