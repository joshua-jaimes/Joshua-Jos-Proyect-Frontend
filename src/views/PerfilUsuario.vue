<template>
  <q-layout view="hHh lpR fFf" class="profile-layout">

    <!-- ══════════ HEADER ══════════ -->
    <q-header class="profile-header" bordered>
      <div class="header-inner row items-center justify-between">

        <!-- Breadcrumb -->
        <div class="row items-center" style="gap:8px;font-size:14px">
          <a href="#" class="breadcrumb-link">Inicio</a>
          <span class="mso breadcrumb-chevron">chevron_right</span>
          <span class="breadcrumb-current">Perfil</span>
        </div>

        <!-- Right actions -->
        <div class="row items-center" style="gap:16px">

          <div class="header-divider" />
          <div class="row items-center user-header-row">
            <div class="text-right gt-xs" style="margin-right:12px">
              <p class="user-header-name">{{ auth.usuario?.nombre || 'Usuario' }}</p>
              <p class="user-header-tier">{{ rolLabel }}</p>
            </div>
            <div class="header-avatar-ring">
              <img :src="avatarUrl" class="header-avatar-img" alt=""/>
            </div>
          </div>
        </div>

      </div>
    </q-header>

    <!-- ══════════ PAGE ══════════ -->
    <q-page-container>
      <q-page class="profile-page">
        <div class="profile-content">

          <!-- ── Success Toast ── -->
          <transition name="fade-slide">
            <div v-if="showSuccess" class="success-toast row items-center">
              <div class="success-icon-wrap">
                <span class="mso" style="font-size:18px">check</span>
              </div>
              <div style="flex:1">
                <p class="success-title">Perfil actualizado correctamente</p>
                <p class="success-sub">Tus cambios se han guardado con éxito.</p>
              </div>
              <button class="success-close" @click="showSuccess=false">
                <span class="mso">close</span>
              </button>
            </div>
          </transition>

          <!-- ── Profile Hero ── -->
          <div class="hero-card">
            <div class="hero-glow" />
            <div class="hero-inner row items-center flex-wrap" style="gap:32px">

              <!-- Avatar -->
              <div style="position:relative;flex-shrink:0">
                <div class="hero-avatar-ring">
                  <img :src="avatarUrl" class="hero-avatar-img" alt=""/>
                </div>
                <button class="avatar-edit-btn" type="button">
                  <span class="mso" style="font-size:18px">edit</span>
                </button>
              </div>

              <!-- Info -->
              <div style="flex:1;min-width:200px;text-align:center" class="gt-xs-text-left">
                <div class="row items-center flex-wrap justify-center" style="gap:12px;margin-bottom:8px">
                  <h2 class="hero-name">{{ auth.usuario?.nombre || 'Usuario' }}</h2>
                  <span class="tier-badge">
                    <span class="mso tier-star">star</span>
                    {{ rolLabel }}
                  </span>
                </div>
                <div class="row flex-wrap justify-center" style="gap:8px 24px">
                  <div class="row items-center" style="gap:8px">
                    <span class="mso info-icon">mail</span>
                    <span class="info-text">{{ auth.usuario?.email || '-' }}</span>
                  </div>

                </div>
              </div>



            </div>
          </div>

          <!-- ── Stats Grid ── -->
          <div class="stats-grid">



            <!-- Readings -->
            <div class="stat-card group">
              <div class="row items-center justify-between" style="margin-bottom:16px">
                <div class="stat-icon-wrap icon-gold">
                  <span class="mso stat-icon" style="color:#d4af37">menu_book</span>
                </div>
                <span class="stat-label">Lecturas realizadas</span>
              </div>
              <div class="row items-baseline" style="gap:8px">
                <span class="stat-value">24</span>
                <span class="stat-green">+3 este mes</span>
              </div>
            </div>

            <!-- Last reading -->
            <div class="stat-card group">
              <div class="row items-center justify-between" style="margin-bottom:16px">
                <div class="stat-icon-wrap icon-indigo">
                  <span class="mso stat-icon" style="color:#818cf8">schedule</span>
                </div>
                <span class="stat-label">Última lectura</span>
              </div>
              <div>
                <span class="stat-value" style="font-size:18px">10 Marzo 2026</span>
                <p class="stat-reading-sub">Compatibilidad Astral</p>
              </div>
            </div>

          </div>

          <!-- ── Forms ── -->
          <div class="forms-grid">

            <!-- Left: Personal data + Avatar -->
            <div style="display:flex;flex-direction:column;gap:32px">

              <!-- Personal data -->
              <section class="form-card">
                <div class="section-header">
                  <span class="mso section-icon">badge</span>
                  <h3 class="section-title">Datos Personales</h3>
                </div>
                <div style="display:flex;flex-direction:column;gap:16px">
                  <div>
                    <label class="field-label">Editar Nombre</label>
                    <input v-model="displayName" class="sena-input" type="text"/>
                  </div>
                  <button class="btn-primary full-width" type="button" @click="saveProfile" :disabled="guardandoNombre">
                    <q-spinner v-if="guardandoNombre" size="sm" class="q-mr-sm" />
                    <span v-else class="mso btn-icon">save</span>
                    Guardar cambios
                  </button>
                </div>
              </section>

              <!-- Avatar -->
              <section class="form-card">
                <div class="section-header">
                  <span class="mso section-icon">image</span>
                  <h3 class="section-title">Foto de Perfil</h3>
                </div>
                <div class="row items-center" style="gap:24px">
                  <div class="avatar-small-ring">
                    <img :src="avatarUrl" class="avatar-small-img" alt=""/>
                  </div>
                  <div style="flex:1">
                    <p class="avatar-hint">Sube una nueva imagen para personalizar tu cuenta.</p>
                    <button class="btn-secondary" type="button" style="margin-top:12px;display:flex;align-items:center;gap:8px">
                      <span class="mso btn-icon">upload</span>
                      Cambiar avatar
                    </button>
                  </div>
                </div>
              </section>

            </div>

            <!-- Right: Change password -->
            <div>
              <section class="form-card" style="height:100%">
                <div class="section-header">
                  <span class="mso section-icon">lock</span>
                  <h3 class="section-title">Cambiar Contraseña</h3>
                </div>
                <div style="display:flex;flex-direction:column;gap:20px">

                  <div>
                    <label class="field-label">Contraseña Actual</label>
                    <input v-model="currentPass" class="sena-input" type="password" placeholder="••••••••"/>
                  </div>
                  <div>
                    <label class="field-label">Nueva Contraseña</label>
                    <input v-model="newPass" class="sena-input" type="password" placeholder="••••••••"/>
                  </div>
                  <div>
                    <label class="field-label">Confirmar Nueva Contraseña</label>
                    <input v-model="confirmPass" class="sena-input" type="password" placeholder="••••••••"/>
                  </div>

                  <div style="padding-top:8px">
                    <button class="btn-outline-primary full-width" type="button" @click="actualizarPassword" :disabled="cambiandoPass">
                      <q-spinner v-if="cambiandoPass" size="sm" class="q-mr-sm" />
                      <span v-else class="mso btn-icon">security</span>
                      Actualizar contraseña
                    </button>
                  </div>

                  <p class="password-hint">La contraseña debe tener al menos 8 caracteres e incluir un número y un símbolo.</p>

                </div>
              </section>
            </div>

          </div>

          <!-- ── Info extra (Rol / Estado) ── -->
          <div class="form-card">
            <div class="section-header">
              <span class="mso section-icon">manage_accounts</span>
              <h3 class="section-title">Información de Cuenta</h3>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              <div class="info-row">
                <span class="field-label">Nombre</span>
                <span class="info-val">{{ auth.usuario?.nombre || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="field-label">Email</span>
                <span class="info-val">{{ auth.usuario?.email || '-' }}</span>
              </div>
              <div class="info-row">
                <span class="field-label">Rol</span>
                <span class="info-val">{{ rolLabel }}</span>
              </div>
              <div class="info-row">
                <span class="field-label">Estado</span>
                <span :class="auth.usuario?.estado === 1 ? 'estado-active' : 'estado-inactive'">
                  {{ rolLabel }}
                </span>
              </div>
              <div class="info-row">
                <span class="field-label">Fecha de nacimiento</span>
                <span class="info-val">{{ auth.usuario?.fechanacimiento ? auth.usuario.fechanacimiento.split('T')[0] : '-' }}</span>
              </div>
            </div>
          </div>
          <div class="danger-zone row items-center justify-between flex-wrap" style="gap:24px">
            <div>
              <h4 class="danger-title">Sesión y Seguridad</h4>
              <p class="danger-sub">Si has terminado tu sesión mística, te recomendamos cerrar sesión por seguridad.</p>
            </div>
            <button class="btn-danger" type="button" @click="logout">
              <span class="mso btn-icon">logout</span>
              Cerrar sesión de la cuenta
            </button>
          </div>

        </div>

        <!-- ── Footer ── -->
        <footer class="profile-footer">
          <p class="footer-text">
            © 2026 Numerología Pro. Todos los derechos reservados.
            <span class="footer-dot">●</span>
            Diseñado con armonía espiritual.
          </p>
        </footer>

      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/Auth'
import { useRouter } from 'vue-router'
import { useNotify } from '../composables/useNotify'
import { putData } from '../services/apiCliente'

const auth   = useAuthStore()
const router = useRouter()
const { notifySuccess, notifyError, notifyWarning } = useNotify()

// ══ Computed del store ══════════════════════════════════════
const rolLabel = computed(() => {
  const rol = auth.usuario?.rol
  if (rol === 'admin' || rol === 'administrador') return 'Administrador'
  if (auth.usuario?.estado === 1) return 'Místico Pro'
  return 'Plan Gratuito'
})

const fechaRegistroFormateada = computed(() => {
  const f = auth.usuario?.createdAt || auth.usuario?.fechaRegistro
  if (!f) return 'Sin fecha'
  return new Date(f).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
})

// ══ Avatar ══════════════════════════════════════════════════
const avatarUrl = ref(
  auth.usuario?.avatar ||
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB7DU6N7AC7WFiiAyM2j9gEIESYXuswxwKG7cMf2Odhqb7vFFttLbH1PkdLc-MGbtdmGQ-N3e5VV3CL6R0Qm63XfwALGbmu4jMC_6qyFNc9BJv3BuU3nrZiH5gNJN36Q7r_umbbKUtf1-QPeRZytx9i_3QxiL8-1pAVSpibB3ZENu3hJi50Lha9g2ALoxKkvEyaGsXTJUmVLaS6GlN1t6NkvaLLXk58mT-_7OdtWvEz0IW2G-V4FmN3rJcJ4Ss-bPy6YxE9S0DuAnw'
)
const fileInputRef = ref(null)

function seleccionarAvatar() {
  fileInputRef.value?.click()
}

function onAvatarChange(event) {
  const file = event.target.files[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    notifyWarning('Solo se aceptan imágenes (jpg, png, webp...)')
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    avatarUrl.value = e.target.result
    // Guardamos el preview localmente (el modelo no tiene campo avatar en BD)
    if (auth.usuario) auth.usuario.avatar = e.target.result
    notifySuccess('Foto de perfil actualizada (sesión actual)')
  }
  reader.readAsDataURL(file)
}

// ══ Notificación de guardado de nombre ══════════════════════
const showSuccess = ref(false)
const displayName = ref(auth.usuario?.nombre || '')
const guardandoNombre = ref(false)

async function saveProfile() {
  if (!displayName.value.trim()) {
    notifyWarning('El nombre no puede estar vacío')
    return
  }
  try {
    guardandoNombre.value = true
    const id = auth.usuario?._id
    await putData(`/usuario/${id}`, { nombre: displayName.value.trim() })

    // Actualizar en el store local
    if (auth.usuario) auth.usuario.nombre = displayName.value.trim()

    showSuccess.value = true
    notifySuccess('Nombre actualizado correctamente ✨')
    setTimeout(() => { showSuccess.value = false }, 4000)
  } catch (e) {
    notifyError(e?.response?.data?.error || 'Error al guardar el nombre')
  } finally {
    guardandoNombre.value = false
  }
}

// ══ Cambiar contraseña ══════════════════════════════════════
const currentPass  = ref('')
const newPass      = ref('')
const confirmPass  = ref('')
const cambiandoPass = ref(false)

async function actualizarPassword() {
  // Validaciones frontend
  if (!currentPass.value || !newPass.value || !confirmPass.value) {
    notifyWarning('Todos los campos de contraseña son obligatorios')
    return
  }
  if (newPass.value.length < 8) {
    notifyWarning('La nueva contraseña debe tener al menos 8 caracteres')
    return
  }
  if (!/\d/.test(newPass.value)) {
    notifyWarning('La contraseña debe incluir al menos un número')
    return
  }
  if (!/[^a-zA-Z0-9]/.test(newPass.value)) {
    notifyWarning('La contraseña debe incluir al menos un símbolo (@, #, !, etc.)')
    return
  }
  if (newPass.value !== confirmPass.value) {
    notifyWarning('Las contraseñas nuevas no coinciden')
    return
  }

  try {
    cambiandoPass.value = true
    const id = auth.usuario?._id
    await putData(`/usuario/cambiar-password/${id}`, {
      passwordActual: currentPass.value,
      nuevaPassword: newPass.value
    })
    notifySuccess('Contraseña actualizada correctamente 🔐')
    currentPass.value = ''
    newPass.value = ''
    confirmPass.value = ''
  } catch (e) {
    notifyError(e?.response?.data?.error || 'Error al cambiar la contraseña')
  } finally {
    cambiandoPass.value = false
  }
}

// ══ Cerrar sesión ═══════════════════════════════════════════
function logout() {
  auth.logout()
  router.push({ name: 'loginUsuario' })
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

/* ─── Material Symbols ─── */
.mso {
  font-family: 'Material Symbols Outlined';
  font-weight: normal; font-style: normal; font-size: 20px;
  line-height: 1; letter-spacing: normal; text-transform: none;
  display: inline-block; white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* ─── Layout ─── */
:deep(.profile-layout) {
  font-family: 'Manrope', sans-serif;
  background: #120a1a !important;
  color: #e2e8f0;
}

/* ─── Header ─── */
:deep(.profile-header) {
  background: rgba(28,20,38,0.5) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #322640 !important;
  box-shadow: none !important;
  height: 64px;
}
.header-inner {
  padding: 0 32px;
  height: 64px;
  max-width: 100%;
}

/* Breadcrumb */
.breadcrumb-link { color: #94a3b8; text-decoration: none; transition: color .2s; font-size: 14px; }
.breadcrumb-link:hover { color: #7311d4; }
.breadcrumb-chevron { font-size: 16px !important; color: #475569; }
.breadcrumb-current { color: #fff; font-weight: 500; font-size: 14px; }

/* Notif */
.notif-btn {
  position: relative; background: none !important; border: none !important;
  color: #94a3b8; cursor: pointer; padding: 8px;
  display: flex; align-items: center; transition: color .2s;
}
.notif-btn:hover { color: #fff; }
.notif-dot {
  position: absolute; top: 8px; right: 8px;
  width: 8px; height: 8px; background: #7311d4;
  border-radius: 50%; border: 2px solid #1c1426;
}
.header-divider { height: 32px; width: 1px; background: #322640; }

/* User header */
.user-header-row { cursor: pointer; }
.user-header-name  { font-size: 12px; font-weight: 700; color: #fff; margin: 0; }
.user-header-tier  { font-size: 10px; color: #d4af37; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; margin: 0; }
.header-avatar-ring { width: 40px; height: 40px; border-radius: 50%; border: 2px solid rgba(115,17,212,0.3); padding: 2px; flex-shrink: 0; }
.header-avatar-img  { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }

/* ─── Page ─── */
:deep(.profile-page) {
  background: #120a1a !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.profile-content {
  flex: 1;
  max-width: 1152px;
  margin: 0 auto;
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ─── Success Toast ─── */
.success-toast {
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.2);
  border-radius: 12px;
  padding: 16px;
  gap: 16px;
}
.success-icon-wrap {
  width: 32px; height: 32px; border-radius: 50%;
  background: #10b981;
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
}
.success-title { font-size: 14px; font-weight: 700; color: #34d399; margin: 0; }
.success-sub   { font-size: 12px; color: rgba(52,211,153,0.7); margin: 0; }
.success-close { background: none; border: none; color: rgba(52,211,153,0.5); cursor: pointer; padding: 0; transition: color .2s; }
.success-close:hover { color: #34d399; }

.fade-slide-enter-active { transition: all .4s ease; }
.fade-slide-leave-active { transition: all .3s ease; }
.fade-slide-enter-from   { opacity: 0; transform: translateY(-16px); }
.fade-slide-leave-to     { opacity: 0; transform: translateY(-8px); }

/* ─── Hero Card ─── */
.hero-card {
  background: #1c1426;
  border: 1px solid #322640;
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
}
.hero-glow {
  position: absolute; top: 0; right: 0;
  width: 256px; height: 256px;
  background: rgba(115,17,212,0.05);
  border-radius: 50%;
  margin-right: -128px; margin-top: -128px;
  filter: blur(40px);
  pointer-events: none;
}
.hero-inner { position: relative; z-index: 1; }

.hero-avatar-ring {
  width: 128px; height: 128px; border-radius: 50%;
  border: 4px solid rgba(115,17,212,0.2);
  padding: 4px;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
}
.hero-avatar-img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }

.avatar-edit-btn {
  position: absolute; bottom: 0; right: 0;
  background: #7311d4 !important; color: #fff;
  border: 4px solid #1c1426 !important;
  border-radius: 50%; padding: 6px;
  cursor: pointer; transition: background .2s;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 12px rgba(115,17,212,0.4);
}
.avatar-edit-btn:hover { background: #9c4ce6 !important; }

.hero-name { font-size: 30px; font-weight: 800; color: #fff; margin: 0; }

.tier-badge {
  display: inline-flex; align-items: center;
  padding: 4px 12px; border-radius: 999px;
  background: rgba(212,175,55,0.1);
  color: #d4af37;
  font-size: 11px; font-weight: 700;
  border: 1px solid rgba(212,175,55,0.2);
  text-transform: uppercase; letter-spacing: 0.1em;
  box-shadow: 0 0 15px rgba(212,175,55,0.1);
  gap: 4px;
}
.tier-star { font-size: 14px !important; }

.info-icon { font-size: 16px !important; color: #7311d4; }
.info-text  { font-size: 14px; font-weight: 500; color: #94a3b8; }

/* ─── Buttons ─── */
.btn-primary {
  background: #7311d4 !important; color: #fff !important;
  border: none !important; border-radius: 8px !important;
  padding: 10px 24px; font-family: 'Manrope', sans-serif;
  font-size: 14px; font-weight: 700; cursor: pointer;
  transition: box-shadow .2s;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
}
.btn-primary:hover { box-shadow: 0 8px 24px rgba(115,17,212,0.3); }

.btn-secondary {
  background: #1c1426 !important; color: #fff !important;
  border: 1px solid #322640 !important; border-radius: 8px !important;
  padding: 10px 24px; font-family: 'Manrope', sans-serif;
  font-size: 14px; font-weight: 700; cursor: pointer;
  transition: background .2s;
}
.btn-secondary:hover { background: #322640 !important; }

.full-width { width: 100%; }

.btn-icon { font-size: 16px !important; }

/* ─── Stats Grid ─── */
.stats-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
}
@media (max-width: 640px) { .stats-grid { flex-direction: column; } }

.stat-card {
  background: #1c1426;
  border: 1px solid #322640;
  border-radius: 12px;
  padding: 24px;
  transition: border-color .2s;
}
.stat-card:hover { border-color: rgba(115,17,212,0.5); }

.stat-icon-wrap { padding: 12px; border-radius: 8px; transition: background .2s; }
.icon-purple    { background: rgba(115,17,212,0.1); }
.icon-gold      { background: rgba(212,175,55,0.1); }
.icon-indigo    { background: rgba(99,102,241,0.1); }
.stat-card:hover .icon-purple { background: rgba(115,17,212,0.2); }
.stat-card:hover .icon-gold   { background: rgba(212,175,55,0.2); }
.stat-card:hover .icon-indigo { background: rgba(99,102,241,0.2); }

.stat-icon  { font-size: 24px !important; color: #7311d4; }
.stat-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
.stat-value { font-size: 28px; font-weight: 700; color: #fff; }
.stat-denom { font-size: 14px; color: #64748b; }
.stat-green { font-size: 12px; font-weight: 700; color: #34d399; }
.stat-reading-sub { font-size: 12px; color: #64748b; margin: 4px 0 0; }

.prog-bg   { width: 100%; height: 8px; background: #322640; border-radius: 999px; overflow: hidden; }
.prog-fill { height: 100%; background: #7311d4; border-radius: 999px; box-shadow: 0 0 10px rgba(115,17,212,0.5); }

/* ─── Forms Grid ─── */
.forms-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
@media (max-width: 1024px) { .forms-grid { grid-template-columns: 1fr; } }

.form-card {
  background: #1c1426;
  border: 1px solid #322640;
  border-radius: 12px;
  padding: 24px;
}

.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.section-icon   { font-size: 20px !important; color: #7311d4; }
.section-title  { font-size: 18px; font-weight: 700; color: #fff; margin: 0; }

.field-label {
  display: block;
  font-size: 11px; font-weight: 700; color: #64748b;
  text-transform: uppercase; letter-spacing: 0.12em;
  margin-bottom: 8px; margin-left: 4px;
}

.sena-input {
  width: 100%;
  background: rgba(18,10,26,0.5) !important;
  border: 1px solid #322640;
  border-radius: 8px;
  padding: 12px 16px;
  color: #fff;
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  box-sizing: border-box;
  -webkit-appearance: none;
  appearance: none;
}
.sena-input::placeholder { color: #475569; }
.sena-input:focus {
  border-color: #7311d4 !important;
  box-shadow: 0 0 0 2px rgba(115,17,212,0.2) !important;
}

.avatar-small-ring { width: 80px; height: 80px; border-radius: 50%; border: 2px solid #322640; overflow: hidden; flex-shrink: 0; }
.avatar-small-img  { width: 100%; height: 100%; object-fit: cover; display: block; }
.avatar-hint       { font-size: 14px; color: #64748b; margin: 0; }

.btn-outline-primary {
  background: rgba(115,17,212,0.2) !important;
  border: 1px solid rgba(115,17,212,0.4) !important;
  color: #7311d4 !important;
  border-radius: 8px !important;
  padding: 12px 24px;
  font-family: 'Manrope', sans-serif;
  font-size: 14px; font-weight: 700; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  transition: all .2s; width: 100%;
}
.btn-outline-primary:hover {
  background: #7311d4 !important;
  color: #fff !important;
}

.password-hint { font-size: 11px; color: #475569; font-style: italic; text-align: center; margin: 0; }

/* ─── Danger Zone ─── */
.danger-zone {
  background: rgba(239,68,68,0.05);
  border: 1px solid rgba(239,68,68,0.1);
  border-radius: 16px;
  padding: 32px;
}
.danger-title { font-size: 16px; font-weight: 700; color: #f87171; margin: 0 0 4px; }
.danger-sub   { font-size: 14px; color: #64748b; margin: 0; }

.btn-danger {
  background: rgba(239,68,68,0.1) !important;
  border: 1px solid rgba(239,68,68,0.2) !important;
  color: #f87171 !important;
  border-radius: 12px !important;
  padding: 12px 32px;
  font-family: 'Manrope', sans-serif;
  font-size: 14px; font-weight: 700; cursor: pointer;
  display: inline-flex; align-items: center; gap: 12px;
  transition: all .2s; white-space: nowrap;
}
.btn-danger:hover { background: #ef4444 !important; color: #fff !important; }

/* ─── Footer ─── */
.profile-footer {
  margin-top: auto;
  padding: 32px 24px;
  border-top: 1px solid #322640;
  background: rgba(28,20,38,0.3);
  text-align: center;
}
.footer-text { font-size: 12px; color: #475569; margin: 0; }
.footer-dot  { color: #7311d4; margin: 0 8px; }

/* ─── Info de cuenta ─── */
.info-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.info-val { font-size: 14px; font-weight: 600; color: #e2e8f0; }
.estado-active {
  font-size: 12px; font-weight: 700; color: #34d399;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.2);
  padding: 3px 10px; border-radius: 999px;
}
.estado-inactive {
  font-size: 12px; font-weight: 700; color: #94a3b8;
  background: rgba(148,163,184,0.1);
  border: 1px solid rgba(148,163,184,0.2);
  padding: 3px 10px; border-radius: 999px;
}
</style>