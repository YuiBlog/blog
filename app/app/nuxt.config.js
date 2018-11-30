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
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: pkg.description}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},

  /*
  ** Global CSS
  */
  css: [
    "~/assets/css/tailwind.css",
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
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
