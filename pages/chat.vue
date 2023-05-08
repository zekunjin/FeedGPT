<script lang="ts" setup>
import { gsap } from 'gsap'
const message = ref('')

const route = useRoute()
const router = useRouter()

const selectorItemRefs = ref([])
const regenBtnRef = ref(null)
const inputRef = ref(null)
const { data, execute } = useLazyFetch('/api/conversations')
const { send, regenerateResponse } = useConversataionStore()

const conversationId = computed(() => route.params.id as string | undefined)
const storeId = computed(() => route.query.storeId as string | undefined)

const isActive = (id: string) => id === conversationId.value

const onSaveConversation = async (value: string, { id }: { id: string }) => {
  await useFetch(`/api/conversations/${id}`, { method: 'put', body: { title: value } })
}

const onDeleteConversation = async ({ id }: { id: string }) => {
  await useFetch(`/api/conversations/${id}`, { method: 'delete' })
  router.push({ name: 'chat' })
  execute()
}

const onRegenerateResponse = () => {
  if (!conversationId.value) { return }
  regenerateResponse(conversationId.value, storeId.value)
}

const onSendMessage = async () => {
  if (!message.value) { return }
  const params = message.value
  message.value = ''
  const data = await send(params, conversationId.value, storeId.value)
  if (!conversationId.value) {
    router.push({ name: 'chat-id', params: { id: data.conversationId } })
    execute()
  }
}
onMounted(async () => {
  await nextTick()
  gsap.from(inputRef.value, { y: 8, opacity: 0 })
  gsap.from(regenBtnRef.value, { opacity: 0, delay: 0.3 })
    
  gsap.from(selectorItemRefs.value, {
    y: 12,
    opacity: 0,
    stagger: {
      amount: 0.3,
      grid: "auto",
    }
  })
})
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full">
      <ConversationSelector>
      <div v-for="item in data" :key="item.id" ref="selectorItemRefs">
        <ConversationSelectorItem v-model:title="item.title" :is-active="isActive(item.id)" @click="router.push({ name: 'chat-id', params: { id: item.id }, query: { storeId: item.storeId } })" @save="onSaveConversation($event, item)" @delete="onDeleteConversation(item)" />
      </div>
      </ConversationSelector>

      <div class="flex-1 flex justify-center w-full bg-neutral-700 text-white">
        <div class="relative w-full flex flex-col">
          <div class="top-0 bottom-0 left-0 right-0 w-full overflow-x-hidden pb-40">
            <NuxtPage />
          </div>
          <div class="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-neutral-700 from-50% to-transparent">
            <div ref="messageContainerRef" class="flex flex-col items-center justify-center py-14 mx-auto md:w-full lg:max-w-3xl px-8">
              <div ref="regenBtnRef" class="mb-2">
                <ConversationRegenerateResponseBtn @click="onRegenerateResponse" />
              </div>
              
              <div ref="inputRef" class="w-full">
                <ConversationInput v-model:value="message" @send="onSendMessage" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

