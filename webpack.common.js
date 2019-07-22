const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpritesmithPlugin = require("webpack-spritesmith");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const spriteTPL = require("./sprite.tpl");

const devMode = process.env.NODE_ENV !== "production";

const loadHTML = () => {
  const files = fs.readdirSync("./src");
  const list = files.filter(file => file.includes(".html"));
  return list.map(name => {
    return new HtmlWebpackPlugin({
      inject: true,
      filename: name,
      template: path.resolve(__dirname, `./src/${name}`)
    });
  });
};

module.exports = {
  plugins: [
    ...loadHTML(),
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, "src/images/sprite"),
        glob: "*.png"
      },
      target: {
        image: path.resolve(__dirname, "src/images/sprite.png"),
        css: [
          [
            path.resolve(__dirname, "src/styles/sprite.scss"),
            { format: "custom_format" }
          ]
        ]
      },
      apiOptions: {
        cssImageRef: "~sprite.png"
      },
      retina: "@2x",
      spritesmithOptions: {
        padding: 5
      },
      customTemplates: {
        custom_format: spriteTPL.defaultFormat,
        custom_format_retina: spriteTPL.retinaFormat
      }
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
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
            ]
          }
        }
      ]
    },
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: "file-loader",
      options: {
        name: "[name].[ext]",
        outputPath: "images/"
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
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: devMode
          }
        },
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
};
