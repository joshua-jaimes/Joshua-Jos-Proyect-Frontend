<template>
  <q-page class="flex flex-center" style="background: radial-gradient(circle at top, #2b0d0d 0%, #0a0410 70%); min-height: 100vh;">
    <div style="text-align:center; padding: 48px 24px;">
      <q-icon name="cancel" color="negative" size="5rem" style="filter: drop-shadow(0 0 20px #f87171);" />
      <h1 class="text-h4 text-white q-mt-lg q-mb-md" style="font-family:'Manrope',sans-serif;">
        Pago no completado
      </h1>
      <p class="text-grey-4 text-subtitle1 q-mb-xl">
        Algo salió mal con el pago. Puedes intentarlo de nuevo.
      </p>
      <q-btn
        unelevated
        color="negative"
        label="Volver a Membresías"
        icon="arrow_back"
        size="lg"
        style="border-radius:12px; font-weight:700;"
        @click="router.push({ name: 'MembresiasYPagos' })"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
