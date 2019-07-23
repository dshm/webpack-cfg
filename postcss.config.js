module.exports = ctx => {
  return {
    plugins: {
      "postcss-import": {},
      "postcss-preset-env": { stage: 0 },
      autoprefixer: {},
      cssnano: ctx.env === "production" ? ctx.options.minify : false
    }
  };
};
