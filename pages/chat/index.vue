<script lang="ts" setup>
const message = ref('message')
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full">
      <ConversationSelector />

      <div class="flex-1 flex flex-col bg-neutral-600 text-white">
        <div class="flex-1">{{ message }}</div>
        <div>
          <ConversationInput v-model:value="message" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>