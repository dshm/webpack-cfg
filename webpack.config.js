const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const eslintFormatter = require("eslint-friendly-formatter");

const config = {
  mode: "development",
  entry: "./src/scripts/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "scripts/app.bundle.js",
    chunkFilename: "scripts/[name].[chunkhash:8].chunk.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    inline: true,
    port: 3000,
    watchContentBase: true
  },
  resolve: {
    extensions: [".js"]
  },
  module: {
    strictExportPresence: true,

    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: "pre",
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve("eslint")
            },
            loader: require.resolve("eslint-loader")
          }
        ],
        include: "/"
      },
      {
        oneOf: [
          {
            test: /\.svg$/,
            use: [
              {
                loader: "raw-loader"
              },
              {
                loader: "svgo-loader",
                options: {
                  plugins: [
                    { removeViewBox: false },
                    {
                      removeAttrs: { attrs: ["width", "height", "xmlns:xlink"] }
                    },
                    { sortAttrs: true }
                  ]
                }
              }
            ]
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              limit: 10000,
              name: "images/"
            }
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"]
              }
            }
          },
          {
            // Apply rule for .sass, .scss or .css files
            test: /\.(sa|sc|c)ss$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader", options: { importLoaders: 2 } },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  config: {
                    path: path.resolve(__dirname, "./postcss.config.js")
                  }
                }
              },
              "sass-loader"
            ]
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html")
    })
  ]
};

module.exports = config;
