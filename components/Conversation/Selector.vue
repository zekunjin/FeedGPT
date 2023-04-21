<script lang="ts" setup>
const props = defineProps<{
  value?: string
}>()
</script>

<template>
  <div class="h-full w-64 p-3 box-border flex flex-col bg-neutral-800 text-white">
    <ConversationNewBtn class="mb-1">
      New chat
    </ConversationNewBtn>

    <div class="flex-1 overflow-y-auto">
    </div>
  </div>
</template>
