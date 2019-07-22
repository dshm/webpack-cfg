const spriteTPL = require("../sprite.tpl");

module.exports = {
  src: {
    cwd: "./src/images/sprite",
    glob: "*.png"
  },
  target: {
    image: "./src/images/sprite.png",
    css: [["./src/styles/sprite.scss", { format: "custom_format" }]]
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
};
