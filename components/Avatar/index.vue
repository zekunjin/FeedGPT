<script setup lang="ts">
withDefaults(defineProps<{
  color: string
  size?: number
}>(), { size: 44 }) 
</script>

<template>
  <div :style="{ width: `${size}px`, height: `${size}px`, background: color }" class="rounded-full text-white flex items-center justify-center shadow">
    <slot />
  </div>
</template>
