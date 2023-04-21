<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: string
}>(), { value: '' })

const emit = defineEmits(['update:value'])
</script>