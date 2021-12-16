const path = require("path");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  target: "web",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      {
        test: /\.(?:ico|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new UglifyJsPlugin()],
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "..", "./build"),
    filename: "bundle.js",
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, "./src/favicon/favicon.ico"),
      template: path.resolve(__dirname, "./src/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        APIKEY: JSON.stringify(process.env.APIKEY),
        AUTHDOMAIN: JSON.stringify(process.env.AUTHDOMAIN),
        PROJECTID: JSON.stringify(process.env.PROJECTID),
        STORAGEBUCKET: JSON.stringify(process.env.STORAGEBUCKET),
        MESSAGINGSENDERID: JSON.stringify(process.env.MESSAGINGSENDERID),
        APPID: JSON.stringify(process.env.APPID),
      },
    }),
    new Dotenv(),
  ],
  // devtool: "source-map",
  devServer: {
    proxy: {
      "/api": "http://localhost:4000/",
    },
    port: 8080,
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: { index: "/", disableDotRule: true },
  },
};
