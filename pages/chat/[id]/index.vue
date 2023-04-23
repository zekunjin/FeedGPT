<script setup lang="ts">
const route = useRoute()
const { conversations, getConversationMessages } = useConversataionStore()

const conversationId = computed(() => route.params.id as string)

getConversationMessages(conversationId.value)
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-for="item, index in conversations[conversationId]" :key="index">{{ item.content }}</div>
  </div>
</template>
