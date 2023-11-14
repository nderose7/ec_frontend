// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxtjs/strapi"
  ],
  googleFonts: {
    families: {
      Urbanist:  {
        wght: [400, 500, 600, 700],
        ital: [400, 500, 600, 700]
      },
    }
  },
  colorMode: {
    classSuffix: ""
  },
  runtimeConfig: {
    public: {
      strapiURL: process.env.STRAPI_URL,
      nodeENV: process.env.NODE_ENV,
    }
  },
})