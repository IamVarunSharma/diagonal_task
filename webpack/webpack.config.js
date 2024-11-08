const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoPrefixer = require("autoprefixer");
const cssNano = require("cssnano");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: "production",
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  entry: {
    app: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../build"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    autoPrefixer,
    cssNano,
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
  ],

  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "async",
      minSize: 17000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 30000,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          idHint: "common",
          reuseExistingChunk: true,
          priority: -5,
          minSize: 0,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        defaultVendors: false,
        reactPackage: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "vendor_react",
          chunks: "all",
          priority: 10,
        },
      },
    },
  },
};
