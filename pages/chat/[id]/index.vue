<script setup lang="ts">
const route = useRoute()

const { data } = useLazyFetch(`/api/conversations/${route.params.id}/messages`)
</script>

<template>
  <div>
    <div v-for="item in data" :key="item.id">{{ item.content }}</div>
  </div>
</template>
