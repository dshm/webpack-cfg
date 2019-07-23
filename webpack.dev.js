const path = require("path");
const common = require("./webpack.common");

const eslintRules = () => {
  return {
    test: /\.(js|jsx|mjs)$/,
    enforce: "pre",
    use: [
      {
        options: {
          formatter: require.resolve("eslint-friendly-formatter"),
          eslintPath: require.resolve("eslint")
        },
        loader: require.resolve("eslint-loader")
      }
    ],
    include: "/"
  };
};

const config = {
  mode: "development",
  entry: ["./src/scripts/index.js"],
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    hot: true,
    inline: true,
    port: 3000,
    watchContentBase: true
  },
  resolve: {
    extensions: [".js"],
    modules: ["node_modules", "images"]
  },
  module: {
    strictExportPresence: true,
    rules: [
      eslintRules(),
      {
        oneOf: [...common.rules]
      }
    ]
  },

  plugins: [...common.plugins]
};

module.exports = config;
