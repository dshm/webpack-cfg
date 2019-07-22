const path = require("path");
const spriteTPL = require("../sprite.tpl");

module.exports = {
  src: {
    cwd: "./src/images/png-ico",
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
    cssImageRef: "../images/sprite.png"
  },
  retina: "@2x",
  spritesmithOptions: {
    padding: 5
  },
  customTemplates: {
    custom_format: spriteTPL.defaultFormat,
    custom_format_retina: spriteTPL.retinaFormat
  }
};
