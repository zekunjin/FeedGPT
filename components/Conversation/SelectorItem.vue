<script setup lang="ts">
withDefaults(defineProps<{
  title: string,
  isActive?: boolean
}>(), { isActive: false })

const emit = defineEmits(['click'])
</script>

<template>
  <div class="p-3 rounded cursor-pointer text-sm duration-300" :class="{ 'bg-white/10': isActive, 'hover:bg-white/5': !isActive }" @click="emit('click')">
    {{ title }}
  </div>
</template>
