const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const common = require("./webpack.common");

const config = {
  mode: "production",
  target: "web",
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/app.bundle.js",
    chunkFilename: "scripts/[name].[chunkhash:8].chunk.js",
  },
  module: {
    strictExportPresence: true,
    rules: [...common.rules],
  },
  resolve: {
    extensions: [".js"],
    modules: ["node_modules", "images"],
  },

  plugins: [
    ...common.plugins,
    new CopyPlugin({
      patterns: [
        {
          from: "src/images/",
          to: "images/",
          globOptions: {
            ignore: ["png-ico/*", ".gitkeep"],
          },
        },
        {
          from: "src/data/",
          to: "data/",
          globOptions: { ignore: [".gitkeep"] },
        },
        {
          from: "src/fonts/",
          to: "fonts/",
          globOptions: { ignore: [".gitkeep"] },
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
};

module.exports = config;
