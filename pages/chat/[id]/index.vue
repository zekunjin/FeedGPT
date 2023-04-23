<script setup lang="ts">
const route = useRoute()
const { conversations, getConversationMessages } = useConversataionStore()

const conversationId = computed(() => route.params.id as string)

getConversationMessages(conversationId.value)
</script>

<template>
  <div>
    <div v-for="item, index in conversations[conversationId]" :key="index">{{ item }}</div>
  </div>
</template>
