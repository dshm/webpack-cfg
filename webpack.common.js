const path = require("path");

const SpritesmithPlugin = require("webpack-spritesmith");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const loadHTML = require("./config/plugins/loadHTML");
const spriteOptions = require("./config/plugins/sprite-options");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  plugins: [
    ...loadHTML(),
    new SpritesmithPlugin(spriteOptions),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
      chunkFilename: "styles/[id].css"
    })
  ],
  rules: [
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
            ],
            outputPath: "images/",
            publicPath: "images/"
          }
        }
      ]
    },
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "images/",
        publicPath: "images/"
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
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/",
            publicPath: "fonts/"
          }
        }
      ]
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            outputPath: "styles/",
            publicPath: "styles/",
            hmr: devMode
          }
        },
        {
          loader: "css-loader",
          options: { importLoaders: 2, url: false, sourceMap: true }
        },
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
};
