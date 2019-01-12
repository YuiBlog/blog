if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "renderNuxt") {
  // tslint:disable-next-line:no-var-requires
  exports.renderNuxt = require("./render");
}
