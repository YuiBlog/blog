const DotEnv = require("dotenv-webpack");

module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/admin/" : "/",
  chainWebpack: (config) => {
    config.module
      .rule('pug')
      .use('pug-plain-loader')

    config.plugin("dotenv-webpack").use(DotEnv)
  }
}