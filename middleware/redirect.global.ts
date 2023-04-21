export default defineNuxtRouteMiddleware((to) => {
  if (!to.name) {
    return navigateTo('chat')
  }
})