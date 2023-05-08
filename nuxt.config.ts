import un19n from 'un19n'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxtjs/tailwindcss', 'unplugin-icons/nuxt'],
  imports: { dirs: ['./stores'] },
  pinia: { autoImports: ['defineStore'] },
  i18n: { strategy: 'no_prefix' },
  vite: { plugins: [un19n.vite()] }
})
