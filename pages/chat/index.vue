<script lang="ts" setup>
const message = ref('')
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full">
      <ConversationSelector />

      <div class="flex-1 flex flex-col bg-neutral-600 text-white">
        <div class="flex-1 w-full overflow-x-hidden">{{ message }}</div>
        <div class="flex justify-center py-14">
          <ConversationInput v-model:value="message" class="max-w-4xl" />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>