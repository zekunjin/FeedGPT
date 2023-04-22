<script setup lang="ts">
const route = useRoute()

const { data } = useLazyFetch(`/api/conversations/${route.params.id}/messages`)
</script>

<template>
  <div>{{ data }}</div>
</template>
