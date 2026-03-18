<template>
  <q-page class="lectura-page">
    <div style="z-index: 100; position: relative; padding: 16px 24px;">
      <button @click="$router.back()" style="background: none; border: none; color: #f4d525; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 600;">
        <q-icon name="arrow_back" size="sm" />
        Volver atrás
      </button>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Decorative Background -->
      <div class="bg-decorative"></div>
      <div class="bg-glow right"></div>
      <div class="bg-glow left"></div>

      <div class="content-container">
        <!-- Header -->
        <header class="header-section">
          <div class="badge-pill">
            <q-icon name="auto_awesome" size="sm" class="text-primary" />
            <span>Lectura Generada por IA</span>
          </div>
          <h1 class="page-title">Tu Guía Diaria</h1>
          <p class="page-date">
  {{ lectura?.dia || '' }}
</p>
        </header>

        <!-- Main Reading Card -->
        <article class="reading-card">
          <div class="card-border-top"></div>
          <div class="card-border-bottom"></div>

          <div class="reading-grid">
            <!-- Left Column: Numerology -->
            <div class="reading-left">
              <!-- Número Principal dinámico (reutiliza numInfo ya calculado) -->
              <div class="number-wrapper">
                <div class="number-glow" :style="{boxShadow: '0 0 40px ' + numInfo.colorHex + '55'}"></div>
                <svg class="number-svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="1" class="opacity-30" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="1" class="opacity-60" />
                  <text x="50" y="60" font-size="40" text-anchor="middle" fill="#f4d525" class="text-glow">{{ numeroDeVida }}</text>
                </svg>
              </div>

              <h3 class="vibration-title">Número Principal</h3>
              <p class="vibration-desc" style="font-size:0.9rem;opacity:0.7">{{ numInfo.tag }}</p>

              <div class="stats-grid">
                <div class="stat-item">
                  <span class="stat-label">Color</span>
                  <span class="stat-value" style="display:flex;align-items:center;gap:6px">
                    <span :style="{width:'10px',height:'10px',borderRadius:'50%',background:numInfo.colorHex,display:'inline-block'}"></span>
                    {{ numInfo.color }}
                  </span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Planeta</span>
                  <span class="stat-value">☉ {{ numInfo.planeta }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Elemento</span>
                  <span class="stat-value">{{ numInfo.elemento }}</span>
                </div>
              </div>
            </div>

            <!-- Right Column: Reading -->
            <div class="reading-right">
              <div class="reading-content">
                <div v-if="cargando">
  Generando tu lectura...
</div>

<div v-else-if="error">
  {{ error }}
</div>

<div v-else-if="lectura">

  <h2 class="reading-title">
    <q-icon name="wb_twilight" size="md" />
    Tu Lectura de Hoy
  </h2>

  <p 
    class="reading-text"
    style="white-space: pre-line;"
  >
    {{ lectura.contenido.replace(/\*\*/g, '') }}
  </p>

  <!-- Botones de lectura -->
  <div class="reading-action-btns">
    <button class="ul-btn" @click="copiarLecturaLocal" :title="copiadoLocal ? '¡Copiado!' : 'Copiar lectura'">
      <q-icon :name="copiadoLocal ? 'check' : 'content_copy'" size="sm" />
      {{ copiadoLocal ? '¡Copiado!' : 'Copiar lectura' }}
    </button>
    <button class="ul-btn" @click="descargarTxtLocal" title="Descargar como TXT">
      <q-icon name="text_snippet" size="sm" />
      Descargar TXT
    </button>
    <button class="ul-btn" @click="descargarPdfLocal" title="Descargar como PDF">
      <q-icon name="picture_as_pdf" size="sm" />
      Descargar PDF
    </button>
  </div>

</div>
              </div>

              <!-- Favorito -->
              <div class="actions-section">
                <div class="action-buttons">
                  <button
                    class="icon-btn"
                    :title="esLecturaFavorita ? 'Quitar de favoritos' : 'Agregar a favoritos'"
                    @click="toggleFavLectura"
                  >
                    <q-icon
                      :name="esLecturaFavorita ? 'favorite' : 'favorite_border'"
                      size="md"
                      :style="esLecturaFavorita ? 'color:#ef4444' : ''"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- ══ Predicción + Compatibilidad (dos columnas) ══ -->
        <section class="extra-section">
          <div class="bottom-grid">

            <!-- Predicción Semanal (izquierda) -->
            

            <!-- Compatibilidad Numerológica (derecha) -->
            <div class="compat-section">
              <h3 class="pred-title">💫 Compatibilidad Numerológica</h3>
              <p class="pred-sub">Ingresa dos fechas para descubrir la vibración compartida</p>
              <div class="compat-inputs">
                <div class="compat-field">
                  <label>Fecha persona 1</label>
                  <input type="date" v-model="compatFecha1" class="compat-date-input" />
                </div>
                <div class="compat-divider">+</div>
                <div class="compat-field">
                  <label>Fecha persona 2</label>
                  <input type="date" v-model="compatFecha2" class="compat-date-input" />
                </div>
                <button class="pred-btn" @click="calcularCompatibilidad">Calcular</button>
              </div>
              <div v-if="resultadoCompat" class="compat-result">
                <div class="compat-nums">
                  <div class="compat-num-item">
                    <div class="compat-num-label">Persona 1</div>
                    <div class="compat-num-val">{{ resultadoCompat.num1 }}</div>
                  </div>
                  <div class="compat-symbol">♥</div>
                  <div class="compat-num-item">
                    <div class="compat-num-label">Persona 2</div>
                    <div class="compat-num-val">{{ resultadoCompat.num2 }}</div>
                  </div>
                  <div class="compat-symbol">=</div>
                  <div class="compat-num-item">
                    <div class="compat-num-label">Vibración</div>
                    <div class="compat-num-val compat-num-main">{{ resultadoCompat.vibra }}</div>
                  </div>
                </div>
                <p class="compat-mensaje">{{ resultadoCompat.mensaje }}</p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="page-footer">
      <div class="footer-container">
        <p class="footer-text">© 2023 Numera.ai - Todos los derechos reservados.</p>
        <div class="footer-links">
        </div>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "../stores/Auth"
import { getData, postData } from "../services/apiCliente"
import { useNotify } from "../composables/useNotify"

const auth = useAuthStore()
const router = useRouter()
const { notifySuccess, notifyError, notifyWarning, notifyLoading } = useNotify()

const lectura = ref(null)
const cargando = ref(false)
const error = ref("")
const copiadoLocal = ref(false)

// ══ Número de Vida (igual que en Dashboard) ══
const calcularNumeroDeVida = (fecha) => {
  if (!fecha) return '?'
  const digits = new Date(fecha).toLocaleDateString('en-CA').replace(/-/g, '')
  let sum = digits.split('').reduce((a, b) => a + parseInt(b), 0)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').reduce((a, b) => a + parseInt(b), 0)
  }
  return sum
}
const numeroDeVida = computed(() => calcularNumeroDeVida(auth.usuario?.fechanacimiento))

const numLookup = {
  1:  { color:'Rojo',    colorHex:'#ef4444', planeta:'Sol',     elemento:'Fuego',  tag:'Líder' },
  2:  { color:'Naranja', colorHex:'#f97316', planeta:'Luna',    elemento:'Agua',   tag:'Diplomático' },
  3:  { color:'Amarillo',colorHex:'#eab308', planeta:'Júpiter', elemento:'Aire',   tag:'Creativo' },
  4:  { color:'Verde',   colorHex:'#22c55e', planeta:'Saturno', elemento:'Tierra', tag:'Constructor' },
  5:  { color:'Azul',    colorHex:'#3b82f6', planeta:'Mercurio',elemento:'Aire',   tag:'Explorador' },
  6:  { color:'Índigo',  colorHex:'#6366f1', planeta:'Venus',   elemento:'Tierra', tag:'Armonioso' },
  7:  { color:'Violeta', colorHex:'#7c3aed', planeta:'Neptuno', elemento:'Agua',   tag:'Místico' },
  8:  { color:'Rosa',    colorHex:'#ec4899', planeta:'Saturno', elemento:'Tierra', tag:'Ejecutivo' },
  9:  { color:'Dorado',  colorHex:'#D4AF37', planeta:'Marte',   elemento:'Fuego',  tag:'Humanista' },
  11: { color:'Plateado',colorHex:'#94a3b8', planeta:'Luna',    elemento:'Agua',   tag:'Número Maestro' },
  22: { color:'Azul Real',colorHex:'#1d4ed8',planeta:'Urano',   elemento:'Aire',   tag:'Número Maestro' },
  33: { color:'Dorado',  colorHex:'#D4AF37', planeta:'Venus',   elemento:'Fuego',  tag:'Número Maestro' },
}
const numInfo = computed(() => numLookup[numeroDeVida.value] || { color:'Misterioso', colorHex:'#7311d4', planeta:'Desconocido', elemento:'-', tag:'' })

// ══ Predicción Semanal ══
const prediccionSemanal = ref(null)
const cargandoSemanal = ref(false)
const errorSemanal = ref('')

const generarPrediccionSemanal = async () => {
  if (!auth.usuario?._id) return
  cargandoSemanal.value = true
  errorSemanal.value = ''
  try {
    const data = await postData('/lecturas', { usuario_id: auth.usuario._id, tipo: 'semanal' })
    prediccionSemanal.value = data.lectura?.contenido || data.contenido || null
    if (prediccionSemanal.value) notifySuccess('¡Tu predicción semanal ha llegado! ✨', 'auto_fix_high')
  } catch (e) {
    const msg = e.response?.data?.msg || ''
    errorSemanal.value = msg || 'Error al generar predicción'
    notifyError(errorSemanal.value, 'error_outline')
  } finally {
    cargandoSemanal.value = false
  }
}

// ══ Compatibilidad Numerológica ══
const compatFecha1 = ref('')
const compatFecha2 = ref('')
const resultadoCompat = ref(null)
const mensajesCompat = {
  alta:  'Su vibración es armónica. El universo sonríe cuando están juntos.',
  media: 'Tienen energías complementarias con oportunidades de crecer juntos.',
  baja:  'Sus números se desafían mutuamente, pero el aprendizaje es profundo.',
}
const calcularCompatibilidad = () => {
  if (!compatFecha1.value || !compatFecha2.value) return
  const num1 = calcularNumeroDeVida(compatFecha1.value)
  const num2 = calcularNumeroDeVida(compatFecha2.value)
  let vibra = Number(num1) + Number(num2)
  while (vibra > 9 && vibra !== 11 && vibra !== 22 && vibra !== 33) {
    vibra = String(vibra).split('').reduce((a, b) => a + parseInt(b), 0)
  }
  const pares_alta = [[1,9],[2,8],[3,6],[4,8],[5,5],[7,2]]
  const esAlta = pares_alta.some(([a,b]) => (a===num1&&b===num2)||(a===num2&&b===num1))
  const nivel = esAlta ? 'alta' : (vibra <= 5 ? 'media' : 'baja')
  resultadoCompat.value = { num1, num2, vibra, mensaje: mensajesCompat[nivel] }
  notifySuccess(`Vibración compartida: ${vibra} — ${nivel === 'alta' ? 'Alta compatibilidad ✨' : 'Calculado'}`, 'favorite')
}


// ══ Favoritos (mismo localStorage que MisLecturas.vue) ══
const FAVES_KEY_LD = `ml_fav_${auth.usuario?._id || 'guest'}`
const favIds = ref(JSON.parse(localStorage.getItem(FAVES_KEY_LD) || '[]'))

const esLecturaFavorita = computed(() => lectura.value?._id ? favIds.value.includes(lectura.value._id) : false)

const toggleFavLectura = () => {
  if (!lectura.value?._id) return
  const id = lectura.value._id
  if (favIds.value.includes(id)) {
    favIds.value = favIds.value.filter(f => f !== id)
    notifySuccess('Lectura quitada de favoritos.', 'favorite_border')
  } else {
    favIds.value = [...favIds.value, id]
    notifySuccess('Lectura guardada en favoritos. ❤️', 'favorite')
  }
  localStorage.setItem(FAVES_KEY_LD, JSON.stringify(favIds.value))
}

// ══ Copiar lectura ══
const copiarLecturaLocal = async () => {
  if (!lectura.value?.contenido) return
  await navigator.clipboard.writeText(lectura.value.contenido)
  copiadoLocal.value = true
  notifySuccess('Lectura copiada al portapapeles.', 'content_copy')
  setTimeout(() => { copiadoLocal.value = false }, 2000)
}

// ══ Descargar TXT ══
const descargarTxtLocal = () => {
  if (!lectura.value?.contenido) return
  const blob = new Blob([lectura.value.contenido], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'lectura-diaria.txt'; a.click()
  URL.revokeObjectURL(url)
  notifySuccess('Archivo TXT descargado.', 'download')
}

// ══ Descargar PDF ══
const descargarPdfLocal = () => {
  if (!lectura.value?.contenido) return
  const win = window.open('', '_blank')
  win.document.write(`<pre style="font-family:sans-serif;padding:32px;max-width:700px;margin:auto">${lectura.value.contenido}</pre>`)
  win.document.close()
  win.print()
}


const cargarLectura = async () => {
  let dismiss = null
  try {

    cargando.value = true
    // Notificación de carga
    dismiss = notifyLoading('Consultando el universo...')

    // Intentar generar la lectura. Si ya existe hoy, el backend
    // devuelve 400 — eso es normal, ignoramos el error y seguimos.
    try {
      await postData("/lecturas", {
        usuario_id: auth.usuario._id,
        tipo: "diaria",
        contenido: "Tu energía hoy se alinea con el número 7..."
      })
    } catch (postErr) {
      // Ignoramos los 400 esperados: ya existe la lectura de hoy (diaria o principal)
      const msg = postErr.response?.data?.msg || ""
      const esLecturaExistente = msg.includes("Ya generaste") || msg.includes("Ya has generado")
      if (!esLecturaExistente) throw postErr
    }

    // Obtener la lectura del día (nueva o ya existente)
    try {
      const data = await getData(`/lecturas/diaria/${auth.usuario._id}`)
      // El backend devuelve { lectura: { contenido, dia, ... } }
      lectura.value = data.lectura
    } catch (getErr) {
      // Si es 404, el usuario tiene estado=0 y su lectura es "principal" (no "diaria")
      // Buscamos su lectura principal como fallback
      if (getErr.response?.status === 404) {
        const dataAll = await getData(`/lecturas/${auth.usuario._id}`)
        lectura.value = dataAll.lecturas?.[0] || null
      } else {
        throw getErr
      }
    }

    dismiss?.() // Cerrar el loader
    notifySuccess('Tu lectura diaria ha llegado. ✨', 'auto_awesome')

  } catch (err) {

    dismiss?.() // Cerrar el loader aunque haya error
    error.value = err.response?.data?.msg || "No tienes lectura hoy"
    notifyError(error.value, 'error_outline')

  } finally {

    cargando.value = false

  }
}


onMounted(async () => {

  console.log("Usuario:", auth.usuario)

  if (!auth.usuario?._id) {
    error.value = "Usuario no autenticado"
    return
  }

  // Guardia: solo usuarios con estado=1 pueden ver esta vista
  if (auth.usuario?.estado !== 1) {
    notifyWarning('Esta vista es exclusiva de Místico Pro.', 'workspace_premium')
    router.push('/dashboard')
    return
  }

  await cargarLectura()

})
</script>

<style scoped lang="scss">
$primary: #f4d525;
$primary-dim: #bfa515;
$bg-dark: #221f10;
$mystic-purple: #2D1B36;
$mystic-purple-light: #3E2A4F;
$text-gray-light: #d1d5db;
$text-gray-dark: #9ca3af;

* { box-sizing: border-box; }

.lectura-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $bg-dark;
  color: $text-gray-light;
}

// MAIN CONTENT
.main-content {
  flex: 1;
  position: relative;
  background: linear-gradient(180deg, #3e2a4f 0%, $bg-dark 100%);
  overflow-y: auto;
}

.bg-decorative {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 600px;
  background: linear-gradient(to bottom, rgba($primary, 0.05), transparent);
  pointer-events: none;
}

.bg-glow {
  position: absolute;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  filter: blur(96px);
  pointer-events: none;

  &.right {
    top: 80px;
    right: 40px;
    background: rgba($primary, 0.05);
  }

  &.left {
    bottom: 80px;
    left: 40px;
    background: rgba($mystic-purple-light, 0.2);
  }
}

.content-container {
  position: relative;
  z-index: 10;
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1rem;

  @media (max-width: 640px) {
    padding: 2rem 1rem;
  }
}

// HEADER
.header-section {
  text-align: center;
  margin-bottom: 3rem;

  .badge-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9ca3af;
  }

  .page-title {
    font-family: 'Newsreader', serif;
    font-size: 3.75rem;
    font-weight: 300;
    color: white;
    margin: 0 0 0.5rem 0;
    letter-spacing: -0.025em;

    @media (max-width: 768px) {
      font-size: 2.25rem;
    }
  }

  .page-date {
    font-size: 1.25rem;
    color: $primary;
    font-weight: 300;
    font-style: italic;
    margin: 0;
  }
}

// READING CARD
.reading-card {
  width: 100%;
  background: rgba($mystic-purple, 0.6);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px -5px rgba($primary, 0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  .card-border-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, transparent, rgba($primary, 0.5), transparent);
  }

  .card-border-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, transparent, rgba($primary, 0.2), transparent);
  }

  .reading-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .reading-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding-right: 2rem;
    text-align: center;

    @media (max-width: 768px) {
      border-right: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-right: 0;
      padding-bottom: 2rem;
    }

    .number-wrapper {
      position: relative;
      margin-bottom: 1.5rem;

      .number-glow {
        position: absolute;
        inset: 0;
        background: rgba($primary, 0.1);
        border-radius: 50%;
        filter: blur(24px);
        transform: scale(1.5);
        animation: pulse 3s ease-in-out infinite;
      }

      .number-svg {
        width: 8rem;
        height: 8rem;
        color: $primary;
        position: relative;
        z-index: 1;
        filter: drop-shadow(0 0 10px rgba($primary, 0.4));
      }
    }

    .vibration-title {
      font-size: 1.25rem;
      color: white;
      font-weight: 500;
      margin: 0 0 0.5rem 0;
    }

    .vibration-desc {
      font-size: 1rem;
      color: #9ca3af;
      line-height: 1.5;
      margin: 0 0 1.5rem 0;
    }

    .stats-grid {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      width: 100%;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);

      .stat-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: rgba(255, 255, 255, 0.04);
        padding: 0.75rem 1rem;
        border-radius: 8px;
        width: 100%;
        margin: 0;

        .stat-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: #9ca3af;
          letter-spacing: 0.05em;
          margin-bottom: 0;
        }

        .stat-value {
          color: white;
          font-weight: 500;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }
      }
    }
  }

  .reading-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .reading-content {
    margin-bottom: 2rem;

    .reading-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      color: $primary;
      font-weight: 400;
      font-family: 'Newsreader', serif;
      margin: 0 0 1.5rem 0;
    }

    .reading-text {
      font-size: 1.125rem;
      color: #d1d5db;
      font-weight: 300;
      line-height: 2;
      margin: 0 0 1.5rem 0;

      strong {
        color: white;
        font-weight: 400;
      }
    }

    .reading-quote {
      border-left: 2px solid $primary;
      padding-left: 1.5rem;
      margin: 2rem 0;
      font-style: italic;
      color: white;
      font-size: 1.25rem;
      font-weight: 400;
      background: rgba(255, 255, 255, 0.05);
      padding: 1rem 1rem 1rem 1.5rem;
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }

  .actions-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    @media (max-width: 640px) {
      flex-direction: column;
    }

    .share-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem 2rem;
      background: $primary;
      color: $bg-dark;
      border: none;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 10px 20px -5px rgba($primary, 0.3);

      &:hover {
        background: $primary-dim;
        transform: scale(1.05);
      }

      @media (max-width: 640px) {
        width: 100%;
      }
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
      margin-left: auto;

      @media (max-width: 640px) {
        margin-left: 0;
        width: 100%;
        justify-content: center;
      }

      .icon-btn {
        padding: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: none;
        color: #9ca3af;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          color: $primary;
          border-color: rgba($primary, 0.5);
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }
}

// RELATED SECTION
.related-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .related-card {
    display: block;
    padding: 1.5rem;
    background: $bg-dark;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;

    &:hover {
      border-color: rgba($primary, 0.4);

      .card-glow {
        opacity: 1;
      }

      .card-title {
        color: $primary;
      }
    }

    .card-glow {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, transparent, rgba($primary, 0.05));
      opacity: 0;
      transition: opacity 0.3s;
    }

    .card-inner {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .card-icon {
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 0.5rem;
      color: $primary;
      flex-shrink: 0;
    }

    .card-text {
      flex: 1;

      .card-title {
        font-size: 1.125rem;
        color: white;
        font-weight: 500;
        margin: 0 0 0.5rem 0;
        transition: color 0.3s;
      }

      .card-desc {
        font-size: 0.875rem;
        color: #9ca3af;
        margin: 0;
      }
    }
  }
}

// FOOTER
.page-footer {
  background: $bg-dark;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  margin-top: 3rem;

  .footer-container {
    max-width: 112rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

   
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  .footer-text {
    font-size: 0.875rem;
    color: #6b7280;
    font-weight: 300;
    margin: 0;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;

    a {
      font-size: 0.875rem;
      color: #6b7280;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: $primary;
      }
    }
  }
}

// ANIMATIONS
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

// UTILITY CLASSES
.hide-lt-md {
  @media (max-width: 768px) {
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

// BOTONES COPIAR / DESCARGAR
.reading-action-btns {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.ul-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 6px 16px;
  border: 1px solid rgba($primary, 0.4);
  border-radius: 8px;
  background: rgba($primary, 0.07);
  color: $primary;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover { background: rgba($primary, 0.18); }
}

// ══ NUEVA EXTRA-SECTION ══
.extra-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 0 2rem;
  margin-top: 2rem;
}

// Número Principal + Color/Planeta
.num-principal-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, rgba(115,17,212,0.15), rgba(212,175,55,0.07));
  border: 1px solid rgba(115,17,212,0.3);
  border-radius: 1.5rem;
  padding: 1.75rem 2rem;
  @media (max-width: 640px) { flex-direction: column; align-items: flex-start; }
}
.npc-left { text-align: center; min-width: 100px; }
.npc-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.npc-value { font-size: 3.5rem; font-weight: 900; color: #D4AF37; line-height: 1; }
.npc-tag   { font-size: 0.75rem; color: #9c4ddb; font-weight: 700; margin-top: 4px; }
.npc-right { flex: 1; display: flex; flex-direction: column; gap: 0.75rem; }
.npc-attr  { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
.npc-attr-label { font-size: 0.8rem; color: #64748b; font-weight: 600; }
.npc-attr-val   { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 700; color: #e2e8f0; }
.color-swatch   { width: 14px; height: 14px; border-radius: 50%; display: inline-block; flex-shrink: 0; }

// Predicción Semanal + Compatibilidad
.pred-section, .compat-section {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 1.5rem;
  padding: 1.5rem;
}
.pred-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.pred-title  { font-size: 1rem; font-weight: 700; color: #e2e8f0; margin: 0; }
.pred-sub    { font-size: 0.8rem; color: #6b7280; margin: 2px 0 0; }
.pred-btn {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 8px 18px; border: none; border-radius: 10px;
  background: rgba(115,17,212,0.15); color: #9c4ddb;
  font-size: 0.82rem; font-weight: 700; cursor: pointer; transition: all 0.2s; white-space: nowrap;
  &:hover:not(:disabled) { background: rgba(115,17,212,0.28); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
}
.pred-empty { display: flex; align-items: center; gap: 0.75rem; color: #64748b; font-size: 0.875rem; padding: 1rem 0; }
.rotating { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

// Compatibilidad
.compat-inputs { display: flex; align-items: flex-end; gap: 1rem; margin-top: 1.25rem; flex-wrap: wrap; }
.compat-field { display: flex; flex-direction: column; gap: 4px;
  label { font-size: 0.75rem; color: #6b7280; font-weight: 600; }
}
.compat-date-input {
  padding: 8px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04); color: #e2e8f0; font-size: 0.85rem;
  color-scheme: dark; outline: none;
  &:focus { border-color: rgba(115,17,212,0.5); }
}
.compat-divider { font-size: 1.5rem; color: #9c4ddb; font-weight: 700; padding-bottom: 4px; }
.compat-result  { margin-top: 1.5rem; }
.compat-nums    { display: flex; align-items: center; gap: 1.5rem; justify-content: center; margin-bottom: 1rem; flex-wrap: wrap; }
.compat-num-item { text-align: center; }
.compat-num-label { font-size: 0.7rem; color: #64748b; font-weight: 600; margin-bottom: 4px; }
.compat-num-val   { font-size: 2rem; font-weight: 900; color: #9c4ddb; }
.compat-num-main  { color: #D4AF37; font-size: 2.5rem; }
.compat-symbol    { font-size: 1.5rem; color: #ec4899; }
.compat-mensaje   { text-align: center; font-size: 0.9rem; color: #94a3b8; font-style: italic; line-height: 1.6; }

// ══ Layout 2 columnas (Predicción + Compatibilidad) ══
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

// Las tarjetas en bottom-grid ocupan 100% altura disponible
.bottom-grid > .pred-section,
.bottom-grid > .compat-section {
  height: 100%;
  box-sizing: border-box;
}
</style>