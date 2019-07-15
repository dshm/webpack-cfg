module.exports = ctx => {
  return {
    plugins: {
      "postcss-import": {},
      "postcss-cssnext": {},
      cssnano: ctx.env === "production" ? ctx.options.minify : false
    }
  };
};
