export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  ssr: true,

  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'moyka',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    script: [
      {
        src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
        type: 'text/javascript'
      },
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        type: "text/javascript"
      },
      {
        src:
          "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
        type: "text/javascript"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [

    {src: '~/plugins/vue-easy-lightbox.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue3-perfect-scrollbar.js', mode: 'client', ssr: false},
    {src: '~/plugins/vue-snip.js', mode: 'client', ssr: false},
    {src: '~/plugins/repository.js', mode: 'client'},
    { src: '~/plugins/helper.js', mode: 'client'}

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt', 'nuxt-vuex-localstorage', '@nuxtjs/axios',
  ],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    baseUrl: 'https://reserved-app.kz'
  },
  axios: {
    baseURL: 'https://reserved-app.kz',
  }
}
