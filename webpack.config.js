const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist'), publicPath: '' },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif|svg)$/i, type: 'asset/resource', generator: { filename: 'img/[name][hash][ext]' } },
      { test: /\.js$/i, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  plugins: [ new HtmlWebpackPlugin({ template: './src/index.html' }) ],
  devServer: { static: path.join(__dirname, 'dist'), compress: true, port: 8080, open: true },
  mode: 'development'
};
