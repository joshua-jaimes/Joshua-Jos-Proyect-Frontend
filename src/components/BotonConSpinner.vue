<template>
  <button
    :type="type"
    :class="customClass"
    :disabled="loading || disabled"
    @click="handleClick"
  >
    <!-- Spinner personalizado -->
    <span v-if="loading" class="spinner"></span>
    
    <!-- Ícono opcional (solo se muestra si no está cargando) -->
    <span v-if="!loading && icon" class="material-icons q-mr-sm" style="margin-right: 6px;">{{ icon }}</span>
    
    <!-- Texto del botón -->
    <span v-if="!loading">{{ label }}</span>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  icon: { type: String, default: null }, // Para usar con Material Icons ej: 'arrow_forward'
  type: { type: String, default: 'button' }, // 'button' o 'submit' para formularios
  customClass: { type: String, default: '' } // Útil para pasar clases como .login-btn o .mp-btn
})

const emit = defineEmits(['click'])

const handleClick = (e) => {
  // Previene múltiples clics si ya está cargando o deshabilitado
  if (!props.loading && !props.disabled) {
    emit('click', e)
  }
}
</script>

<style scoped>
/* Spinner idéntico al solicitado */
.spinner {
  width: 1.2em;
  height: 1.2em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Base genérica si no se le pasa una clase CSS */
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}
</style>
