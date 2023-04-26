<script lang="ts" setup>
import Edit from '~icons/carbon/edit'
import TrashCan from '~icons/carbon/trash-can'

const route = useRoute()
const storeId = computed(() => route.params.id as string)

const text = ref('')
const isEdit = ref<Record<string, boolean>>({})
const inputSentences = ref<Record<string, string>>({})

const { data, execute } = useLazyFetch(`/api/stores/${storeId.value}/sentences`)

const onImport = async () => {
  const arr = text.value.split('。').filter(Boolean)
  text.value = ''
  const { data } = await createEmbeddings(arr)
  useFetch('/api/sentences', {
    method: 'post', body: data.map(({ embedding }, index) => ({
      content: arr[index],
      vectors: JSON.stringify(embedding),
      storeId: storeId.value
    }))
  })
}

const onEdit = (index: number) => {
  isEdit.value[index] = !isEdit.value[index]
  if (isEdit.value[index]) {
    if (!data.value?.[index]) { return }
    inputSentences.value[index] = data.value[index].content
  }
}

const onDelete = async (index: number) => {
  const item = data.value?.[index]
  if (!item) { return }
  await useFetch(`/api/sentences/${item.id}`, { method: 'delete' })
  data.value?.splice(index, 1)
}
</script>

<template>
  <div class="h-full overflow-y-auto">
    <button class="bg-blue-500 px-4 py-2 rounded border border-blue-50 block" @click="onImport">import text</button>
    <textarea v-model="text" class="block w-full text-black px-4 py-2" placeholder="Enter" />

    <div class="w-full p-6 leading-6">
      <div class="font-bold border-b border-white/25 py-[6px] pr-2">SENTENCE</div>

      <div class="flex flex-col">
        <div v-for="item, index in data" :key="item.id" class="flex w-full text-white/80 border-b border-white/25 py-[6px] pr-2 gap-4">
          <div class="flex-1 w-0">
            <div v-if="isEdit[index]">
              <input v-model="inputSentences[index]" class="w-full bg-transparent focus-visible:outline-none"/>
            </div>
            <div v-if="!isEdit[index]">{{ item.content }}</div>
          </div>

          <div class="flex gap-2 text-xs h-6 items-center">
            <Edit class="hover:text-white duration-300 cursor-pointer" @click="onEdit(index)" />
            <TrashCan class="hover:text-white duration-300 cursor-pointer" @click="onDelete(index)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>