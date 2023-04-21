<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string
}>(), { value: '' })

const emit = defineEmits(['update:value'])

const v = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('update:value', value)
  }
})
</script>

<template>
  <input v-model="v" class="text-black" />
</template>