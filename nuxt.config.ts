// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', 'unplugin-icons/nuxt', '@nuxt/devtools'],
  imports: { dirs: ['./stores'] },
  pinia: { autoImports: ['defineStore'] },

  devtools: {
    enabled: true
  }
})
