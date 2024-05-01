// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
   devtools: { enabled: true },
   base: '/nuxt-app/',
   build: {
      transpile: ['vuetify', '@fortawesome/fontawesome-free'],
   },
   css: [
      '@nuxtjs/tailwindcss',
      {
         exposeConfig: true,
         config: './tailwind.config.js',
      },
   ],

   modules: ['@nuxtjs/tailwindcss','nuxt-icon', 
      (_options, nuxt) => {
         nuxt.hooks.hook('vite:extendConfig', (config) => {
            // @ts-expect-error
            config.plugins.push(vuetify({ autoImport: true }))
         })
      },
      //...
   ],
   vite: {
      vue: {
         template: {
            transformAssetUrls,
         },
      },
   },
   css: [
      '@fortawesome/fontawesome-free/css/all.css',
      "@/node_modules/vue-select/dist/vue-select.css",
      "@/assets/css/style.css",
      "@/assets/css/payment.css",
   ],
   app: {
      head: {
         link: [
            {
               rel: "icon",
               type: "image/png",
               href: "/imgs/logo.png",
            },
         ],
         script: [
            {
               src: "https://checkout.tabby.ai/tabby-promo.js",
               tagPosition: "bodyClose",
            },
            {
               src: "https://checkout.tabby.ai/tabby-card.js",
               tagPosition: "bodyClose",
            },
            {
               src: "https://cdnjs.cloudflare.com/ajax/libs/bluebird/3.3.4/bluebird.min.js",
               tagPosition: "bodyClose",
            },
            {
               src: "https://secure.gosell.io/js/sdk/tap.min.js",
               tagPosition: "bodyClose",
            },
            {
               src: "/js/main.js",
               tagPosition: "bodyClose",
            },
         ],
      },
   },
   runtimeConfig: {
      public: {
         baseURL:
            process.env.NODE_ENV !== "production"
               ? process.env.DEV_BASE_URL
               : process.env.PRO_BASE_URL,
      },
   },
   postcss: {
      plugins: {
         tailwindcss: {},
         autoprefixer: {},
      },
   }, ssr: false
   // routeRules: {
   //    "/member/**": { ssr: false },
   // },
   // nitro: {
   //    prerender: {
   //      crawlLinks: true,
   //      failOnError: false, 
   //    },
   //  },
});
