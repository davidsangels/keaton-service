const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const expressStaticGzip = require('express-static-gzip');
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
module.exports = {
  plugins: [
    new BrotliGzipPlugin({
        asset: '[path].br[query]',
        algorithm: 'brotli',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    new BrotliGzipPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
    })
  ],
      entry: __dirname + '/client/src/index.jsx',
      module: {
        rules: [
          {
            test: [/\.jsx$/],
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-env']
              },
            },
          },
          {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
        ],
      }

        ]
      },
       output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
      }
    };