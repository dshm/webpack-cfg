const path = require("path");
const common = require("./webpack.common");

const config = {
  mode: "production",
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/app.bundle.js",
    chunkFilename: "scripts/[name].[chunkhash:8].chunk.js"
  },
  module: {
    strictExportPresence: true,
    rules: [...common.rules]
  },
  resolve: {
    extensions: [".js"],
    modules: ["node_modules", "images"]
  },

  plugins: [...common.plugins]
};

module.exports = config;
