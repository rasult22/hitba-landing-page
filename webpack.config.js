const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'src/assets/*',
          to({ context, absoluteFilename }) {
            return "assets/[name][ext]";
          }, 
        },
        { 
          from: 'src/root/*',
          to({ context, absoluteFilename }) {
            return "[name][ext]";
          }, 
        },
        { 
          from: 'src/root/.github/workflows/*',
          to({ context, absoluteFilename }) {
            return ".github/workflows/[name][ext]";
          }, 
        }
      ]
    }),
    new MiniCssExtractPlugin({filename: 'main.css'})
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
    ],
  },
};

