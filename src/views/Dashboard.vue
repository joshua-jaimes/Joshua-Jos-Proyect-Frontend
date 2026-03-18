<template>
  <q-page class="q-pa-md main-content bg-dashboard">
    <div style="position:relative; width:100%; height:100%;">
      <!-- Background Glow -->
      <div class="bg-glow"></div>

      <!-- Header -->
      <header class="top-header">
        <h1 class="header-title hide-lt-md">Panel Principal</h1>
        <div class="logo-mobile hide-gt-sm">
          <q-icon name="auto_awesome" size="md" class="text-primary" />
          <span class="font-bold">NumAI</span>
        </div>

        <div class="header-right">
        </div>
      </header>

      <!-- Scrollable Content -->
      <div class="content-scroll">
        <!-- Welcome Section -->
        <section class="welcome-section">
          <div class="welcome-content">
            <div>
             <h2 class="welcome-title">Hola Bienvenido {{ nombreUsuario }}</h2>
              <!-- Frase mística aleatoria -->
              <p class="welcome-subtitle">{{ fraseMistica }}</p>
            </div>
            <div class="life-number hide-lt-md">
              <span class="life-label">Número de Vida</span>
              <!-- Número calculado desde la fecha de nacimiento -->
              <div class="gold-text">{{ numeroDeVida }}</div>
            </div>
          </div>
        </section>

        <!-- Main Grid -->
        <div class="main-grid">
          <!-- Left Column -->
          <div class="grid-left">
            <!-- Estadísticas rápidas -->
            <div class="stats-grid" style="margin-bottom:1rem">
              <div class="stat-card">
                <q-icon name="auto_awesome" size="md" class="text-primary" />
                <div>
                  <div class="stat-value">{{ totalLecturas }}</div>
                  <div class="stat-label">Lecturas realizadas</div>
                </div>
              </div>
              <div class="stat-card">
                <q-icon name="today" size="md" class="text-gold" />
                <div>
                  <div class="stat-value">{{ lecturasHoyCount }}</div>
                  <div class="stat-label">Lecturas hoy</div>
                </div>
              </div>
              <div class="stat-card">
                <q-icon name="fingerprint" size="md" class="text-primary" />
                <div>
                  <div class="stat-value">{{ numeroDeVida }}</div>
                  <div class="stat-label">Tu Número de Vida</div>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="quick-actions">
              <!-- Generate Reading Card -->
              <div class="action-card primary-card" @click="irALecturaDiaria" :style="generandoLectura ? 'opacity:.8;pointer-events:none' : ''">
                <div class="card-glow"></div>
                <div class="card-content">
                  <div class="card-icon-box">
                    <q-spinner v-if="generandoLectura" size="3em" color="primary" />
                    <q-icon v-else name="add" size="md" />
                  </div>
                  <h3 class="card-title">Generar Lectura Diaria</h3>
                  <p class="card-desc">Crea un nuevo reporte numerológico completo con IA.</p>
                  <div class="card-action">
                    <span>{{ generandoLectura ? 'Cargando...' : 'Empezar ahora' }}</span>
                    <q-icon v-if="!generandoLectura" name="arrow_forward" size="sm" />
                  </div>
                </div>
              </div>

              <!-- Ask AI Card -->
              <div class="action-card light-card" @click="irALecturaPrincipal" :style="cargandoPrincipal ? 'opacity:.8;pointer-events:none' : ''">
                <div class="card-glow-light"></div>
                <div class="card-content">
                  <div class="card-icon-box-light">
                    <q-spinner v-if="cargandoPrincipal" size="3em" color="primary" />
                    <q-icon v-else name="chat" size="md" />
                  </div>
                  <h3 class="card-title-dark">Generar Lectura principal</h3>
                  <p class="card-desc-dark">Haz una pregunta específica sobre tu destino o carrera.</p>
                  <div class="card-action-primary">
                    <span>{{ cargandoPrincipal ? 'Cargando...' : 'Consultar' }}</span>
                    <q-icon v-if="!cargandoPrincipal" name="arrow_forward" size="sm" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column -->
          <div class="grid-right">
            <!-- Membership Widget -->
            <div class="membership-card">
              <div class="membership-glow"></div>
              <div class="membership-content">
                <div class="membership-header">
                  <div>
                    <p class="membership-label">Estado de Membresía</p>
                    <p class="membership-name">{{ rolLabel }}</p>
                  </div>
                  <q-icon name="verified" size="lg" class="text-gold" />
                </div>




                <button class="upgrade-btn" @click="irAMembresias" :disabled="loadingMembresia">
                  <q-spinner v-if="loadingMembresia" size="3em" color="primary" class="q-mr-xs" />
                  <q-icon v-else name="upgrade" size="sm" />
                  <span>{{ loadingMembresia ? 'Cargando...' : 'Mejorar Plan' }}</span>
                </button>

                
              </div>
            </div>

            <!-- Daily Insight -->
            <div class="insight-card">
              <div class="insight-header">
                <div class="insight-icon-box">
                  <q-icon name="light_mode" size="sm" class="text-primary" />
                </div>
                <h3 class="insight-title">Mensaje del Día</h3>
              </div>

              <div class="insight-image">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmzxKVwFmh3odbHG9n7xxxSgS1MbxMDyJIl1tSTcAroY4pJ_qoDAUp79qwbr7N-EWyJhx0l19g_S_4OgQlx8bSv46Vqmq5muxC0r4RiINmoVW1gjHXNmd48A4dXhsRqcbi-EjeOOzPlTl-QVX4_0poU_-g0JaAiPGLHTTuQaUGRrIccc1T2UBVQ3raPRV35AmT2tM_O935MNFXZqII0cuV2Rpd0xtixxZKGTjmRmg2S05aJSt2ccC38RokfEZG7gmjlhf1LeGp3Jk" alt="starry night" class="insight-img" />
                <div class="insight-overlay">
                  <p class="insight-quote">"{{ fraseMistica }}"</p>
                </div>
              </div>

              <div class="insight-details">
              </div>
            </div>

          </div>
        </div>






        <!-- Footer -->
        <footer class="dashboard-footer">
          <p>© 2026 Numerología AI. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useAuthStore } from "../stores/Auth.js"
import { computed, ref, onMounted } from "vue"
import { getData, postData } from "../services/apiCliente"
import { useNotify } from "../composables/useNotify"

const auth = useAuthStore()
const nombreUsuario = computed(() => auth.usuario?.nombre || "")
const rolLabel = computed(() => {
  const rol = auth.usuario?.rol
  if (rol === 'admin' || rol === 'administrador') return 'Administrador'
  if (auth.usuario?.estado === 1) return 'Místico Pro'
  return 'Plan Gratuito'
})
const { notifySuccess, notifyWarning, notifyError } = useNotify()

import { useRouter } from 'vue-router'
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push({ name: 'loginUsuario' })
}

// ══ Número de Vida (calculado desde fechanacimiento) ══
const calcularNumeroDeVida = (fecha) => {
  if (!fecha) return '?'
  const digits = new Date(fecha).toLocaleDateString('en-CA').replace(/-/g, '')
  let sum = digits.split('').reduce((a, b) => a + parseInt(b), 0)
  // Reducir hasta 1-9 o 11, 22, 33 (números maestros)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').reduce((a, b) => a + parseInt(b), 0)
  }
  return sum
}
const numeroDeVida = computed(() => calcularNumeroDeVida(auth.usuario?.fechanacimiento))

// ══ Lookup: color, planeta y elemento por número de vida ══
const numLookup = {
  1:  { color:'Rojo',    colorHex:'#ef4444', planeta:'Sol',     elemento:'Fuego',  tag:'Lder' },
  2:  { color:'Naranja', colorHex:'#f97316', planeta:'Luna',    elemento:'Agua',   tag:'Diplomtico' },
  3:  { color:'Amarillo',colorHex:'#eab308', planeta:'Júpiter', elemento:'Aire',   tag:'Creativo' },
  4:  { color:'Verde',   colorHex:'#22c55e', planeta:'Saturno', elemento:'Tierra', tag:'Constructor' },
  5:  { color:'Azul',    colorHex:'#3b82f6', planeta:'Mercurio',elemento:'Aire',   tag:'Explorador' },
  6:  { color:'Índigo',  colorHex:'#6366f1', planeta:'Venus',   elemento:'Tierra', tag:'Armonioso' },
  7:  { color:'Violeta', colorHex:'#7c3aed', planeta:'Neptuno', elemento:'Agua',   tag:'Mstico' },
  8:  { color:'Rosa',    colorHex:'#ec4899', planeta:'Saturno', elemento:'Tierra', tag:'Ejecutivo' },
  9:  { color:'Dorado',  colorHex:'#D4AF37', planeta:'Marte',   elemento:'Fuego',  tag:'Humanista' },
  11: { color:'Plateado',colorHex:'#94a3b8', planeta:'Luna',    elemento:'Agua',   tag:'Número Maestro' },
  22: { color:'Azul Real',colorHex:'#1d4ed8',planeta:'Urano',   elemento:'Aire',   tag:'Número Maestro' },
  33: { color:'Dorado',  colorHex:'#D4AF37', planeta:'Venus',   elemento:'Fuego',  tag:'Número Maestro' },
}
const numInfo = computed(() => numLookup[numeroDeVida.value] || { color:'Misterioso', colorHex:'#7311d4', planeta:'Desconocido', elemento:'-', tag:'' })

// ══ 25 Frases motivacionales ══
const frases = [
  'Confía en tu intuición hoy.',
  'Hoy es un buen día para avanzar.',
  'El universo siempre tiene un plan.',
  'Escucha tu voz interior.',
  'Tu energía atrae lo que necesitas.',
  'La claridad llega cuando confías.',
  'Hoy puede ser un día de transformación.',
  'Mantén tu mente abierta a nuevas señales.',
  'Cada día trae nuevas oportunidades.',
  'Tu camino se revela paso a paso.',
  'La energía que das regresa a ti.',
  'Hoy es un día para crecer.',
  'Tu intuición es tu mejor guía.',
  'La calma trae respuestas.',
  'Todo ocurre en el momento perfecto.',
  'Sigue las señales del universo.',
  'Confía en tu proceso.',
  'La energía fluye hacia donde pones atención.',
  'Hoy puede comenzar algo nuevo.',
  'Tu potencial es infinito.',
  'El universo trabaja a tu favor.',
  'Cada experiencia trae aprendizaje.',
  'Hoy es un día para conectar contigo.',
  'Las respuestas llegan cuando estás listo.',
  'Confía en el viaje de tu vida.',
]
const fraseMistica = frases[Math.floor(Math.random() * frases.length)]

// ══ Lecturas del usuario ══
const misLecturas = ref([])
const cargandoLecturas = ref(false)
const generandoLectura = ref(false)
const copiado = ref(false)

const totalLecturas = computed(() => misLecturas.value.length)
const lecturasHoyCount = computed(() => {
  const hoy = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' })
  return misLecturas.value.filter(l => l.dia === hoy).length
})
const ultimaLectura = computed(() => misLecturas.value[0] || null)

const copiarLectura = async () => {
  if (!ultimaLectura.value?.contenido) return
  await navigator.clipboard.writeText(ultimaLectura.value.contenido)
  copiado.value = true
  notifySuccess('Lectura copiada al portapapeles.', 'content_copy')
  setTimeout(() => { copiado.value = false }, 2000)
}

const cargarMisLecturas = async () => {
  if (!auth.usuario?._id) return
  try {
    cargandoLecturas.value = true
    const data = await getData(`/lecturas/${auth.usuario._id}`)
    misLecturas.value = data.lecturas || []
  } catch (e) {
    console.error('Error cargando lecturas:', e.message)
  } finally {
    cargandoLecturas.value = false
  }
}

// ══ Predicción Semanal (reutiliza endpoint existente con tipo='semanal') ══
const prediccionSemanal = ref(null)
const cargandoSemanal = ref(false)
const errorSemanal = ref('')

const generarPrediccionSemanal = async () => {
  if (!auth.usuario?._id) return
  cargandoSemanal.value = true
  errorSemanal.value = ''
  try {
    const data = await postData('/lecturas', {
      usuario_id: auth.usuario._id,
      tipo: 'semanal'
    })
    prediccionSemanal.value = data.lectura?.contenido || data.contenido || null
  } catch (e) {
    // Si el backend devuelve la lectura ya existente, intentar recuperarla
    const msg = e.response?.data?.msg || ''
    if (msg.toLowerCase().includes('ya')) {
      // Buscar entre las lecturas del usuario
      const existente = misLecturas.value.find(l => l.tipo === 'semanal')
      if (existente) {
        prediccionSemanal.value = existente.contenido
      } else {
        errorSemanal.value = msg
      }
    } else {
      errorSemanal.value = e.response?.data?.msg || 'Error al generar predicción'
    }
  } finally {
    cargandoSemanal.value = false
  }
}

// ══ Compatibilidad Numerológica (cálculo puro de frontend) ══
const compatFecha1 = ref('')
const compatFecha2 = ref('')
const resultadoCompat = ref(null)

const mensajesCompat = {
  alta:   'Su vibración es armónica. El universo sonríe cuando están juntos.',
  media:  'Tienen energías complementarias con oportunidades de crecer juntos.',
  baja:   'Sus números se desafían mutuamente, pero el aprendizaje es profundo.',
}

const calcularCompatibilidad = () => {
  if (!compatFecha1.value || !compatFecha2.value) return
  const num1 = calcularNumeroDeVida(compatFecha1.value)
  const num2 = calcularNumeroDeVida(compatFecha2.value)
  // Suma de ambos números, reducida de nuevo
  let vibra = Number(num1) + Number(num2)
  while (vibra > 9 && vibra !== 11 && vibra !== 22 && vibra !== 33) {
    vibra = String(vibra).split('').reduce((a, b) => a + parseInt(b), 0)
  }
  // Determinar nivel de compatibilidad
  const pares_alta   = [[1,9],[2,8],[3,6],[4,8],[5,5],[7,2]]   // parejas armónicas
  const esAlta  = pares_alta.some(([a,b])  => (a===num1&&b===num2)||(a===num2&&b===num1))
  const nivel = esAlta ? 'alta' : (vibra <= 5 ? 'media' : 'baja')
  resultadoCompat.value = { num1, num2, vibra, mensaje: mensajesCompat[nivel] }
}

onMounted(() => {
  cargarMisLecturas()
})

// ══ Navegación con acceso por estado (existente, sin cambios) ══
const irALecturaDiaria = () => {
  if (auth.usuario?.estado !== 1) {
    notifyWarning('Esta función es exclusiva de Místico Pro.', 'workspace_premium')
    return
  }
  generandoLectura.value = true
  router.push({ name: 'LecturaDiaria' })
}

const irALecturaPrincipal = () => {
  if (auth.usuario?.estado === 1) {
    notifyWarning('Ya tienes acceso a lecturas diarias con Místico Pro.', 'info')
    return
  }
  cargandoPrincipal.value = true
  router.push({ name: 'GeneradorNumeroPrincipal' })
}

// ══ Refs de carga adicionales ══
const cargandoPrincipal = ref(false)
const loadingMembresia = ref(false)

const irAMembresias = () => {
  loadingMembresia.value = true
  router.push({ name: 'MembresiasYPagos' })
}

console.log("USUARIO DEL STORE:", auth.usuario)
</script>



<style scoped lang="scss">
$primary: #7311d4;
$primary-light: #9c4ddb;
$gold: #D4AF37;
$gold-light: #F3E5AB;
$bg: #191022;
$surface: #231630;
$surface-darker: #140c1c;
$gray-800: #1f2937;
$gray-700: #374151;
$gray-400: #9ca3af;
$gray-300: #d1d5db;
$gray-200: #e5e7eb;
$gray-100: #f3f4f6;

* { box-sizing: border-box; }

.bg-dashboard {
  background: $bg;
  color: $gray-300;
  min-height: 100vh;
}

// MAIN CONTENT
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;

  .bg-glow {
    position: absolute;
    top: 0;
    right: 0;
    width: 31.25rem;
    height: 31.25rem;
    background: rgba($primary, 0.2);
    border-radius: 50%;
    filter: blur(120px);
    transform: translateY(-50%) translateX(50%);
    pointer-events: none;
    z-index: 0;
  }
}

// HEADER
.top-header {
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
  z-index: 10;
  position: sticky;
  top: 0;

  @media (prefers-color-scheme: dark) {
    border-bottom-color: #1f2937;
    background: rgba($surface-darker, 0.5);
  }

  .header-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  .logo-mobile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    color: #111;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .notif-btn {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;

    &:hover {
      color: $primary;
    }

    .notif-badge {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 0.5rem;
      height: 0.5rem;
      background: #ef4444;
      border-radius: 50%;
      border: 2px solid white;

      @media (prefers-color-scheme: dark) {
        border-color: $surface-darker;
      }
    }
  }

  .header-divider {
    width: 1px;
    height: 2rem;
    background: #e5e7eb;

    @media (prefers-color-scheme: dark) {
      background: #374151;
    }
  }

  .credits-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: $gold;
    background: rgba($gold, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    border: 1px solid rgba($gold, 0.2);
  }
}

// CONTENT SCROLL
.content-scroll {
  flex: 1;
  padding: 1rem 2rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba($primary, 0.3);
    border-radius: 4px;

    &:hover {
      background: rgba($primary, 0.5);
    }
  }
}

// WELCOME SECTION
.welcome-section {
  margin-bottom: 2rem;

  .welcome-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .welcome-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: #111;
    margin-bottom: 0.25rem;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  .welcome-subtitle {
    color: #6b7280;

    @media (prefers-color-scheme: dark) {
      color: #9ca3af;
    }
  }

  .life-number {
    text-align: right;

    .life-label {
      font-size: 0.875rem;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }

    .gold-text {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(to right, $gold, $gold-light, $gold);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 8px rgba($gold, 0.3));
    }
  }
}

// MAIN GRID
.main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.grid-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grid-right {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

// QUICK ACTIONS
.quick-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  .action-card {
    border-radius: 1.5rem;
    padding: 1.5rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;

    &.primary-card {
      background: linear-gradient(135deg, $primary 0%, #500a96 100%);
      color: white;
      box-shadow: 0 10px 30px rgba($primary, 0.2);

      &:hover {
        box-shadow: 0 10px 40px rgba($primary, 0.4);
      }

      .card-glow {
        position: absolute;
        top: 0;
        right: 0;
        width: 15rem;
        height: 15rem;
        background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text x="0" y="20" font-size="150" fill="white" opacity="0.1">✨</text></svg>');
        background-size: contain;
        opacity: 0.1;
      }
    }

    &.light-card {
      background: white;
      border: 1px solid #e5e7eb;
      transition: all 0.2s;

      @media (prefers-color-scheme: dark) {
        background: $surface;
        border-color: #374151;
      }

      &:hover {
        border-color: rgba($primary, 0.5);

        @media (prefers-color-scheme: dark) {
          border-color: rgba($primary, 0.5);
        }
      }

      .card-glow-light {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.05;
      }
    }
  }

  .card-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  .card-icon-box {
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    color: white;
  }

  .card-icon-box-light {
    width: 2.5rem;
    height: 2.5rem;
    background: rgba($primary, 0.1);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    color: $primary;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .card-title-dark {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: #111;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  .card-desc {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  .card-desc-dark {
    font-size: 0.875rem;
    color: #6b7280;

    @media (prefers-color-scheme: dark) {
      color: #9ca3af;
    }
  }

  .card-action {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(0.25rem);
    }
  }

  .card-action-primary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    color: $primary;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(0.25rem);
    }
  }
}

// HISTORY CARD
.history-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1.5rem;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background: $surface;
    border-color: rgba(#374151, 0.5);
  }

  .history-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (prefers-color-scheme: dark) {
      border-bottom-color: rgba(#374151, 0.5);
    }

    .history-title {
      font-weight: 700;
      font-size: 1.125rem;
      color: #111;

      @media (prefers-color-scheme: dark) {
        color: white;
      }
    }

    .view-all {
      font-size: 0.875rem;
      color: $primary;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        color: $primary-light;
      }
    }
  }

  .history-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid #e5e7eb;

    @media (prefers-color-scheme: dark) {
      border-top-color: rgba(#374151, 0.5);
    }

    .history-item {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      border-bottom: 1px solid #e5e7eb;
      transition: background 0.2s;

      @media (prefers-color-scheme: dark) {
        border-bottom-color: rgba(#374151, 0.5);

        &:hover {
          background: rgba(255, 255, 255, 0.05);
        }
      }

      &:hover {
        background: #f9fafb;
      }

      .item-icon {
        width: 2.5rem;
        height: 2.5rem;
        background: rgba($primary, 0.1);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $primary;
        flex-shrink: 0;
      }

      .item-content {
        flex: 1;
        min-width: 0;

        .item-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          @media (prefers-color-scheme: dark) {
            color: white;
          }
        }

        .item-date {
          font-size: 0.75rem;
          color: #6b7280;

          @media (prefers-color-scheme: dark) {
            color: #9ca3af;
          }
        }
      }

      .item-status {
        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.375rem 0.625rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;

          &.completed {
            background: rgba(34, 197, 94, 0.1);
            color: #16a34a;

            @media (prefers-color-scheme: dark) {
              background: rgba(34, 197, 94, 0.1);
              color: #86efac;
            }
          }

          &.draft {
            background: rgba(234, 179, 8, 0.1);
            color: #a16207;

            @media (prefers-color-scheme: dark) {
              background: rgba(234, 179, 8, 0.1);
              color: #facc15;
            }
          }
        }
      }

      .item-action {
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        transition: color 0.2s;

        &:hover {
          color: $primary;
        }
      }
    }
  }
}

// MEMBERSHIP CARD
.membership-card {
  background: linear-gradient(to bottom, $surface, $surface-darker);
  border: 1px solid rgba($gold, 0.3);
  border-radius: 1.5rem;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

  .membership-glow {
    position: absolute;
    top: -2.5rem;
    right: -2.5rem;
    width: 8rem;
    height: 8rem;
    background: rgba($gold, 0.1);
    border-radius: 50%;
    filter: blur(2rem);
  }

  .membership-content {
    position: relative;
    z-index: 1;
  }

  .membership-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    .membership-label {
      font-size: 0.875rem;
      color: #9ca3af;
      font-weight: 500;
    }

    .membership-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
      margin-top: 0.25rem;
    }
  }

  .credits-progress {
    margin-bottom: 1.5rem;

    .progress-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: #9ca3af;
      margin-bottom: 0.75rem;

      .progress-value {
        color: white;
        font-weight: 500;
      }
    }

    .progress-bar {
      width: 100%;
      height: 0.5rem;
      background: #374151;
      border-radius: 9999px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: linear-gradient(to right, $primary, $primary-light);
        border-radius: 9999px;
      }
    }
  }

  .upgrade-btn {
    width: 100%;
    padding: 0.625rem 1rem;
    background: $gold;
    color: $surface-darker;
    border: none;
    border-radius: 0.5rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s;

    &:hover {
      background: $gold-light;
    }
  }

  .renew-date {
    font-size: 0.75rem;
    text-align: center;
    color: #6b7280;
    margin-top: 0.75rem;
  }
}

// INSIGHT CARD
.insight-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1.5rem;
  padding: 1.5rem;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
    background: $surface;
    border-color: rgba(#374151, 0.5);
  }

  .insight-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;

    .insight-icon-box {
      width: 2rem;
      height: 2rem;
      background: rgba($primary, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .insight-title {
      font-weight: 700;
      color: #111;

      @media (prefers-color-scheme: dark) {
        color: white;
      }
    }
  }

  .insight-image {
    position: relative;
    width: 100%;
    aspect-ratio: 16/10;
    border-radius: 0.75rem;
    overflow: hidden;
    margin-bottom: 1rem;
   

    .insight-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s;

      &:hover {
        transform: scale(1.1);
      }
    }

    .insight-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
      padding: 1rem;
      display: flex;
      align-items: flex-end;

      .insight-quote {
        color: white;
        font-style: italic;
        font-size: 0.875rem;
        font-weight: 500;
      }
    }
  }

  .insight-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .insight-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: #f9fafb;

      @media (prefers-color-scheme: dark) {
        background: rgba(255, 255, 255, 0.05);
      }

      .insight-label {
        font-size: 0.875rem;
        color: #6b7280;

        @media (prefers-color-scheme: dark) {
          color: #9ca3af;
        }
      }

      .insight-value {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #111;

        @media (prefers-color-scheme: dark) {
          color: white;
        }

        .color-dot {
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;

          &.indigo {
            background: #6366f1;
          }
        }
      }
    }
  }
}

// CYCLES CARD
.cycles-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1.5rem;
  padding: 1.5rem;

  @media (prefers-color-scheme: dark) {
    background: $surface;
    border-color: rgba(#374151, 0.5);
  }

  .cycles-title {
    font-weight: 700;
    color: #111;
    margin-bottom: 1rem;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  .cycles-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .cycle-item {
      display: flex;
      gap: 0.75rem;

      .cycle-date {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 3rem;
        text-align: center;

        .cycle-month {
          font-size: 0.75rem;
          font-weight: 700;
          color: #9ca3af;
          text-transform: uppercase;
        }

        .cycle-day {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111;

          @media (prefers-color-scheme: dark) {
            color: white;
          }
        }
      }

      .cycle-content {
        border-left: 2px solid #e5e7eb;
        padding-left: 0.75rem;

        @media (prefers-color-scheme: dark) {
          border-left-color: rgba(#374151, 0.5);
        }

        .cycle-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111;
          margin: 0;

          @media (prefers-color-scheme: dark) {
            color: white;
          }
        }

        .cycle-desc {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;

          @media (prefers-color-scheme: dark) {
            color: #9ca3af;
          }
        }
      }

      &.active {
        .cycle-date {
          .cycle-month {
            color: $primary;
          }

          .cycle-day {
            color: $primary;
          }
        }

        .cycle-content {
          border-left-color: $primary;
        }
      }
    }
  }
}

// FOOTER
.dashboard-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 0.75rem;
  color: #9ca3af;

  @media (prefers-color-scheme: dark) {
    border-top-color: #1f2937;
  }

  p {
    margin: 0;
  }
}

// UTILITY CLASSES
.hide-lt-md {
  @media (max-width: 768px) {
    display: none;
  }
}

.hide-lt-sm {
  @media (max-width: 640px) {
    display: none;
  }
}

.hide-gt-sm {
  @media (min-width: 640px) {
    display: none;
  }
}

.text-primary {
  color: $primary;
}

.text-gold {
  color: $gold;
}

.font-bold {
  font-weight: 700;
}

// ══ STATS SECTION ══
.stats-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 0 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 640px) { grid-template-columns: 1fr; }
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  padding: 1.25rem;

  @media (prefers-color-scheme: dark) {
    background: $surface;
    border-color: rgba(#374151, 0.5);
  }

  .stat-value {
    font-size: 1.75rem;
    font-weight: 800;
    color: $primary;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 2px;

    @media (prefers-color-scheme: dark) { color: #9ca3af; }
  }
}

// ══ ÚLTIMA LECTURA ══
.ultima-lectura-card {
  background: white;
  border: 1px solid rgba($primary, 0.2);
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 24px rgba($primary, 0.07);

  @media (prefers-color-scheme: dark) {
    background: $surface;
    border-color: rgba($primary, 0.3);
  }
}

.ul-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.ul-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #111;
  margin: 0;

  @media (prefers-color-scheme: dark) { color: white; }
}

.ul-tipo {
  font-size: 0.7rem;
  font-weight: 600;
  background: rgba($primary, 0.12);
  color: $primary;
  padding: 2px 10px;
  border-radius: 999px;
  text-transform: uppercase;
}

.ul-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ul-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 6px 14px;
  border: 1px solid rgba($primary, 0.4);
  border-radius: 8px;
  background: rgba($primary, 0.07);
  color: $primary;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { background: rgba($primary, 0.18); }
}

.ul-contenido {
  font-size: 0.875rem;
  line-height: 1.7;
  color: #374151;
  white-space: pre-line;

  @media (prefers-color-scheme: dark) { color: #d1d5db; }
}

// ══ LOADER ANIMADO ══
.ul-loading, .ul-loading-alone {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 1rem 0;
}

.ul-loading-text {
  font-size: 0.875rem;
  color: $primary;
  font-style: italic;
  animation: pulse-text 1.5s ease-in-out infinite;
}

.ul-loading-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: $primary;
  animation: bounce-dot 1.4s ease-in-out infinite;

  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.4s; }
}

@keyframes bounce-dot {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1.2); opacity: 1; }
}

@keyframes pulse-text {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

// ══ EXTRA SECTION (nuevas secciones numerológicas) ══
.extra-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 0 1rem;
}

// Número Principal + Color/Planeta
.num-principal-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, rgba($primary, 0.15), rgba($gold, 0.07));
  border: 1px solid rgba($primary, 0.3);
  border-radius: 1.5rem;
  padding: 1.75rem 2rem;

  @media (max-width: 640px) { flex-direction: column; align-items: flex-start; }
}
.npc-left { text-align: center; min-width: 100px; }
.npc-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.npc-value { font-size: 3.5rem; font-weight: 900; color: $gold; line-height: 1; }
.npc-tag { font-size: 0.75rem; color: $primary; font-weight: 700; margin-top: 4px; }
.npc-right { flex: 1; display: flex; flex-direction: column; gap: 0.75rem; }
.npc-attr { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.npc-attr-label { font-size: 0.8rem; color: #64748b; font-weight: 600; }
.npc-attr-val { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 700; color: #e2e8f0; }
.color-swatch { width: 14px; height: 14px; border-radius: 50%; display: inline-block; flex-shrink: 0; }

// Predicción Semanal
.pred-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1.5rem;
  padding: 1.5rem;
  @media (prefers-color-scheme: dark) { background: $surface; border-color: rgba(#374151, 0.5); }
}
.pred-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.pred-title { font-size: 1rem; font-weight: 700; color: #111; margin: 0;
  @media (prefers-color-scheme: dark) { color: white; }
}
.pred-sub { font-size: 0.8rem; color: #6b7280; margin: 2px 0 0; }
.pred-btn {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 8px 18px; border: none; border-radius: 10px;
  background: rgba($primary, 0.12); color: $primary;
  font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.2s; white-space: nowrap;
  &:hover:not(:disabled) { background: rgba($primary, 0.22); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}
.pred-result { margin-top: 0.5rem; }
.pred-empty { display: flex; align-items: center; gap: 0.75rem; color: #64748b; font-size: 0.875rem; padding: 1rem 0; }
.rotating { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

// Compatibilidad Numerológica
.compat-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1.5rem;
  padding: 1.5rem;
  @media (prefers-color-scheme: dark) { background: $surface; border-color: rgba(#374151, 0.5); }
}
.compat-inputs {
  display: flex; align-items: flex-end; gap: 1rem; margin-top: 1.25rem; flex-wrap: wrap;
}
.compat-field { display: flex; flex-direction: column; gap: 4px;
  label { font-size: 0.75rem; color: #6b7280; font-weight: 600; }
}
.compat-date-input {
  padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04); color: #e2e8f0; font-size: 0.85rem;
  color-scheme: dark; outline: none;
  &:focus { border-color: rgba($primary, 0.5); }
}
.compat-divider { font-size: 1.5rem; color: $primary; font-weight: 700; padding-bottom: 4px; }
.compat-result { margin-top: 1.5rem; }
.compat-nums {
  display: flex; align-items: center; gap: 1.5rem; justify-content: center;
  margin-bottom: 1rem; flex-wrap: wrap;
}
.compat-num-item { text-align: center; }
.compat-num-label { font-size: 0.7rem; color: #64748b; font-weight: 600; margin-bottom: 4px; }
.compat-num-val { font-size: 2rem; font-weight: 900; color: $primary; }
.compat-num-main { color: $gold; font-size: 2.5rem; }
.compat-symbol { font-size: 1.5rem; color: #ec4899; }
.compat-mensaje { text-align: center; font-size: 0.9rem; color: #94a3b8; font-style: italic; line-height: 1.6; }
</style>