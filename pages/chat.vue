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
  const params = message.value
  message.value = ''
  const data = await send(params, route.params.id as string, route.query.storeId as string)
  if (!conversationId.value) { execute() }
  router.push({ name: 'chat-id', params: { id: data.conversationId } })
  
}
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full">
      <ConversationSelector>
        <ConversationSelectorItem v-for="item in data" :key="item.id" v-model:title="item.title" :is-active="isActive(item.id)" @click="router.push({ name: 'chat-id', params: { id: item.id }, query: { storeId: item.storeId } })" @save="onSaveConversation($event, item)" @delete="onDeleteConversation(item)" />
      </ConversationSelector>

      <div class="flex-1 flex justify-center w-full bg-neutral-700 text-white">
        <div class="relative w-full flex flex-col">
          <div class="top-0 bottom-0 left-0 right-0 w-full overflow-x-hidden pb-40">
            <NuxtPage />
          </div>
          <div class="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-neutral-700 from-50% to-transparent">
            <div class="flex justify-center py-14 mx-auto md:w-full lg:max-w-3xl px-8">
              <ConversationInput v-model:value="message" @send="onSendMessage" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

