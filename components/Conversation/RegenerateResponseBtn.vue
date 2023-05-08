<script setup lang="ts">
import Renew from '~icons/carbon/renew'
const emit = defineEmits(['click'])
</script>

<template>
  <div class="rounded flex items-center gap-2 cursor-pointer text-sm text-white/50 border border-white/25 px-4 py-2 bg-neutral-700 hover:border-white/50 hover:text-white/75 duration-300" @click="emit('click')">
    <Renew />
    <div>Regenerate response</div>
  </div>
</template>
