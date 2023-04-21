<script lang="ts" setup>
const message = ref('message')
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full">
      <ConversationSelector />

      <div class="flex-1 bg-neutral-300">
        <div>{{ message }}</div>
      </div>
    </div>
  </NuxtLayout>
</template>