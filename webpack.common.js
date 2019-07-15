const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const fs = require("fs");

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
  plugins: [...loadHTML()],
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
};
