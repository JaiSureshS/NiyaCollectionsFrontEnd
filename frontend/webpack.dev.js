/* const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
	app: './src/index.js',
  },
  plugins: [
	new HtmlWebpackPlugin({
	  title: 'Production',
	}),
  ],
  output: {
	filename: 'mains.js',
	path: path.resolve(__dirname, 'dist'),
	clean: true,
  },
  mode: 'production'
}; */


const path = require("path")
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
	path: path.resolve(__dirname, './dist'),
    filename: 'main.bundle.js',
  },
  target: 'web',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
	  {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
	  {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ]
  },
  mode: 'production',
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
	new CleanWebpackPlugin(),
	new webpack.HotModuleReplacementPlugin(),
  ]
}