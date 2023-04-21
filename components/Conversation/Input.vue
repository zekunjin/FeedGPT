<script setup lang="ts">
import SendAlt from '~icons/carbon/send-alt'

const props = withDefaults(defineProps<{
  value: string
}>(), { value: '' })

const emit = defineEmits(['update:value'])

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
    <input v-model="v" placeholder="Send a messasge ..." class="block w-full border-gray-300 shadow-lg text-sm rounded-lg pl-4 pr-7 py-3 bg-neutral-500">
    <SendAlt class="absolute right-2 top-1/2 -translate-y-1/2" />
  </div>
</template>
