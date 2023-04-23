<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const { data, execute } = useLazyFetch('/api/stores')

const storeId = computed(() => route.params.id as string | undefined)

const isActive = (id: string) => id === storeId.value

const onCreateStore = async () => {
  await useFetch('/api/stores', { method: 'post', body: { name: 'New store' } })
  execute()
}

const onSaveStore = async (value: string, { id }: { id: string }) => {
  await useFetch(`/api/conversations/${id}`, { method: 'put', body: { title: value } })
}

const onDeleteStore = async ({ id }: { id: string }) => {
  await useFetch(`/api/stores/${id}`, { method: 'delete' })
  router.push({ name: 'store' })
  execute()
}
</script>

<template>
  <NuxtLayout>
    <div class="flex h-full w-full">
      <StoreSelector @create="onCreateStore">
        <StoreSelectorItem v-for="item in data" :key="item.id" v-model:name="item.name" :is-active="isActive(item.id)" @click="router.push({ name: 'store-id', params: { id: item.id } })" @save="onSaveStore($event, item)" @delete="onDeleteStore(item)" />
      </StoreSelector>

      <div class="flex-1 flex justify-center w-full bg-neutral-700 text-white">
        <div class="w-full h-full">
          <NuxtPage />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
