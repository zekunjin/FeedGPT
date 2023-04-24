<script setup lang="ts">
import Edit from '~icons/carbon/edit'
import EditOff from '~icons/carbon/edit-off'
import TrashCan from '~icons/carbon/trash-can'

const props = withDefaults(defineProps<{
  name: string,
  isActive?: boolean
}>(), { isActive: false })

const emit = defineEmits(['click', 'delete', 'save', 'update:name'])

const isEdit = ref(false)
const inputName = ref('')

watch(() => props.isActive, (value) => {
  if (!value) { isEdit.value = false }
})

const toggleEdit = () => {
  isEdit.value = !isEdit.value

  if (isEdit.value) {
    inputName.value = props.name
  }

  if (!isEdit.value) {
    emit('save', inputName.value)
    emit('update:name', inputName.value)
  }
}
</script>

<template>
  <div class="p-3 rounded cursor-pointer duration-300 flex justify-between items-center" :class="{ 'bg-white/10': isActive, 'hover:bg-white/5': !isActive }" @click="emit('click')">
    <div class="text-sm h-6">
      <div v-if="!isEdit" class="w-36 truncate">
        {{ name }}
      </div>

      <div v-if="isEdit">
        <input v-model="inputName" autofocus="true" class="bg-transparent focus-visible:outline-none">
      </div>
    </div>

    <div v-show="isActive" class="flex items-center gap-2 text-xs text-white/50">
      <component :is="isEdit ? EditOff : Edit" class="hover:text-white duration-300" @click="toggleEdit" />
      <TrashCan class="hover:text-white duration-300" @click="emit('delete')" />
    </div>
  </div>
</template>
