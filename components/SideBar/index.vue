<script lang="ts" setup>
import Chat from '~icons/carbon/chat'
import Archive from '~icons/carbon/archive'
import Settings from '~icons/carbon/settings'

const route = useRoute()
const router = useRouter()

const menus = [
  { icon: Chat, key: 'chat' },
  { icon: Archive, key: 'store' }
]

const isActive = ({ key }: { key: string }) => {
  return route.name?.toString().includes(key)
}
</script>

<template>
  <div class="flex flex-col py-4 justify-between bg-neutral-50 h-full">
    <div class="flex-1 flex flex-col">
      <SideBarNavItem v-for="item in menus" :key="item.key" :is-active="isActive(item)" @click="router.push({ name: item.key })">
        <component :is="item.icon" />
      </SideBarNavItem>
    </div>

    <div class="flex justify-center">
      <Settings class="cursor-pointer hover:rotate-90 duration-300" />
    </div>
  </div>
</template>
