<script setup lang="ts">
import SendAlt from '~icons/carbon/send-alt'

const props = withDefaults(defineProps<{
  value: string
}>(), { value: '' })

const emit = defineEmits(['update:value', 'send'])

const v = computed({
  get () {
    return props.value
  },
  set (value) {
    emit('update:value', value)
  }
})
</script>

<template>
  <div class="relative w-full">
    <input
      v-model="v"
      placeholder="Send a messasge ..."
      class="block w-full border-gray-300 shadow text-base rounded-lg pl-4 pr-7 py-3 bg-neutral-500 hover:shadow-lg focus:shadow-lg focus-visible:outline-none duration-300"
    />

    <SendAlt class="absolute right-2 bottom-3 cursor-pointer" @click="emit('send', value)" />
  </div>
</template>
