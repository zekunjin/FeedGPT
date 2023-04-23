<script lang="ts" setup>
defineProps<{
  value?: string
}>()

const emit = defineEmits(['create'])
</script>

<template>
  <div class="h-full w-64 p-3 box-border flex flex-col bg-neutral-800 text-white">
    <ConversationNewBtn class="mb-3" @click="emit('create')">
      New store
    </ConversationNewBtn>

    <div class="flex-1 overflow-y-auto flex flex-col gap-1">
      <slot />
    </div>
  </div>
</template>
