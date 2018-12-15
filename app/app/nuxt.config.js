const pkg = require("./package")

module.exports = {
  mode: "universal",

  // for yarn workspace
  modulesDir: ["../node_modules"],

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: (title) => {
      return title ? `${title} - みかづきメモ` : `みかづきメモ`;
    },
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {name: "description", hid: "description", content: pkg.description},
      {name: "msapplication-TileColor", content: "#da532c"},
      {name: "theme-color", content: "#ffffff"}
    ],
    link: [
      {rel: "icon", href: "/favicon.ico"},
      {rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png"},
      {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"},
      {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"},
      {rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5"},
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: "#38c172"},

  /*
  ** Global CSS
  */
  css: [
    "~/assets/css/tailwind.scss",
    "~/assets/css/prismjs.css",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: "~/plugins/inject-firebase.ts", ssr: true},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ["~/modules/typescript.js"],
    ["@nuxtjs/google-analytics", {
      id: "UA-68289020-1"
    }]
  ],

  /*
  ** Build configuration
  */
  build: {
    publicPath: "/assets/",
    extractCSS: true,

    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {

    }
  }
}
