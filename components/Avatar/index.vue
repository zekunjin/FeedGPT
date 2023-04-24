<script setup lang="ts">
withDefaults(defineProps<{
  color: string
  size?: number
}>(), { size: 30 }) 
</script>

<template>
  <div :style="{ width: `${size}px`, height: `${size}px`, background: color }" class="rounded-sm text-white flex items-center justify-center shadow text-sm">
    <slot />
  </div>
</template>
