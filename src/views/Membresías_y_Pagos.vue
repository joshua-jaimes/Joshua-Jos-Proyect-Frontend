<template>
  <q-page class="flex flex-center" style="background: radial-gradient(circle at top, #2b1154 0%, #0a0410 70%); min-height: 100vh; position: relative; overflow: hidden;">
    <!-- Botón Volver -->
    <div style="position: absolute; top: 20px; left: 20px; z-index: 10;">
      <q-btn flat dense color="warning" icon="arrow_back" label="Volver atrás" @click="router.back()" />
    </div>

    <!-- Partículas / Luces de fondo -->
    <div class="bg-glow-tr" style="background: rgba(138,43,226,0.15); filter: blur(80px); width: 400px; height: 400px; border-radius: 50%; position: absolute; top: -10%; right: -10%;"></div>
    <div class="bg-glow-bl" style="background: rgba(242,185,13,0.1); filter: blur(90px); width: 350px; height: 350px; border-radius: 50%; position: absolute; bottom: -5%; left: -5%;"></div>
    <div class="pattern" style="opacity: 0.2; background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 20px 20px; position: absolute; top: 0; left: 0; right: 0; bottom: 0;"></div>

    <!-- Contenedor Único -->
    <div style="position: relative; z-index: 2; padding: 24px; width: 100%; max-width: 480px;">
      <q-card
        class="text-center q-pa-xl"
        dark
        style="background: rgba(20, 10, 30, 0.7); border: 1px solid rgba(138, 43, 226, 0.3); border-radius: 24px; box-shadow: 0 16px 48px rgba(138, 43, 226, 0.25); backdrop-filter: blur(16px);"
      >
        <div style="margin-bottom: 24px;">
          <q-icon name="auto_awesome" color="warning" size="4.5rem" style="filter: drop-shadow(0 0 12px rgba(242,185,13,0.6));" />
        </div>
        
        <h1 class="text-h4 text-weight-bolder text-white q-mt-none q-mb-md" style="letter-spacing: -0.5px; font-family: 'Manrope', sans-serif;">
          Activa tu energía premium ✨
        </h1>
        
        <p class="text-subtitle1 text-grey-4 q-mb-xl" style="line-height: 1.6; font-size: 1.1rem;">
          Desbloquea tu potencial con NumerAI. 🔮 Accede a revelaciones cuánticas y predicciones personalizadas para elevar tu frecuencia vital.
        </p>

        <!-- Botón Mercado Pago con estilos interactivos mejorados -->
        <q-btn
          unelevated
          size="xl"
          class="text-weight-bold full-width btn-mercado-pago"
          :loading="loadingMP"
          @click="pagarConMercadoPago"
        >
          <template v-slot:loading>
            <q-spinner color="white" size="1.2em" />
            <span class="q-ml-sm" style="font-size:16px;">Redirigiendo...</span>
          </template>
          <span v-if="!loadingMP" style="display:flex; align-items:center; justify-content:center; gap:12px; font-size: 18px;">
            💳 Pagar con Mercado Pago
          </span>
        </q-btn>
        
        <!-- Sello de confianza sutil -->
        <div class="q-mt-lg text-caption text-grey-5" style="display:flex; align-items:center; justify-content:center; gap:6px; letter-spacing: 0.5px;">
          <q-icon name="security" size="xs" color="positive" /> 
          Transacción segura de alta frecuencia
        </div>

      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth.js'
import { postData } from '../services/apiCliente.js'
import { useNotify } from '../composables/useNotify.js'

const router = useRouter()
const auth = useAuthStore()
const { notifyError } = useNotify()

// annualBilling eliminado — solo plan mensual
const activePayTab  = ref('card')
const cardHolder    = ref('')
const cardNumber    = ref('')
const cardExp       = ref('')
const cardCvc       = ref('')
const loadingMP     = ref(false)

// ══ Plan mensual fijo ══
const precioActual = () => 29000                          // COP
const tituloActual = () => 'Plan Premium Mensual - NumeraAI'

// ══ Pagar con Mercado Pago ══
const pagarConMercadoPago = async () => {
  try {
    loadingMP.value = true
    const data = await postData('/mercadopago/create-preference', {
      titulo: tituloActual(),
      precio: precioActual(),
      cantidad: 1,
      usuario_id: auth.usuario?._id || null,
    })

    // ← cambiar a false cuando vayas a producción
    const esSandbox = true
    const url = esSandbox
      ? (data.sandbox_init_point || data.init_point)
      : data.init_point

    if (url) {
      window.location.href = url
    } else {
      console.error('No se recibió URL de pago de Mercado Pago')
      notifyError('No se pudo iniciar el pago, intenta de nuevo', 'error_outline')
    }
  } catch (error) {
    console.error('Error al iniciar pago:', error)
    notifyError('Error al conectar con Mercado Pago, intenta de nuevo', 'error_outline')
  } finally {
    loadingMP.value = false
  }
}


const premiumFeatures = [
  'Lecturas de IA ilimitadas',
  'Compatibilidad de pareja',
  'Predicciones anuales 2024',
  'Soporte prioritario VIP',
]

const testimonialAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBixL84wwvJVq138UUzQaLGBheyLZ24XGnN1P2xkTYTn25nTFKRmZbb-JCEGUCM8n7LSSXMZS8Sv0oJO7BmNHV5Wmz_NwPfMEnd6Ep5ZKPqHSlK2zQtJ_o3JAkMWXT34ATmKeqtaH2C39kepNmRzNTS9L3SJI8pX2nb3VM4oFx1WXs8tnCLC2kVKjOoZCWvMoe9XubDWIbcaTh-PFV08m7-7k-0xwgyOWjT6j2LwwnauUzvMOe92CCjCU9hzPBeF33zN1ynDZRd6s4'
const visaLogo          = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDde6rjrzXbC0Hbt1Moc0-NRqv4-4uPq6TBSgsH5y5xB0YOcjAPw-619-RdbCKVg6ErfveyIF1MuloWeip-DsfPz3d3EElqA2oBRv7byevm6CjCMZQGoWvppMhmqwDGfEB-aZZBIMx3uZxSsgcVUBg4MmyLhU5OX0okkLl9jAz9j-Vtge0xzngnfpiU13cQC_ctsxfolA7FBlia1NNUDQalvAvCndMvRJvaDi5lSozkSWOB04vE06C03jDAeMF1pxP6akEalPikYMc'
const mcLogo            = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxlRIjo2Zv_2XdG9vmGH5SHv4Ol43XUq-dQsOJSZJyyYck1GyA1WLoJtqfJX2gpX7AsPqUuVFDsHE4_WTNd6Mzckr9LvjAnbJyl3mzgdg5D5-2eA5THnwecotuNnzTXDrfb3CFRq0JcDXzr4vYco5y60hdGZQpkkahDrh92v6vzKcWSqeC9Th81-GokDWS-gzhEgKr163t8IO6k2bF3JSuX-5Zpt9loiw--_BCm0T5HJrOXzpYzlnSQNaSKyRrcx-2qVO-x3JqeBc'
const stripeLogo        = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNdbbZ9lIOPrA6l0M8_WUNEPSbxJEQjML97FHRbt0TPQ6wzBFDYVi5GrAw_3mqOrrw9u6DjTRqPIpAeJH0zE-4s7cwNRMsfYMmA_9mtNx0YY1HQmbSMZT4mKBlKTjK9LzrVDGzr78XqUb1mjPeVoiBWiPFTjStOIloF1YPLa2thKOuQBf0vVhzfLF4G-d_q_XfK5j8FdiusnNnQQ0sETYYFOXgMsTxzKK-2VrUgnJAV9KPTAR60mg8U2PygsqtqbAL7oADCPQy7x8'
const paypalLogo        = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcy2a6qwZ-FaVCGWRZHECneQk0GOtz1wPNhMc0FJLBvY0uJywN1oAzWFSzJYZroXzqb8YTIrj5NNQHQqovS3XgbYALcSAHTQ5MIAXVbsk80G2nkzMyhcN9ZXs4bKirnnZo5-EKdmfO1Ms_vt3cq_-ezFW0FhM20nBh5tTASGUzNeWtLsT_W-u0u2ylBS7wkHhfTbEfwBxp8TY1EMr31NN4iYTvI9fseymFaSCmn2GGDuMaBnRb0afsgRO4EAdqaf86Q4AquMMDTYE'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #221e10; }
::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #f2b90d; }

.mi {
  font-family: 'Material Icons';
  font-weight: normal; font-style: normal; font-size: 20px;
  line-height: 1; letter-spacing: normal; text-transform: none;
  display: inline-block; white-space: nowrap; -webkit-font-smoothing: antialiased;
}


/* ── Page ── */
:deep(.main-page) { background: #221e10 !important; min-height: calc(100vh - 64px); position: relative; overflow: hidden; }
.bg-glow-tr { position: absolute; top: -10%; right: -5%; width: 384px; height: 384px; background: rgba(242,185,13,0.05); border-radius: 50%; filter: blur(64px); pointer-events: none; z-index: 0; }
.bg-glow-bl { position: absolute; bottom: -10%; left: -5%; width: 384px; height: 384px; background: rgba(242,185,13,0.05); border-radius: 50%; filter: blur(64px); pointer-events: none; z-index: 0; }
.page-content { position: relative; z-index: 10; max-width: 1152px; margin: 0 auto; padding: 48px 16px 64px; }

/* Heading */
.page-heading { text-align: center; margin-bottom: 48px; }
.page-title { font-size: clamp(24px, 4vw, 36px); font-weight: 700; color: #fff; margin-bottom: 16px; }
.page-sub { font-size: 15px; color: #9ca3af; max-width: 640px; margin: 0 auto 32px; line-height: 1.6; }

.billing-toggle { display: flex; align-items: center; justify-content: center; gap: 16px; }
.toggle-label { font-size: 14px; font-weight: 500; color: #9ca3af; }
.toggle-label.active { color: #fff; }
.toggle-wrap { cursor: pointer; }
.toggle-track { width: 56px; height: 28px; background: #2d291c; border: 1px solid #555; border-radius: 999px; position: relative; transition: background .3s; }
.toggle-track.on { background: #f2b90d; }
.toggle-thumb { position: absolute; top: 2px; left: 4px; width: 22px; height: 22px; border-radius: 50%; background: #fff; transition: transform .3s; }
.toggle-track.on .toggle-thumb { transform: translateX(28px); }
.annual-badge { background: rgba(242,185,13,0.2); color: #f2b90d; font-size: 11px; padding: 2px 8px; border-radius: 999px; border: 1px solid rgba(242,185,13,0.3); font-weight: 600; }

/* Grid */
.content-grid { display: grid; grid-template-columns: 7fr 5fr; gap: 32px; align-items: start; }
@media (max-width: 1024px) { .content-grid { grid-template-columns: 1fr; } }

/* Plans */
.plans-col { display: flex; flex-direction: column; gap: 24px; }

/* Premium */
.premium-card-wrap { position: relative; cursor: pointer; }
.premium-glow { position: absolute; inset: -2px; background: linear-gradient(135deg, #f2b90d, rgba(242,185,13,0.5)); border-radius: 16px; filter: blur(6px); opacity: 0.3; transition: opacity .2s; pointer-events: none; z-index: 0; }
.premium-card-wrap:hover .premium-glow { opacity: 0.6; }
.premium-card { position: relative; z-index: 1; background: #2d291c; border: 2px solid #f2b90d; border-radius: 16px; padding: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
.recommended-badge { position: absolute; top: 0; right: 0; background: #f2b90d; color: #221e10; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 0 12px 0 12px; text-transform: uppercase; letter-spacing: 0.08em; }

.plan-top { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; }
.plan-name { font-size: 22px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 8px; }
.plan-verified { font-size: 18px !important; color: #f2b90d; }
.plan-name.monthly { font-size: 19px; }
.plan-desc { font-size: 14px; color: #9ca3af; margin-top: 4px; }
.plan-price { text-align: right; }
.plan-price-main { font-size: 30px; font-weight: 700; color: #fff; }
.plan-price-main span { font-size: 17px; color: #9ca3af; font-weight: 400; }
.plan-price-main.monthly-price { font-size: 24px; }
.monthly-denom { font-size: 15px !important; }
.plan-price-sub { font-size: 12px; color: #f2b90d; font-weight: 500; margin-top: 4px; }

.features-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 24px; }
@media (max-width: 600px) { .features-grid { grid-template-columns: 1fr; } }
.feature-item { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #d1d5db; }
.feature-check { width: 20px; height: 20px; border-radius: 50%; background: rgba(242,185,13,0.2); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.check-icon { font-size: 14px !important; color: #f2b90d; }

/* Monthly */
.monthly-card { cursor: pointer; background: rgba(45,41,28,0.5); border: 1px solid #374151; border-radius: 16px; padding: 24px 32px; opacity: 0.7; transition: opacity .2s, border-color .2s; }
.monthly-card:hover { opacity: 1; border-color: rgba(242,185,13,0.5); }
.monthly-features { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 16px; }
.monthly-feature { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #9ca3af; }
.monthly-check { font-size: 16px !important; color: #9ca3af; }

/* Testimonial */
.testimonial { background: rgba(242,185,13,0.05); border: 1px solid rgba(242,185,13,0.1); border-radius: 12px; padding: 24px; display: flex; gap: 16px; align-items: flex-start; }
.testimonial-quote { font-size: 40px; color: rgba(242,185,13,0.4); font-family: serif; line-height: 1; flex-shrink: 0; }
.testimonial-text { font-size: 14px; color: #d1d5db; font-style: italic; line-height: 1.6; }
.testimonial-author { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
.testimonial-avatar { width: 24px; height: 24px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
.testimonial-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
.testimonial-name { font-size: 12px; font-weight: 700; color: #fff; }
.testimonial-stars { display: flex; color: #f2b90d; }
.star-icon { font-size: 14px !important; }

/* Payment card */
.payment-card { background: #2d291c; border: 1px solid #374151; border-radius: 16px; overflow: hidden; position: sticky; top: 88px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
.payment-header { padding: 24px; background: rgba(0,0,0,0.2); border-bottom: 1px solid #374151; }
.payment-header-title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 16px; }

.pay-tabs { display: flex; padding: 4px; background: rgba(0,0,0,0.4); border-radius: 8px; }
.pay-tab { flex: 1; padding: 8px 12px; border-radius: 6px; border: none !important; font-family: 'Manrope', sans-serif; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all .2s; }
.pay-tab.active { background: #2d291c !important; color: #fff; font-weight: 600; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
.pay-tab.inactive { background: transparent !important; color: #9ca3af; font-weight: 500; }
.pay-tab.inactive:hover { color: #fff; }
.pay-tab-icon { font-size: 18px !important; }

.payment-body { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
.form-fields { display: flex; flex-direction: column; gap: 16px; }

.field-label { display: block; font-size: 11px; font-weight: 500; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.input-wrap { position: relative; }
.input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 18px !important; pointer-events: none; }
.pay-input { width: 100%; padding: 10px 12px 10px 40px; background: #221e10 !important; border: 1px solid #4b5563; border-radius: 8px; color: #fff; font-family: 'Manrope', sans-serif; font-size: 14px; outline: none; transition: border-color .2s, box-shadow .2s; -webkit-appearance: none; }
.pay-input::placeholder { color: #6b7280; }
.pay-input:focus { border-color: #f2b90d !important; box-shadow: 0 0 0 2px rgba(242,185,13,0.2) !important; }
.card-logos { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); display: flex; gap: 4px; align-items: center; }
.card-logo { height: 14px; opacity: 0.7; }
.card-logo.mc { height: 18px; }
.input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

.transfer-placeholder { text-align: center; padding: 32px 0; color: #9ca3af; font-size: 14px; }
.transfer-icon { font-size: 40px !important; color: #6b7280; display: block; margin-bottom: 12px; }

.summary { border-top: 1px solid #374151; padding-top: 16px; display: flex; flex-direction: column; gap: 8px; }
.summary-row { display: flex; justify-content: space-between; font-size: 14px; color: #9ca3af; }
.summary-row.green { color: #4ade80; }
.summary-row.total { color: #fff; font-weight: 700; font-size: 18px; padding-top: 8px; }

.pay-btn { width: 100%; background: #f2b90d !important; color: #221e10 !important; border: none !important; border-radius: 12px !important; padding: 14px 24px; font-family: 'Manrope', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 8px 24px rgba(242,185,13,0.2); transition: background .2s, transform .1s; }
.pay-btn:hover { background: #d4a00b !important; transform: scale(1.01); }
.pay-lock-icon { font-size: 20px !important; }

.ssl-note { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: #6b7280; }
.ssl-icon { font-size: 16px !important; color: #4ade80; }

/* Trust footer */
.trust-footer { margin-top: 64px; padding: 32px 0; border-top: 1px solid #374151; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px; }
.trust-logos { display: flex; align-items: center; gap: 24px; opacity: 0.6; filter: grayscale(1); transition: all .5s; }
.trust-logos:hover { opacity: 1; filter: grayscale(0); }
.trust-logo { height: 24px; }
.trust-links { display: flex; gap: 32px; flex-wrap: wrap; }
.trust-link { font-size: 14px; color: #9ca3af; text-decoration: none; transition: color .2s; }
.trust-link:hover { color: #f2b90d; }


/* ── Botón Interactivo de Mercado Pago ── */
.btn-mercado-pago {
  background: #009ee3 !important;
  color: white !important;
  border-radius: 14px;
  height: 60px;
  box-shadow: 0 4px 12px rgba(0, 158, 227, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.btn-mercado-pago:hover {
  background: #008cc9 !important;
  transform: scale(1.02) translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 158, 227, 0.5);
  filter: brightness(1.05);
}

.btn-mercado-pago:active {
  transform: scale(0.97) translateY(2px);
  box-shadow: 0 2px 8px rgba(0, 158, 227, 0.2);
}
</style>
