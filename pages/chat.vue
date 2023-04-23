<script lang="ts" setup>
const message = ref('')

const route = useRoute()
const router = useRouter()

const { data, execute } = useLazyFetch('/api/conversations')
const { send } = useConversataionStore()

const conversationId = computed(() => route.params.id as string | undefined)

const isActive = (id: string) => id === conversationId.value

const onSaveConversation = async (value: string, { id }: { id: string }) => {
  await useFetch(`/api/conversations/${id}`, { method: 'put', body: { title: value } })
}

const onDeleteConversation = async ({ id }: { id: string }) => {
  await useFetch(`/api/conversations/${id}`, { method: 'delete' })
  router.push({ name: 'chat' })
  execute()
}

const onSendMessage = async () => {
  if (!message.value) { return }
  const data = await send(message.value, route.params.id as string)
  if (!conversationId.value) { execute() }
  router.push({ name: 'chat-id', params: { id: data.conversationId } })
  message.value = ''
}
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full">
      <ConversationSelector>
        <ConversationSelectorItem v-for="item in data" :key="item.id" v-model:title="item.title" :is-active="isActive(item.id)" @click="router.push({ name: 'chat-id', params: { id: item.id } })" @save="onSaveConversation($event, item)" @delete="onDeleteConversation(item)" />
      </ConversationSelector>

      <div class="flex-1 flex justify-center w-full bg-neutral-700 text-white">
        <div class="w-full flex flex-col">
          <div class="flex-1 w-full overflow-x-hidden">
            <NuxtPage />
          </div>
          <div class="flex justify-center py-14 mx-auto md:w-full lg:max-w-3xl ">
            <ConversationInput v-model:value="message" @send="onSendMessage" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
