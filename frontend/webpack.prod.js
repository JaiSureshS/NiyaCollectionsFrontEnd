const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// const { merge } = require('webpack-merge')

const path = require("path")
const paths = require('./paths')
// const common = require('./webpack.common')

module.exports = {
  mode: 'production',
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: paths.build,
    filename: '[name].[contenthash].bundle.js',
  },
  
  module: {
    rules: [
		{ test: /\.js$/, use: ['babel-loader'] },
		{ test: /src\.js$/, use: ['babel-loader'] },


      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  plugins: [
	new HtmlWebpackPlugin({
		template: 'template.html', // template file
		filename: 'index.html', // output file
	  }),
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}