<script lang="ts" setup>
import Add from '~icons/carbon/add'

const emit = defineEmits(['click'])
</script>

<template>
  <div class="rounded border-white/10 border-solid border w-full p-3  cursor-pointer flex items-center gap-2 hover:bg-white/5 duration-300" @click="emit('click')">
    <Add />
    <div class="text-sm">
      <slot />
    </div>
  </div>
</template>
