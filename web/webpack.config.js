const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "..", "./build"),
    filename: "bundle.js",
  },
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    // new CopyPlugin({
    //   patterns: [{ from: "./src/static", to: "./static" }],
    // }),
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
  ],
  // devtool: "source-map",
  devServer: {
    proxy: {
      "/api": "http://localhost:4000/",
    },
    port: 8080,
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: { index: "/", disableDotRule: true },
    // 避免讓照片上傳後出現重新整理
    watchOptions: {
      ignored: [path.resolve(__dirname, "./src/images")],
    },
  },
};
