<script lang="ts" setup>
const message = ref('message')
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full">
      <ConversationSelector />

      <div class="flex-1 bg-neutral-600 text-white">
        <div>{{ message }}</div>
      </div>
    </div>
  </NuxtLayout>
</template>