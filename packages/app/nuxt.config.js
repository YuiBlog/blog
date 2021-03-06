const pkg = require("./package")
const path = require("path");

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: (title) => {
      return title;
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "description", hid: "description", content: pkg.description },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" }
    ],
    link: [
      { rel: "icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "preconnect", href: "//www.google-analytics.com" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#38c172" },

  /*
  ** Global CSS
  */
  css: [
    "~/assets/css/prismjs.scss",
    "~/assets/css/tailwind.scss",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/prismjs.js"
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    ["~/modules/typescript.js"],
    ["@nuxtjs/dotenv", { path: path.join(__dirname, "..", "..") }],
    ["@nuxtjs/google-analytics", {
      id: "UA-68289020-1"
    }],
    ["@nuxtjs/pwa"]
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
    extend(config, ctx) {

    }
  },
  env: {
    FIREBASE_HOSTING_URL: process.env.FIREBASE_HOSTING_URL
  },
  workbox: {
    // empty
  }
}
