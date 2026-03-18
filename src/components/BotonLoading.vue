<template>
  <q-btn v-bind="$attrs" @click="handleClick" :disable="loading || disable">
    <template v-slot:default>
      <q-spinner v-if="loading" color="primary" size="3em" :thickness="2" />
      <span v-else style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <q-icon v-if="icon" :name="icon" />
        <slot>{{ label }}</slot>
      </span>
    </template>
  </q-btn>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (e) => {
  emit('click', e)
}
</script>
