const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const common = require("./webpack.common");

const eslintRules = () => {
  return {
    test: /\.(js|jsx|mjs)$/,
    enforce: "pre",
    use: [
      {
        options: {
          formatter: require.resolve("eslint-friendly-formatter"),
          eslintPath: require.resolve("eslint"),
        },
        loader: require.resolve("eslint-loader"),
      },
    ],
    include: "/",
  };
};

const config = {
  mode: "development",
  target: "web",
  entry: ["./src/scripts/index.js"],
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    hot: true,
    inline: true,
    port: 3000,
    watchContentBase: true,
    publicPath: "/",
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: true,
    },
  },
  resolve: {
    extensions: [".js"],
    modules: ["node_modules", "images"],
  },
  module: {
    strictExportPresence: true,
    rules: [
      eslintRules(),
      {
        oneOf: [...common.rules],
      },
    ],
  },

  plugins: [
    new BundleAnalyzerPlugin({ openAnalyzer: false, analyzerPort: 3001 }),
    ...common.plugins,
  ],
};

module.exports = config;
