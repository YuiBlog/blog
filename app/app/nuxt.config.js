const pkg = require('./package')

module.exports = {
  mode: 'universal',

  // for yarn workspace
  modulesDir: ["../node_modules"],

  /*
  ** Headers of the page
  */
  head: {
    title: "みかづきメモ",
    titleTemplate: "%s - みかづきメモ",
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#38c172'},

  /*
  ** Global CSS
  */
  css: [
    "~/assets/css/tailwind.css",
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
    "~/modules/typescript.js"
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
