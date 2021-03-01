const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var dotenv = require('dotenv');

module.exports = (env, argv) => {
  return {
    performance: { hints: false },
    mode: argv.mode,
    entry: path.resolve(__dirname, 'src/index.js'),
    devtool: argv.mode === 'development' ? 'eval-source-map' : 'none',
    resolve: {
      extensions: ['jsx', '.js'],
      alias: {
        "@": path.resolve(__dirname, 'src'),
        "assets": path.resolve(__dirname, 'src/assets')
      }
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve('dist'),
      publicPath: '/'
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.(css|scss)$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
          include: path.resolve(__dirname, '../')
        },
        {
          test: /\.(jpg|png|gif|ico|ttf|woff|woff2|eot|otf)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                output: { path: path.join(__dirname, 'dist') }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'index.html')
      }),
      new DefinePlugin({
        'process.env': JSON.stringify(dotenv.config().parsed)
      }),
      new CleanWebpackPlugin({verbose: true})
    ],
    node: {
      fs: "empty"
    },
    devServer: {
      port: 5000,
      hot: argv.mode === 'development',
      inline: argv.mode === 'development',
      historyApiFallback: {
        index: '/'
      },
      publicPath: '/'
    }
  };
};
