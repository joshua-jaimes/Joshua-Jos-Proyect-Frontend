<template>
  <q-page class="flex flex-center" style="background: radial-gradient(circle at top, #0d2b0d 0%, #0a0410 70%); min-height: 100vh;">
    <div style="text-align:center; padding: 48px 24px; max-width: 500px;">

      <!-- Confirmando pago -->
      <template v-if="confirmando">
        <q-spinner-dots color="positive" size="4rem" />
        <h1 class="text-h5 text-white q-mt-lg q-mb-md" style="font-family:'Manrope',sans-serif;">
          Confirmando tu pago...
        </h1>
        <p class="text-grey-4">Un momento, estamos activando tu membresía.</p>
      </template>

      <!-- Pago confirmado -->
      <template v-else>
        <q-icon name="check_circle" color="positive" size="5rem" style="filter: drop-shadow(0 0 20px #4ade80);" />
        <h1 class="text-h4 text-white q-mt-lg q-mb-md" style="font-family:'Manrope',sans-serif;">
          ¡Pago exitoso! 🎉
        </h1>
        <p class="text-grey-4 text-subtitle1 q-mb-xl">
          Tu membresía <strong style="color:#4ade80">Místico Pro</strong> ha sido activada.<br>
          El universo está listo para guiarte.
        </p>

        <!-- Contador de redirección -->
        <p v-if="segundos > 0" class="text-grey-5 text-caption q-mb-lg">
          Redirigiendo al login en {{ segundos }} segundos...
        </p>

        <!-- Botones de Navegación -->
        <div class="row q-mt-lg justify-center q-gutter-md">
          <q-btn
            unelevated
            color="positive"
            label="Ir al Dashboard"
            icon="dashboard"
            size="lg"
            style="border-radius:12px; font-weight:700;"
            @click="router.push({ name: 'dashboard' })"
          />

          <q-btn
            outline
            color="white"
            label="Volver al Login"
            icon="login"
            size="lg"
            style="border-radius:12px; font-weight:700; border: 2px solid rgba(255,255,255,0.4);"
            @click="router.push({ path: '/' })"
          />
        </div>
      </template>

    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/Auth.js'
import { useNotify } from '../composables/useNotify.js'
import axiosInstance from '../plugins/pluginAxios.js'

const router = useRouter()
const route  = useRoute()
const auth   = useAuthStore()
const { notifySuccess, notifyError } = useNotify()

const segundos   = ref(4)
const confirmando = ref(true)   // muestra spinner mientras confirma
let countdown = null

onMounted(async () => {
  // ── PASO 1: Leer parámetros que envía Mercado Pago ────────────────────────
  const payment_id = route.query.payment_id
    || route.query.collection_id
    || 'sin_id'

  const status = route.query.status
    || route.query.collection_status
    || 'approved'

  const external_reference = route.query.external_reference
    || auth.usuario?._id
    || localStorage.getItem('pending_payment_user_id')

  console.log('=== [PagoExitoso] Parámetros detectados ===')
  console.log('  payment_id       :', payment_id)
  console.log('  status           :', status)
  console.log('  external_reference (URL):', route.query.external_reference)
  console.log('  userId (con fallbacks)  :', external_reference)

  // ── PASO 2: Llamar al backend para confirmar y actualizar MongoDB ──────────
  if (external_reference) {
    try {
      console.log('📤 Enviando a /mercadopago/confirmar-pago...')
      const res = await axiosInstance.post('/mercadopago/confirmar-pago', {
        payment_id,
        status,
        external_reference,
      })
      console.log('✅ Respuesta del backend:', res.data)
      notifySuccess('¡Pago exitoso! Ahora eres premium ✨', 'stars')
      localStorage.removeItem('pending_payment_user_id')
    } catch (err) {
      const msg = err.response?.data?.error || err.message
      console.error('❌ Error en confirmar-pago:', msg)
      notifyError('El pago fue registrado, pero hubo un problema al actualizar. Contacta soporte.', 'warning')
    }
  } else {
    console.warn('⚠️ No se encontró userId. No se confirmará con backend.')
  }

  // ── PASO 3: Actualizar Pinia SIEMPRE (para UX inmediata) ──────────────────
  if (auth.usuario) {
    auth.$patch({
      usuario: {
        ...auth.usuario,
        plan:             'mistico_pro',
        estadoPlan:       'activo',
        premiumActivo:    true,
        estado:           1,
        fechaPagoPremium: new Date().toISOString(),
      }
    })
    console.log('🌟 Pinia actualizada → plan:', auth.usuario.plan)

    try {
      const stored = JSON.parse(localStorage.getItem('auth') || '{}')
      stored.usuario = auth.usuario
      localStorage.setItem('auth', JSON.stringify(stored))
      console.log('💾 localStorage["auth"] actualizado')
    } catch (e) {
      console.warn('⚠️ Error al actualizar localStorage:', e)
    }
  }

  // ── PASO 4: Ocultar spinner y arrancar countdown ───────────────────────────
  confirmando.value = false

  countdown = setInterval(() => {
    segundos.value--
    if (segundos.value <= 0) {
      clearInterval(countdown)
      router.push({ path: '/' })
    }
  }, 1000)
})

onUnmounted(() => {
  if (countdown) clearInterval(countdown)
})
</script>
