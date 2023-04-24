<script lang="ts" setup>
const route = useRoute()
const storeId = computed(() => route.params.id as string)

const text = ref('')

const { data } = useLazyFetch(`/api/stores/${storeId.value}/sentences`)

const onImport = async () => {
  const arr = text.value.split('。').filter(Boolean)
  text.value = ''
  debugger
  const { data } = await createEmbeddings(arr)
  useFetch('/api/sentences', {
    method: 'post', body: data.map(({ embedding }, index) => ({
      content: arr[index],
      vectors: JSON.stringify(embedding),
      storeId: storeId.value
    }))
  })
}
</script>

<template>
  <div>
    <button class="bg-blue-500 px-4 py-2 rounded border border-blue-50 block" @click="onImport">import text</button>
    <textarea v-model="text" class="block w-full text-black px-4 py-2" placeholder="Enter" />
    <div v-for="item in data" :key="item.id">{{ item.content }}</div>
  </div>
</template>