<template>
  <q-layout view="hHh lpR fFf">

    <!-- ══════════ NAVBAR ══════════ -->
    <q-header class="nav-bar">
      <div class="nav-inner">
        <div class="nav-logo">
          <span class="mi nav-logo-icon">auto_awesome</span>
          <span class="nav-logo-text">Numera<span>AI</span></span>
        </div>
        <nav class="nav-links gt-sm">
          
          <a href="#" class="nav-link active">Membresía</a>
        </nav>
        <div class="nav-avatar">JD</div>
      </div>
    </q-header>

    <!-- ══════════ PAGE ══════════ -->
    <q-page-container>
      <q-page class="main-page">

        <div class="bg-glow-tr" />
        <div class="bg-glow-bl" />

        <div class="page-content">

          <!-- ── Page heading ── -->
          <div class="page-heading">
            <h1 class="page-title">Elige tu destino numerológico</h1>
            <p class="page-sub">
              Desbloquea el poder de las lecturas generadas por IA y descubre lo que los números
              tienen preparado para ti. Planes flexibles, cancelación en cualquier momento.
            </p>

            <!-- Billing toggle -->
            <div class="billing-toggle">
              <span class="toggle-label" :class="{active: !annualBilling}">Mensual</span>
              <div class="toggle-wrap" @click="annualBilling = !annualBilling">
                <div class="toggle-track" :class="{on: annualBilling}">
                  <div class="toggle-thumb" />
                </div>
              </div>
              <span class="toggle-label" :class="{active: annualBilling}" style="display:flex;align-items:center;gap:8px">
                Anual
                <span class="annual-badge">-20% Dto</span>
              </span>
            </div>
          </div>

          <!-- ── Main grid ── -->
          <div class="content-grid">

            <!-- Left: Plans -->
            <div class="plans-col">

              <!-- Premium plan -->
              <div class="premium-card-wrap">
                <div class="premium-glow" />
                <div class="premium-card">
                  <div class="recommended-badge">Recomendado</div>
                  <div class="plan-top">
                    <div>
                      <div class="plan-name">
                        Plan Premium
                        <span class="mi plan-verified">verified</span>
                      </div>
                      <p class="plan-desc">Acceso total a nuestra IA y reportes profundos.</p>
                    </div>
                    <div class="plan-price">
                      <div class="plan-price-main">$49<span>/mes</span></div>
                      <div class="plan-price-sub">Facturado $588 anualmente</div>
                    </div>
                  </div>
                  <div class="features-grid">
                    <div v-for="f in premiumFeatures" :key="f" class="feature-item">
                      <div class="feature-check"><span class="mi check-icon">check</span></div>
                      {{ f }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Monthly plan -->
              <div class="monthly-card">
                <div class="plan-top">
                  <div>
                    <div class="plan-name monthly">Plan Mensual</div>
                    <p class="plan-desc">Ideal para empezar tu viaje numerológico.</p>
                  </div>
                  <div class="plan-price">
                    <div class="plan-price-main monthly-price">$29<span class="monthly-denom">/mes</span></div>
                  </div>
                </div>
                <div class="monthly-features">
                  <div class="monthly-feature"><span class="mi monthly-check">check</span>Lecturas básicas</div>
                  <div class="monthly-feature"><span class="mi monthly-check">check</span>Actualizaciones semanales</div>
                </div>
              </div>

              <!-- Testimonial -->
              <div class="testimonial">
                <span class="testimonial-quote">"</span>
                <div>
                  <p class="testimonial-text">
                    La precisión de NumeraAI es escalofriante. El plan Premium me ayudó a entender
                    mis ciclos anuales y tomar mejores decisiones en mi negocio. ¡Totalmente recomendado!
                  </p>
                  <div class="testimonial-author">
                    <div class="testimonial-avatar">
                      <img :src="testimonialAvatar" alt=""/>
                    </div>
                    <span class="testimonial-name">Maria G.</span>
                    <div class="testimonial-stars">
                      <span v-for="i in 5" :key="i" class="mi star-icon">star</span>
                    </div>
                  </div>
                </div>
              </div>

            </div><!-- /plans-col -->

            <!-- Right: Payment form -->
            <div>
              <div class="payment-card">

                <div class="payment-header">
                  <p class="payment-header-title">Detalles de Pago</p>
                  <div class="pay-tabs">
                    <button
                      class="pay-tab"
                      :class="activePayTab==='card' ? 'active' : 'inactive'"
                      @click="activePayTab='card'"
                      type="button"
                    >
                      <span class="mi pay-tab-icon">credit_card</span> Tarjeta
                    </button>
                    <button
                      class="pay-tab"
                      :class="activePayTab==='transfer' ? 'active' : 'inactive'"
                      @click="activePayTab='transfer'"
                      type="button"
                    >
                      <span class="mi pay-tab-icon">account_balance</span> Transferencia
                    </button>
                  </div>
                </div>

                <div class="payment-body">

                  <!-- Card form -->
                  <template v-if="activePayTab==='card'">
                    <div class="form-fields">

                      <div>
                        <label class="field-label">Titular de la tarjeta</label>
                        <div class="input-wrap">
                          <span class="mi input-icon">person</span>
                          <input v-model="cardHolder" class="pay-input" type="text" placeholder="Como aparece en la tarjeta"/>
                        </div>
                      </div>

                      <div>
                        <label class="field-label">Número de tarjeta</label>
                        <div class="input-wrap">
                          <span class="mi input-icon">payment</span>
                          <input v-model="cardNumber" class="pay-input" type="text" placeholder="0000 0000 0000 0000" style="padding-right:72px"/>
                          <div class="card-logos">
                            <img class="card-logo" :src="visaLogo" alt="visa"/>
                            <img class="card-logo mc" :src="mcLogo" alt="mc"/>
                          </div>
                        </div>
                      </div>

                      <div class="input-row">
                        <div>
                          <label class="field-label">Expiración</label>
                          <div class="input-wrap">
                            <span class="mi input-icon">calendar_today</span>
                            <input v-model="cardExp" class="pay-input" type="text" placeholder="MM/AA"/>
                          </div>
                        </div>
                        <div>
                          <label class="field-label">CVC</label>
                          <div class="input-wrap">
                            <span class="mi input-icon">lock</span>
                            <input v-model="cardCvc" class="pay-input" type="text" placeholder="123"/>
                          </div>
                        </div>
                      </div>

                    </div>
                  </template>

                  <!-- Transfer placeholder -->
                  <template v-else>
                    <div class="transfer-placeholder">
                      <span class="mi transfer-icon">account_balance</span>
                      Datos de transferencia bancaria disponibles al confirmar el plan.
                    </div>
                  </template>

                  <!-- Summary -->
                  <div class="summary">
                    <div class="summary-row"><span>Subtotal (Anual)</span><span>$588.00</span></div>
                    <div class="summary-row green"><span>Descuento (20%)</span><span>-$117.60</span></div>
                    <div class="summary-row"><span>Impuestos</span><span>$0.00</span></div>
                    <div class="summary-row total"><span>Total a pagar</span><span>$470.40</span></div>
                  </div>

                  <button class="pay-btn" type="button">
                    <span class="mi pay-lock-icon">lock_outline</span>
                    Pagar Ahora $470.40
                  </button>

                  <div class="ssl-note">
                    <span class="mi ssl-icon">security</span>
                    Pagos encriptados con SSL de 256 bits
                  </div>

                </div>
              </div>
            </div>

          </div><!-- /content-grid -->

          <!-- Trust footer -->
          <div class="trust-footer">
            <div class="trust-logos">
              <img class="trust-logo" :src="stripeLogo" alt="stripe"/>
              <img class="trust-logo" :src="paypalLogo" alt="paypal"/>
            </div>
            <div class="trust-links">
              <a href="#" class="trust-link">Términos de servicio</a>
              <a href="#" class="trust-link">Política de privacidad</a>
              <a href="#" class="trust-link">Ayuda</a>
            </div>
          </div>

        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const annualBilling = ref(true)
const activePayTab  = ref('card')
const cardHolder    = ref('')
const cardNumber    = ref('')
const cardExp       = ref('')
const cardCvc       = ref('')

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

/* ── Layout ── */
:deep(.nav-bar) {
  background: rgba(34,30,16,0.8) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(242,185,13,0.1) !important;
  box-shadow: none !important;
  height: 64px;
}
.nav-inner {
  max-width: 1280px; margin: 0 auto; padding: 0 32px;
  height: 64px; display: flex; align-items: center; justify-content: space-between;
}
.nav-logo { display: flex; align-items: center; gap: 12px; }
.nav-logo-icon { font-size: 28px !important; color: #f2b90d; }
.nav-logo-text { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #fff; }
.nav-logo-text span { color: #f2b90d; }
.nav-links { display: flex; align-items: center; gap: 8px; }
.nav-link { color: #9ca3af; text-decoration: none; padding: 8px 12px; border-radius: 6px; font-size: 14px; font-weight: 500; transition: color .2s; }
.nav-link:hover { color: #f2b90d; }
.nav-link.active { color: #f2b90d; font-weight: 700; }
.nav-avatar { width: 32px; height: 32px; border-radius: 50%; background: rgba(242,185,13,0.2); border: 1px solid rgba(242,185,13,0.3); display: flex; align-items: center; justify-content: center; color: #f2b90d; font-size: 13px; font-weight: 700; }

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
</style>