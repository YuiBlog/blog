const DotEnv = require("dotenv-webpack");
const MonacoEditor = require("monaco-editor-webpack-plugin");

module.exports = {
  baseUrl: "/admin/",
  chainWebpack: (config) => {
    config.module
      .rule('pug')
      .use('pug-plain-loader');

    config.plugin("dotenv-webpack").use(DotEnv);
    config.plugin("monaco-editor").use(MonacoEditor, [{
      languages: ["markdown"],
      features: [
        "accessibilityHelp",
        "bracketMatching",
        "caretOperations",
        "clipboard",
        "codeAction",
        "colorDetector",
        "comment",
        "contextmenu",
        "coreCommands",
        "cursorUndo",
        "dnd",
        "find",
        "folding",
        "format",
        "gotoError",
        "gotoLine",
        "hover",
        "inPlaceReplace",
        "inspectTokens",
        "iPadShowKeyboard",
        "linesOperations",
        "links",
        "multicursor",
        "parameterHints",
        "quickCommand",
        "quickOutline",
        "referenceSearch",
        "rename",
        "smartSelect",
        "snippets",
        "suggest",
        "toggleHighContrast",
        "toggleTabFocusMode",
        "transpose",
        "wordHighlighter",
        "wordOperations"
      ]
    }]);
  }
}