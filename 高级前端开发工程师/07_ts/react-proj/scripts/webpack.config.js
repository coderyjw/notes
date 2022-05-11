const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, "../src/main.tsx"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../build"),
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "../build"),
    },
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
