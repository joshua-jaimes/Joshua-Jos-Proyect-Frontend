<template>
  <div class="generador-page">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-logo">
          <div class="logo-icon">
            <q-icon name="auto_awesome" size="lg" class="text-primary" />
          </div>
          <span class="logo-text">Cosmos<span class="text-primary">AI</span></span>
        </div>

        <div class="navbar-menu hide-lt-md">
          <a href="#" class="nav-link active">Generador</a>
          
          <router-link :to="{ name: 'MembresiasYPagos' }" class="nav-link">Membresía</router-link>
        </div>

        <div class="user-profile hide-lt-md">
          <div class="user-info">
            
          </div>
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIRWmWe95HA1QP-6296LakYAL2vTUkDsNeRi-uPxvXpAzFelIZ8MhJT_n6pg580KS4uE3Odv5IWV9nd_SuAmZ4ruTzB9Gs8wypmFIYAFfRK3MWH4t5zqs7b_ZesmayBxxTC8G4XM2ZQnj_YOF6qje4Z8FUzxjv_VImhOzQzAsCyDlB7B9HOmts_EX94WxbC5Dkwp4DyAESQKCxZ5U8ypBas6g-7wojP8F18HHZe4ELVLj-cLV88erL747spejC55DXO7hxwHk7Jhc" alt="Sofia" class="user-avatar" />
        </div>

        <button class="menu-btn hide-gt-sm">
          <q-icon name="menu" size="lg" />
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <div class="content-container">
        <div class="layout-grid">
          <!-- Left Column: Input Form -->
          <div class="left-column">
            <!-- Input Card -->
            <div class="input-card">
              <div class="card-header-bg"></div>
              <div class="card-content">
                <h2 class="card-title">
                  <span>Nueva Lectura</span>
                  <q-icon name="lens_blur" size="sm" class="text-primary pulse" />
                </h2>
                <p class="card-subtitle">Ingresa tus datos para conectar con el cosmos.</p>

                <form class="form-space">
                  <!-- Name Field -->
                  <div class="form-group">
                    <label class="form-label">Nombre Completo</label>
                    <div class="form-input-wrapper">
                      <q-icon name="person" class="form-icon" />
                      <input v-model="form.name" type="text" placeholder="Ej: Maria González" class="form-input" />
                    </div>
                  </div>

                  <!-- Birth Date Field -->
                  <div class="form-group">
                    <label class="form-label">Fecha de Nacimiento</label>
                    <div class="form-input-wrapper">
                      <q-icon name="calendar_today" class="form-icon" />
                      <input v-model="form.birthdate" type="date" class="form-input" />
                    </div>
                  </div>
                  

                  <!-- Submit Button -->
                  <button type="button" class="submit-btn cosmic-pulse" @click="generarLectura" :disabled="cargando">
                    <q-spinner v-if="cargando" size="sm" class="q-mr-sm" />
                    <q-icon v-else name="auto_awesome" size="sm" />
                    <span>{{ cargando ? 'Generando...' : 'Generar Interpretación IA' }}</span>
                  </button>
                </form>
              </div>
            </div>


          </div>

          <!-- Right Column: Results -->
          <div class="right-column">
            <!-- Quick Stats -->
            

            <!-- AI Interpretation -->
            <div class="interpretation-card">
              <div class="interpretation-header">
                <div class="header-left">
                  <div class="ai-icon-box">
                    <q-icon name="smart_toy" size="sm" class="text-primary" />
                  </div>
                  <h3 class="interpretation-title">Interpretación Cósmica IA</h3>
                </div>
                <div class="header-actions">
                  <button class="action-btn" title="Copiar" @click="copiarPrincipal">
                    <q-icon :name="copiadoPrincipal ? 'check' : 'content_copy'" size="sm" />
                  </button>
                  <button class="action-btn" title="Guardar TXT" @click="descargarTxtPrincipal">
                    <q-icon name="text_snippet" size="sm" />
                  </button>
                  <button class="action-btn" title="Guardar PDF" @click="descargarPdfPrincipal">
                    <q-icon name="picture_as_pdf" size="sm" />
                  </button>
                </div>
              </div>

              <div class="interpretation-content">

                <!-- Estado: cargando -->
                <div v-if="cargando" class="intro-block">
                  <p class="intro-greeting">Generando tu lectura cósmica...</p>
                </div>

                <!-- Estado: error -->
                <div v-else-if="error" class="intro-block">
                  <p class="intro-greeting">{{ error }}</p>
                </div>

                <!-- Estado: lectura generada -->
                <div v-else-if="lectura">
                  <div class="intro-block">
                    <p class="intro-greeting">Tu Lectura Principal</p>
                  </div>
                  <div class="content-sections">
                    <p style="white-space: pre-line; line-height: 1.8;">{{ lectura.contenido.replace(/\*\*/g, '') }}</p>
                  </div>
                  <!-- Botones de acción -->
                  <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.25rem">
                    <button class="submit-btn" style="padding:8px 18px;font-size:0.85rem" @click="copiarPrincipal" :title="copiadoPrincipal ? '¡Copiado!' : 'Copiar lectura'">
                      <q-icon :name="copiadoPrincipal ? 'check' : 'content_copy'" size="sm" />
                      {{ copiadoPrincipal ? '¡Copiado!' : 'Copiar lectura' }}
                    </button>
                    <button class="submit-btn" style="padding:8px 18px;font-size:0.85rem" @click="descargarTxtPrincipal" title="Descargar TXT">
                      <q-icon name="text_snippet" size="sm" />
                      Descargar TXT
                    </button>
                    <button class="submit-btn" style="padding:8px 18px;font-size:0.85rem" @click="descargarPdfPrincipal" title="Descargar PDF">
                      <q-icon name="picture_as_pdf" size="sm" />
                      Descargar PDF
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="page-footer">
      <div class="footer-container">
        <p class="footer-text">© 2026 CosmosAI Numerología. Todos los derechos reservados.</p>
        
        
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/Auth'
import { postData, getData } from '../services/apiCliente'
import { useNotify } from '../composables/useNotify'

const auth = useAuthStore()
const { notifySuccess, notifyError, notifyWarning, notifyLoading } = useNotify()

const form = ref({
  name: '',
  birthdate: ''
})

const lectura = ref(null)
const cargando = ref(false)
const error = ref('')

// Al montar, intentar cargar la lectura principal ya existente
onMounted(async () => {
  if (auth.usuario) {
    form.value.name = auth.usuario.nombre || ''
    if (auth.usuario.fechanacimiento) {
      form.value.birthdate = auth.usuario.fechanacimiento.split('T')[0]
    }
  }

  if (!auth.usuario?._id) return
  try {
    const data = await getData(`/lecturas/${auth.usuario._id}`)
    // Buscar si ya existe una lectura principal
    const principal = data.lecturas?.find(l => l.tipo === 'principal')
    if (principal) lectura.value = principal
  } catch {
    // No hay lecturas aún, no mostrar error
  }
})

const generarLectura = async () => {
  if (!auth.usuario?._id) {
    error.value = 'Usuario no autenticado'
    notifyError('Usuario no autenticado', 'error_outline')
    return
  }
  if (lectura.value) {
    error.value = 'Ya has generado tu lectura principal. Esta lectura es única de por vida.'
    notifyWarning('Ya tienes tu lectura principal registrada. Esta es única de por vida.', 'info')
    return
  }
  let dismiss = null
  try {
    cargando.value = true
    error.value = ''
    dismiss = notifyLoading('Consultando el universo... Tu lectura principal está siendo creada.')
    // El backend recibe usuario_id y tipo; si estado=0, fuerza tipo="principal" internamente
    const data = await postData('/lecturas', {
      usuario_id: auth.usuario._id,
      tipo: 'principal'
    })
    // El backend devuelve { msg, lectura }
    lectura.value = data.lectura || data.lecturas?.[0] || data || null
    dismiss?.()
    notifySuccess('Tu lectura principal ha llegado. ✨ Este es un mensaje único para ti.', 'auto_fix_high')
  } catch (err) {
    dismiss?.()
    error.value = err.response?.data?.msg || 'Error al generar la lectura'
    notifyError(error.value, 'error_outline')
  } finally {
    cargando.value = false
  }
}

// ══ Copiar / Descargar lectura principal ══
const copiadoPrincipal = ref(false)

const copiarPrincipal = async () => {
  if (!lectura.value?.contenido) return
  await navigator.clipboard.writeText(lectura.value.contenido)
  copiadoPrincipal.value = true
  setTimeout(() => { copiadoPrincipal.value = false }, 2000)
}

const descargarTxtPrincipal = () => {
  if (!lectura.value?.contenido) return
  const blob = new Blob([lectura.value.contenido], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'lectura-principal.txt'; a.click()
  URL.revokeObjectURL(url)
}

const descargarPdfPrincipal = () => {
  if (!lectura.value?.contenido) return
  const win = window.open('', '_blank')
  win.document.write(`<pre style="font-family:sans-serif;padding:32px;max-width:700px;margin:auto">${lectura.value.contenido}</pre>`)
  win.document.close()
  win.print()
}
</script>

<style scoped lang="scss">
$primary: #7311d4;
$bg-dark: #191022;
$card-dark: #241b30;
$text-gray-light: #f3f4f6;
$text-gray-dark: #9ca3af;

* { box-sizing: border-box; }

.generador-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $bg-dark;
  color: $text-gray-light;
}

@keyframes cosmic-pulse {
  0% { box-shadow: 0 0 0 0 rgba($primary, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba($primary, 0); }
  100% { box-shadow: 0 0 0 0 rgba($primary, 0); }
}

// NAVBAR
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(#f7f6f8, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    background: rgba($bg-dark, 0.8);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .navbar-container {
    max-width: 112rem;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
  }

  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .logo-icon {
      background: rgba($primary, 0.2);
      padding: 0.5rem;
      border-radius: 0.5rem;
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      color: #111;

      @media (prefers-color-scheme: dark) {
        color: white;
      }

      .text-primary {
        color: $primary;
      }
    }
  }

  .navbar-menu {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: 2.5rem;

    @media (max-width: 768px) {
      display: none;
    }

    .nav-link {
      color: #4b5563;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      transition: all 0.3s;

      @media (prefers-color-scheme: dark) {
        color: #d1d5db;
      }

      &:hover {
        color: #111;

        @media (prefers-color-scheme: dark) {
          color: white;
        }
      }

      &.active {
        background: rgba($primary, 0.1);
        color: $primary;
        font-weight: 600;
      }
    }
  }

  .user-profile {
    display: flex;
    align-items: center;
    gap: 1rem;

    .user-info {
      text-align: right;

      .user-name {
        font-size: 0.875rem;
        font-weight: 700;
        color: #111;

        @media (prefers-color-scheme: dark) {
          color: white;
        }
      }

      .user-plan {
        font-size: 0.75rem;
        color: $primary;
        font-weight: 500;
      }
    }

    .user-avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      border: 2px solid $primary;
      object-fit: cover;
    }
  }

  .menu-btn {
    background: none;
    border: none;
    color: #4b5563;
    cursor: pointer;

    @media (prefers-color-scheme: dark) {
      color: #d1d5db;
    }
  }
}

// MAIN CONTENT
.main-content {
  flex: 1;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.content-container {
  max-width: 112rem;
  margin: 0 auto;
}

.layout-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

// LEFT COLUMN
.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

// INPUT CARD
.input-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background: $card-dark;
    border-color: rgba(255, 255, 255, 0.05);
  }

  .card-header-bg {
    height: 2rem;
    background: linear-gradient(to bottom right, $primary, #7c3aed, #000);
    opacity: 0.2;
  }

  .card-content {
    padding: 1.5rem;
  }

  .card-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: #111;

    @media (prefers-color-scheme: dark) {
      color: white;
    }

    .pulse {
      animation: pulse 2s infinite;
    }
  }

  .card-subtitle {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0 0 1.5rem 0;

    @media (prefers-color-scheme: dark) {
      color: #9ca3af;
    }
  }

  .form-space {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;

    .form-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;

      @media (prefers-color-scheme: dark) {
        color: #d1d5db;
      }
    }

    .form-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      .form-icon {
        position: absolute;
        left: 0.75rem;
        color: #9ca3af;
        pointer-events: none;
      }

      .form-input {
        width: 100%;
        padding: 0.75rem 0.75rem 0.75rem 2.5rem;
        background: #f9fafb;
        border: 1px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        color: #111;
        transition: all 0.3s;

        @media (prefers-color-scheme: dark) {
          background: $bg-dark;
          border-color: rgba(255, 255, 255, 0.1);
          color: white;
        }

        &:focus {
          outline: none;
          border-color: $primary;
          box-shadow: 0 0 0 2px rgba($primary, 0.1);
        }
      }
    }
  }

  .reading-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;

    .reading-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem;
      border: 2px solid #d1d5db;
      background: white;
      border-radius: 0.5rem;
      color: #6b7280;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;

      @media (prefers-color-scheme: dark) {
        background: $bg-dark;
        border-color: rgba(255, 255, 255, 0.1);
        color: #9ca3af;
      }

      &.active {
        border-color: $primary;
        background: rgba($primary, 0.1);
        color: $primary;
      }

      &:hover:not(.active) {
        border-color: #9ca3af;
      }
    }
  }

  .submit-btn {
    width: 100%;
    padding: 0.875rem 1rem;
    background: $primary;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 700;
    font-size: 0.875rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    transition: all 0.3s;

    &:hover {
      background: #6a0dad;
      transform: translateY(-2px);
    }

    &.cosmic-pulse {
      animation: cosmic-pulse 2s infinite;
    }
  }
}

// MEMBERSHIP CARD
.membership-card {
  background: linear-gradient(to right, #111, #000);
  border-radius: 0.75rem;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to right, #2a1f3d, #1a1225);
  }

  .membership-gradient {
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left, rgba($primary, 0.2), transparent);
    pointer-events: none;
  }

  .membership-content {
    position: relative;
    z-index: 1;
    color: white;
  }

  .membership-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    .membership-title {
      font-weight: 700;
      font-size: 1.125rem;
      margin: 0;
    }

    .membership-date {
      font-size: 0.75rem;
      color: #9ca3af;
      margin: 0.25rem 0 0 0;
    }

    .active-badge {
      background: $primary;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: 0.25rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .credits-section {
    margin-bottom: 1rem;

    .credits-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;

      .credits-value {
        font-weight: 700;
      }
    }

    .progress-bar {
      width: 100%;
      height: 0.375rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: $primary;
        border-radius: 9999px;
      }
    }
  }

  .manage-btn {
    font-size: 0.75rem;
    color: $primary;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.3s;

    &:hover {
      color: white;
    }
  }
}

// RIGHT COLUMN
.right-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

// STATS GRID
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .stat-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;

    @media (prefers-color-scheme: dark) {
      background: $card-dark;
      border-color: rgba(255, 255, 255, 0.05);
    }

    &:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      border-color: rgba($primary, 0.5);

      .card-bg-icon {
        opacity: 0.2;
      }
    }

    .card-glow {
      position: absolute;
      top: 0;
      right: 0;
      width: 4rem;
      height: 4rem;
      background: rgba($primary, 0.1);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .card-bg-icon {
      position: absolute;
      top: 1rem;
      right: 1rem;
      opacity: 0.1;
      color: $primary;
      transition: opacity 0.3s;
    }

    .stat-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: #6b7280;
      letter-spacing: 0.05em;
      font-weight: 600;
      margin-bottom: 0.75rem;

      @media (prefers-color-scheme: dark) {
        color: #9ca3af;
      }
    }

    .stat-number {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 1rem;

      .number {
        font-size: 3rem;
        font-weight: 700;
        color: $primary;
      }

      .name {
        font-size: 0.875rem;
        color: #6b7280;

        @media (prefers-color-scheme: dark) {
          color: #9ca3af;
        }
      }
    }

    .stat-desc {
      font-size: 0.875rem;
      color: #6b7280;
      line-height: 1.5;

      @media (prefers-color-scheme: dark) {
        color: #9ca3af;
      }
    }
  }
}

// INTERPRETATION CARD
.interpretation-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (prefers-color-scheme: dark) {
    background: $card-dark;
    border-color: rgba(255, 255, 255, 0.05);
  }

  .interpretation-header {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (prefers-color-scheme: dark) {
      background: rgba(0, 0, 0, 0.2);
      border-bottom-color: rgba(255, 255, 255, 0.05);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .ai-icon-box {
        width: 2rem;
        height: 2rem;
        border-radius: 0.5rem;
        background: rgba($primary, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .interpretation-title {
        font-weight: 700;
        font-size: 1.125rem;
        margin: 0;
        color: #111;

        @media (prefers-color-scheme: dark) {
          color: white;
        }
      }
    }

    .header-actions {
      display: flex;
      gap: 0.5rem;

      .action-btn {
        padding: 0.5rem;
        background: none;
        border: none;
        color: #9ca3af;
        cursor: pointer;
        border-radius: 0.375rem;
        transition: all 0.3s;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          color: $primary;
        }
      }
    }
  }

  .interpretation-content {
    padding: 1.5rem;
    max-height: 500px;
    overflow-y: auto;
    color: #4b5563;

    @media (prefers-color-scheme: dark) {
      color: #d1d5db;
    }

    .intro-block {
      border-left: 4px solid $primary;
      padding-left: 1rem;
      margin-bottom: 1.5rem;

      .intro-greeting {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: #111;

        @media (prefers-color-scheme: dark) {
          color: white;
        }
      }

      p {
        margin: 0;
        line-height: 1.6;

        .highlight {
          color: $primary;
          font-weight: 700;
        }
      }
    }

    .content-sections {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .section-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 700;
        color: white;
        margin: 1rem 0 0.5rem 0;
      }

      p {
        margin: 0;
        line-height: 1.6;
      }

      .challenges-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 1rem 0;

        @media (max-width: 640px) {
          grid-template-columns: 1fr;
        }

        .challenge-box {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;

          @media (prefers-color-scheme: dark) {
            background: $bg-dark;
          }

          .box-title {
            font-size: 0.875rem;
            font-weight: 700;
            margin: 0 0 0.75rem 0;
            text-transform: uppercase;
            letter-spacing: 0.05em;

            &.challenges {
              color: #dc2626;
            }

            &.potentials {
              color: #16a34a;
            }
          }

          .challenge-list {
            list-style: disc;
            list-style-position: inside;
            margin: 0;
            padding: 0;
            font-size: 0.875rem;

            li {
              margin-bottom: 0.375rem;
            }
          }
        }
      }
    }
  }

  .interpretation-footer {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: #f9fafb;
    display: flex;
    justify-content: center;

    @media (prefers-color-scheme: dark) {
      background: rgba(0, 0, 0, 0.2);
      border-top-color: rgba(255, 255, 255, 0.05);
    }

    .regenerate-btn {
      font-size: 0.875rem;
      color: $primary;
      background: none;
      border: none;
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.3s;

      &:hover {
        color: white;
      }
    }
  }
}

// BALANCE CARD
.balance-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  @media (prefers-color-scheme: dark) {
    background: $card-dark;
    border-color: rgba(255, 255, 255, 0.05);
  }

  .balance-title {
    font-weight: 700;
    font-size: 1.125rem;
    margin: 0 0 1rem 0;
    color: #111;

    @media (prefers-color-scheme: dark) {
      color: white;
    }
  }

  .balance-content {
    display: flex;
    gap: 2rem;

    @media (max-width: 640px) {
      flex-direction: column;
      gap: 1rem;
    }

    .radar-chart {
      width: 12rem;
      height: 12rem;
      flex-shrink: 0;
      position: relative;

      .radar-circles {
        position: absolute;
        inset: 0;
        border: 1px solid #e5e7eb;
        border-radius: 50%;
        box-shadow:
          inset 0 0 0 2rem #f9fafb,
          inset 0 0 0 4rem #ffffff,
          inset 0 0 0 6rem #f9fafb;

        @media (prefers-color-scheme: dark) {
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow:
            inset 0 0 0 2rem #191022,
            inset 0 0 0 4rem $card-dark,
            inset 0 0 0 6rem #191022;
        }
      }

      .balance-label {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        color: $primary;
      }
    }

    .balance-bars {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .bar-item {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          color: #6b7280;

          @media (prefers-color-scheme: dark) {
            color: #9ca3af;
          }

          .bar-value {
            font-weight: 700;
            color: #111;

            @media (prefers-color-scheme: dark) {
              color: white;
            }
          }
        }

        .bar-track {
          width: 100%;
          height: 0.5rem;
          background: #e5e7eb;
          border-radius: 9999px;
          overflow: hidden;

          @media (prefers-color-scheme: dark) {
            background: rgba(255, 255, 255, 0.1);
          }

          .bar-fill {
            height: 100%;
            border-radius: 9999px;
          }
        }
      }
    }
  }
}

// FOOTER
.page-footer {
  border-top: 1px solid #e5e7eb;
  background: white;
  padding: 2rem;

  @media (prefers-color-scheme: dark) {
    background: $bg-dark;
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .footer-container {
    max-width: 112rem;
    margin: 0 auto;
    text-align: center;
  }

  .footer-text {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;

    @media (prefers-color-scheme: dark) {
      color: #6b7280;
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;

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

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

</style>
