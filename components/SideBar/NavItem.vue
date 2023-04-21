<script lang="ts" setup>
const props = withDefaults(defineProps<{
  isActive: boolean
}>(), { isActive: false })

const emit = defineEmits(['click'])
</script>

<template>
  <div class="px-8 py-4 cursor-pointer duration-300" :class="{ 'bg-neutral-200': props.isActive, 'hover:bg-neutral-100': !props.isActive }" @click="emit('click')">
    <slot />
  </div>
</template>