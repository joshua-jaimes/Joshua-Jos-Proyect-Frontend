<template>
  <q-page class="flex flex-center" style="background: radial-gradient(circle at top, #0d2b0d 0%, #0a0410 70%); min-height: 100vh;">
    <div style="text-align:center; padding: 48px 24px;">
      <q-icon name="check_circle" color="positive" size="5rem" style="filter: drop-shadow(0 0 20px #4ade80);" />
      <h1 class="text-h4 text-white q-mt-lg q-mb-md" style="font-family:'Manrope',sans-serif;">
        ¡Pago exitoso! 🎉
      </h1>
      <p class="text-grey-4 text-subtitle1 q-mb-xl">
        Tu membresía <strong style="color:#4ade80">Místico Pro</strong> ha sido activada.<br>
        El universo está listo para guiarte.
      </p>
      <q-btn
        unelevated
        color="positive"
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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth.js'
import { postData } from '../services/apiCliente.js'

const router  = useRouter()
const auth    = useAuthStore()

onMounted(async () => {
  const userId = auth.usuario?._id
  if (!userId) return

  try {
    // Actualiza en la BD: estado=1, plan='premium'
    await postData('/usuario/activar-premium', { usuario_id: userId })

    // Refleja el cambio en el store local sin recargar
    if (auth.usuario) {
      auth.usuario.estado = 1
      auth.usuario.plan   = 'premium'
    }
  } catch (error) {
    console.error('Error activando premium:', error)
  }
})
</script>

