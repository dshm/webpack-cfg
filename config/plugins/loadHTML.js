const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const loadHTML = () => {
  const files = fs.readdirSync("./src/");
  const list = files.filter(file => file.includes(".html"));
  return list.map(name => {
    return new HtmlWebpackPlugin({
      inject: true,
      filename: name,
      template: `./src/${name}`
    });
  });
};

module.exports = loadHTML;
