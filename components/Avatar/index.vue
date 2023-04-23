<script setup lang="ts">
withDefaults(defineProps<{
  color: string
  size?: number
}>(), { size: 36 }) 
</script>

<template>
  <div :style="{ width: `${size}px`, height: `${size}px`, background: color }" class="rounded text-white flex items-center justify-center shadow text-sm">
    <slot />
  </div>
</template>
