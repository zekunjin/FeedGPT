<script setup lang="ts">
import AvatarQuestion from '~~/components/Avatar/Question.vue'
import AvatarAnswer from '~~/components/Avatar/Answer.vue'

const route = useRoute()
const { conversations, getConversationMessages } = useConversataionStore()

const conversationId = computed(() => route.params.id as string)

getConversationMessages(conversationId.value)
</script>

<template>
  <div class="flex flex-col pb-8 w-full">
    <div v-for="item, index in conversations[conversationId]" :key="index" :class="{ 'bg-neutral-600': !isUserAuthorRole(item.authorRole) }">
      <div class="flex gap-4 py-4 max-w-3xl mx-auto px-8">
        <component :is="isUserAuthorRole(item.authorRole) ? AvatarQuestion : AvatarAnswer" class="shrink-0" />
        <div class="py-1 px-4 rounded-lg leading-6 text-white/80 whitespace-pre-wrap">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>
