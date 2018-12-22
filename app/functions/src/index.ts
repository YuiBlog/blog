if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === "renderNuxt") {
  exports.renderNuxt = require("./render");
}