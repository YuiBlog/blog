const DotEnv = require("dotenv-webpack");
const MonacoEditor = require("monaco-editor-webpack-plugin");
const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('pug')
      .use('pug-plain-loader');

    config.plugin("dotenv-webpack").use(DotEnv, [{
      path: path.join(__dirname, "..", "..", ".env")
    }]);
    config.plugin("monaco-editor").use(MonacoEditor, [{
      languages: [
        "!apex",
        "!azcli",
        "!bat",
        "!cloujure",
        "!coffee",
        "cpp",
        "csharp",
        "!csp",
        "css",
        "dockerfile",
        "!fsharp",
        "!go",
        "!handlebars",
        "html",
        "!ini",
        "java",
        "javascript",
        "json",
        "!less",
        "!lua",
        "markdown",
        "!msdax",
        "mysql",
        "!objective",
        "perl",
        "!pgsql",
        "!php",
        "!postiats",
        "!powerquery",
        "powershell",
        "pug",
        "python",
        "!r",
        "!razor",
        "!redis",
        "!redshift",
        "ruby",
        "rust",
        "!sb",
        "!scheme",
        "scss",
        "shell",
        "!solidity",
        "sql",
        "!st",
        "swift",
        "typescript",
        "!vb",
        "xml",
        "yaml"
      ],
      features: [
        "!accessibilityHelp",
        "bracketMatching",
        "caretOperations",
        "clipboard",
        "!codeAction",
        "!codeLens",
        "colorDetector",
        "comment",
        "contextmenu",
        "coreCommands",
        "cursorUndo",
        "!dnd",
        "find",
        "folding",
        "!fontZoom",
        "format",
        "!goToDefinitionCommands",
        "!goToDefinitionMouse",
        "!gotoError",
        "!gotoLine",
        "!hover",
        "inPlaceReplace",
        "!inspectTokens",
        "!iPadShowKeyboard",
        "linesOperations",
        "links",
        "multicursor",
        "!parameterHints",
        "quickCommand",
        "quickOutline",
        "!referenceSearch",
        "rename",
        "smartSelect",
        "!snippets",
        "suggest",
        "!toggleHighContrast",
        "!toggleTabFocusMode",
        "transpose",
        "wordHighlighter",
        "wordOperations",
        "!wordPartOperations"
      ]
    }]);
  },
  css: {
    loaderOptions: {
      postcss: {
        config: {
          path: path.join(__dirname, "postcss.config.js")
        }
      }
    }
  },
  publicPath: "/admin/",
}
