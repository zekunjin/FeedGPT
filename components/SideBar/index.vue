<script lang="ts" setup>
import Chat from '~icons/carbon/chat'
import Archive from '~icons/carbon/archive'
import Settings from '~icons/carbon/settings'

const route = useRoute()
const router = useRouter()

const isEdit = ref(false)
const apiKey = ref('')

console.log(await storage.getItem(StorageKey.OPENAI_API_KEY))

const menus = [
  { icon: Chat, key: 'chat' },
  { icon: Archive, key: 'store' }
]

const isActive = ({ key }: { key: string }) => {
  return route.name?.toString().includes(key)
}

const toggleEdit = async () => {
  isEdit.value = !isEdit.value
  if (isEdit.value) { apiKey.value = (await storage.getItem(StorageKey.OPENAI_API_KEY)) as string }
  if (!isEdit.value) { await storage.setItem(StorageKey.OPENAI_API_KEY, apiKey.value) }
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
      <Settings class="cursor-pointer hover:rotate-90 duration-300" @click="toggleEdit" />
      <input v-show="isEdit" v-model="apiKey" placeholder="Enter api key" />
    </div>
  </div>
</template>
