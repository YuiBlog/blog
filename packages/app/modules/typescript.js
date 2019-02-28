import * as path from "path";

const TsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

export default function () {
  this.extendBuild(config => {
    const tsLoader = {
      loader: "ts-loader",
      options: {
        appendTsSuffixTo: [/\.vue$/],
      },
      exclude: [/\.nuxt/],
    };

    config.module.rules.push({
      test: /((client|server)\.js)|(\.tsx?)$/,
      ...tsLoader
    })

    config.resolve.extensions.push(".ts")

    config.resolve.plugins = [new TsConfigPathsPlugin({
      configFile: path.join(__dirname, "..", "tsconfig.json"),
    })];

    for (let rule of config.module.rules) {
      if (rule.loader === "vue-loader") {
        rule.options.loaders = { ts: tsLoader };
      }
    }
  });
}