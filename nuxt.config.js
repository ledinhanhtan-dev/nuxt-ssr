export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nuxt JS',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/date-filter.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: '~/components/ui', extensions: ['vue'] }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Environment variables
  env: {
    baseUrl:
      process.env.BASE_URL ||
      'https://nuxt-ssr-0-default-rtdb.asia-southeast1.firebasedatabase.app',
    postUrl:
      process.env.POST_URL ||
      'https://nuxt-ssr-0-default-rtdb.asia-southeast1.firebasedatabase.app/posts',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL:
      process.env.BASE_URL ||
      'https://nuxt-ssr-0-default-rtdb.asia-southeast1.firebasedatabase.app',
    postURL:
      process.env.POST_URL ||
      'https://nuxt-ssr-0-default-rtdb.asia-southeast1.firebasedatabase.app/posts',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  transition: {
    name: 'fade',
    mode: 'out-in',
  },
}
