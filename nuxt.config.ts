// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxtjs/strapi",
    "nuxt-gtag",
    "@nuxtjs/google-adsense"
  ],
  googleAdsense: {
    id: 'ca-pub-8481734308143857'
  },
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
      dataAPI: process.env.DATA_API,
      doCDN: process.env.DO_CDN,
      nodeENV: process.env.NODE_ENV,
      stripeKey: process.env.STRIPE_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.eatclassy.com',
      siteName: 'EatClassy',
      siteDescription: 'Create original, insanely good recipes for any idea, ingredient, cuisine, region, or dietary need using the EatClassy AI-powered recipe engine.',
      language: 'en', // prefer more explicit language codes like `en-AU` over `en`
      gtag: {
        id: ''
      }
    }
  },
  extends: [
    'nuxt-seo-kit'
  ]
})