<script setup lang="ts">
import AvatarQuestion from '~~/components/Avatar/Question.vue'
import AvatarAnswer from '~~/components/Avatar/Answer.vue'

const route = useRoute()
const { conversations, getConversationMessages } = useConversataionStore()

const conversationId = computed(() => route.params.id as string)

getConversationMessages(conversationId.value)
</script>

<template>
  <div class="flex flex-col gap-8 select-none py-8">
    <div v-for="item, index in conversations[conversationId]" :key="index" class="flex gap-4" :class="{ 'flex-row-reverse': isUserAuthorRole(item.authorRole) }">
      <component :is="isUserAuthorRole(item.authorRole) ? AvatarQuestion : AvatarAnswer" class="shrink-0" />
      <div class="py-2 px-4 rounded-lg bg-white/5 leading-7 max-w-2xl text-white/80">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
