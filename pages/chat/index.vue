<script lang="ts" setup>
const message = ref('')
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full">
      <ConversationSelector />

      <div class="flex-1 flex justify-center w-full bg-neutral-600 text-white">
        <div class="flex flex-col px-4 md:min-w-full lg:min-w-[56rem]">
          <div class="flex-1 w-full overflow-x-hidden max-w-4xl">
            {{ message }}
          </div>
          <div class="flex justify-center py-14">
            <ConversationInput v-model:value="message" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
