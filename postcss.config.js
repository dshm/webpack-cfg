module.exports = ctx => {
  return {
    plugins: {
      "postcss-import": {},
      "postcss-cssnext": {},
      autoprefixer: {},
      cssnano: ctx.env === "production" ? ctx.options.minify : false
    }
  };
};
