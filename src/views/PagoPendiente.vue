<template>
  <q-page class="flex flex-center" style="background: radial-gradient(circle at top, #1a1a00 0%, #0a0410 70%); min-height: 100vh;">
    <div style="text-align:center; padding: 48px 24px;">
      <q-icon name="hourglass_top" color="warning" size="5rem" style="filter: drop-shadow(0 0 20px #facc15);" />
      <h1 class="text-h4 text-white q-mt-lg q-mb-md" style="font-family:'Manrope',sans-serif;">
        Pago en revisión ⏳
      </h1>
      <p class="text-grey-4 text-subtitle1 q-mb-xl">
        Tu pago está siendo procesado.<br>
        Te notificaremos cuando se confirme.
      </p>
      <q-btn
        unelevated
        color="warning"
        label="Ir al Dashboard"
        icon="dashboard"
        size="lg"
        style="border-radius:12px; font-weight:700;"
        @click="router.push({ name: 'dashboard' })"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
