<script lang="ts" setup>
const route = useRoute()
const storeId = computed(() => route.params.id as string)

const { data } = useLazyFetch(`/api/stores/${storeId.value}/sentences`)
</script>

<template>
  <div>
    <div v-for="item in data" :key="item.id">{{ item.content }}</div>
  </div>
</template>