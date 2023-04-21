<script lang="ts" setup>
import Chat from '~icons/carbon/chat'
import Archive from '~icons/carbon/archive'

const route = useRoute()
const router = useRouter()

const menus = [
  { icon: Chat, key: 'chat' },
  { icon: Archive, key: 'store' },
]
</script>

<template>
  <div class="flex flex-col py-4 bg-neutral-50 h-full">
    <SideBarNavItem v-for="item in menus" :key="item.key" :is-active="route.name === item.key" @click="router.push({ name: item.key })">
      <component :is="item.icon"/>
    </SideBarNavItem>
  </div>
</template>