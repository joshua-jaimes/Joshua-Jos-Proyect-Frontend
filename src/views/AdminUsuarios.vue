<template>
      <div class="main-area">

        <!-- Top Header -->
        <header class="top-header">
          <div>
            <div class="header-title">Gestión de Usuarios</div>
            <div class="header-sub">Panel de administración de cuentas y planes</div>
          </div>
          <div>
            <button @click="cerrarSesion" class="admin-action-btn eliminar"
              style="display:flex;align-items:center;gap:8px;background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:8px 16px;">
              <span class="mi" style="font-size:16px;">logout</span> Cerrar Sesión
            </button>
          </div>
        </header>

        <!-- Content -->
        <div class="content-scroll">
          <div class="tabla-card">

            <!-- Header tabla -->
            <div class="tabla-header">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:18px; font-weight:700; color:#fff;">Usuarios del Sistema</span>
                <span class="badge badge-purple" style="font-size:11px; padding:3px 10px;">{{ usuarios.length }} usuarios</span>
              </div>
              <div style="display:flex; gap:10px; align-items:center;">
                <!-- Buscador -->
                <div class="search-wrap">
                  <span class="mi" style="color:#64748b; font-size:18px; position:absolute; left:10px; top:50%; transform:translateY(-50%);">search</span>
                  <input v-model="busqueda" class="search-input" placeholder="Buscar por nombre o email..." />
                </div>
                <!-- Botón añadir -->
                <button class="btn-primary" @click="abrirModificar()">
                  <span class="mi" style="font-size:16px;">add</span>
                  Añadir Usuario
                </button>
              </div>
            </div>

            <!-- Loading -->
            <div v-if="cargando" style="padding:48px; text-align:center; color:#64748b;">
              <span class="spinner-table"></span>
              <div style="margin-top:12px;">Cargando usuarios...</div>
            </div>

            <!-- Tabla HTML pura -->
            <div v-else class="tabla-wrap">
              <table class="tabla">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th style="text-align:center;">Plan</th>
                    <th style="text-align:center;">Estado</th>
                    <th style="text-align:right;">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="usuariosFiltrados.length === 0">
                    <td colspan="6" style="text-align:center; color:#64748b; padding:32px;">
                      No hay usuarios registrados
                    </td>
                  </tr>
                  <tr v-for="usuario in usuariosPaginados" :key="usuario._id">
                    <td class="td-id">...{{ usuario._id ? usuario._id.substring(18) : '-' }}</td>
                    <td>
                      <div style="display:flex; align-items:center; gap:10px;">
                        <div class="user-avatar-mini">{{ usuario.nombre?.charAt(0)?.toUpperCase() || '?' }}</div>
                        <span style="font-weight:600; color:#fff;">{{ usuario.nombre }}</span>
                      </div>
                    </td>
                    <td style="color:#94a3b8;">{{ usuario.email }}</td>
                    <td style="text-align:center;">
                      <span class="badge" :class="usuario.estado === 1 ? 'badge-purple' : 'badge-yellow'">
                        {{ usuario.estado === 1 ? '★ Premium' : 'Gratuito' }}
                      </span>
                    </td>
                    <td style="text-align:center;">
                      <span class="badge" :class="usuario.activo !== false ? 'badge-green' : 'badge-red'">
                        <span class="badge-dot" :class="usuario.activo !== false ? 'badge-dot-green' : 'badge-dot-red'"></span>
                        {{ usuario.activo !== false ? 'Activo' : 'Inactivo' }}
                      </span>
                    </td>
                    <td>
                      <div style="display:flex; gap:6px; justify-content:flex-end;">
                        <!-- Editar -->
                        <button class="icon-btn btn-gold" @click="abrirModificar(usuario)" title="Editar">
                          <span class="mi" style="font-size:16px;">edit</span>
                        </button>
                        <!-- Toggle plan -->
                        <button class="icon-btn btn-purple" @click="togglePlan(usuario)" :title="usuario.estado === 1 ? 'Pasar a Gratuito' : 'Activar Premium'">
                          <span class="mi" style="font-size:16px;">{{ usuario.estado === 1 ? 'star_border' : 'star' }}</span>
                        </button>
                        <!-- Eliminar -->
                        <button class="icon-btn btn-red" @click="confirmarEliminar(usuario)" title="Eliminar">
                          <span class="mi" style="font-size:16px;">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> <!-- Cierra tabla-wrap -->
          </div> <!-- Cierra tabla-card -->

          <!-- 📄 Paginación -->
          <div class="q-mt-md flex flex-center q-pb-lg">
            <q-pagination
              v-model="paginaActual"
              :max="totalPaginas || 1"
              :max-pages="6"
              direction-links
              boundary-links
              color="primary"
            />
          </div>

        </div> <!-- Cierra content-scroll -->
      </div> <!-- Cierra main-area -->
    <!-- ══════════ MODAL CREAR / EDITAR (HTML puro) ══════════ -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="modalOpen = false">
      <div class="modal-box">
        <div class="modal-header">
          <div style="display:flex; align-items:center; gap:8px; font-size:16px; font-weight:700;">
            <span class="mi" style="color:#9c4ddb; font-size:20px;">{{ editMode ? 'edit' : 'person_add' }}</span>
            {{ editMode ? 'Editar Usuario' : 'Nuevo Usuario' }}
          </div>
          <button class="btn-close" @click="modalOpen = false">
            <span class="mi" style="font-size:20px;">close</span>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-grid">
            <div class="form-col-full">
              <label class="field-label">Nombre <span style="color:#ef4444;">*</span></label>
              <input v-model="formUser.nombre" class="sena-input" type="text" placeholder="Nombre completo"/>
            </div>

            <template v-if="!editMode">
              <div class="form-col">
                <label class="field-label">Email <span style="color:#ef4444;">*</span></label>
                <input v-model="formUser.email" class="sena-input" type="email" placeholder="correo@ejemplo.com"/>
              </div>
              <div class="form-col">
                <label class="field-label">Contraseña <span style="color:#ef4444;">*</span></label>
                <input v-model="formUser.password" class="sena-input" type="password" placeholder="Mínimo 8 caracteres"/>
              </div>
              <div class="form-col">
                <label class="field-label">Edad <span style="color:#ef4444;">*</span></label>
                <input v-model.number="formUser.edad" class="sena-input" type="number" min="1" placeholder="Ej: 25"/>
              </div>
              <div class="form-col">
                <label class="field-label">Fecha Nacimiento <span style="color:#ef4444;">*</span></label>
                <input v-model="formUser.fechanacimiento" class="sena-input" type="date"/>
              </div>
            </template>

            <template v-if="editMode">
              <div class="form-col-full">
                <div class="plan-box">
                  <label class="field-label" style="margin-bottom:12px; display:block;">Gestión de Plan</label>
                  <div style="display:flex; gap:10px;">
                    <button class="btn-plan" :class="formUser.estado === 1 ? 'btn-plan-active-green' : ''" @click="aplicarPlan(1)">
                      <span class="mi" style="font-size:16px;">star</span>
                      {{ loadingPlan === 1 ? 'Guardando...' : 'Premium' }}
                    </button>
                    <button class="btn-plan" :class="formUser.estado !== 1 ? 'btn-plan-active-yellow' : ''" @click="aplicarPlan(0)">
                      <span class="mi" style="font-size:16px;">radio_button_unchecked</span>
                      {{ loadingPlan === 0 ? 'Guardando...' : 'Gratuito' }}
                    </button>
                  </div>
                  <p style="color:#64748b; font-size:12px; margin-top:8px; text-align:center;">El cambio de plan se guarda inmediatamente.</p>
                </div>
              </div>
            </template>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:24px;">
            <button class="btn-cancel" @click="modalOpen = false">Cancelar</button>
            <button class="btn-primary" @click="guardarUsuario" :disabled="procesando">
              <span v-if="procesando" class="spinner"></span>
              <span v-else>{{ editMode ? 'Guardar Cambios' : 'Crear Usuario' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════ MODAL ELIMINAR (HTML puro) ══════════ -->
    <div v-if="modalEliminar" class="modal-overlay" @click.self="modalEliminar = false">
      <div class="modal-box" style="max-width:400px; border-color:rgba(239,68,68,0.3);">
        <div class="modal-body">
          <div style="display:flex; align-items:center; gap:16px; margin-bottom:20px;">
            <div style="width:48px;height:48px;border-radius:50%;background:rgba(239,68,68,0.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span class="mi" style="color:#ef4444; font-size:24px;">delete_forever</span>
            </div>
            <div>
              <div style="font-size:16px; font-weight:700;">¿Eliminar usuario?</div>
              <div style="color:#94a3b8; font-size:13px;">Esta acción no se puede deshacer</div>
            </div>
          </div>
          <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); border-radius:8px; padding:12px; margin-bottom:20px;">
            <div style="font-weight:600;">{{ usuarioAEliminar?.nombre }}</div>
            <div style="color:#94a3b8; font-size:13px;">{{ usuarioAEliminar?.email }}</div>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button class="btn-cancel" @click="modalEliminar = false">Cancelar</button>
            <button class="btn-danger" @click="ejecutarEliminar" :disabled="eliminando">
              <span v-if="eliminando" class="spinner"></span>
              <span v-else>Sí, eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth'
import axios from 'axios'
import { useNotify } from '../composables/useNotify'

const auth = useAuthStore()
const router = useRouter()
const { notifySuccess, notifyError } = useNotify()

// ── Estado principal ──────────────────────────────────────────
const usuarios     = ref([])
const cargando     = ref(false)
const busqueda     = ref('')

// ── Modal editar/crear ────────────────────────────────────────
const modalOpen  = ref(false)
const editMode   = ref(false)
const procesando = ref(false)
const loadingPlan = ref(null)

// ── Modal eliminar ────────────────────────────────────────────
const modalEliminar     = ref(false)
const usuarioAEliminar  = ref(null)
const eliminando        = ref(false)

// ── Formulario ────────────────────────────────────────────────
const formUser = ref({
  id: '', nombre: '', email: '', password: '',
  edad: 20, fechanacimiento: '2000-01-01', estado: 0
})
// ── Filtro búsqueda ───────────────────────────────────────────
const usuariosFiltrados = computed(() => {
  if (!busqueda.value.trim()) return usuarios.value
  const q = busqueda.value.toLowerCase()
  return usuarios.value.filter(u =>
    u.nombre?.toLowerCase().includes(q) ||
    u.email?.toLowerCase().includes(q)
  )
})

// ── Paginación ────────────────────────────────────────────────
const paginaActual = ref(1)
const usuariosPorPagina = 8

const totalPaginas = computed(() => {
  return Math.ceil(usuariosFiltrados.value.length / usuariosPorPagina) || 1
})

const usuariosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * usuariosPorPagina
  const fin = inicio + usuariosPorPagina
  return usuariosFiltrados.value.slice(inicio, fin)
})

watch(totalPaginas, (nuevoMax) => {
  console.log("=== DIAGNÓSTICO PAGINACIÓN ===")
  console.log("TOTAL PAGINAS:", nuevoMax)
  console.log("Pagina actual:", paginaActual.value)
  console.log("Total usuarios filtrados:", usuariosFiltrados.value.length)
}, { immediate: true })

// Volver a la página 1 cuando se realiza una búsqueda nueva
watch(busqueda, () => {
  paginaActual.value = 1
})





// ── Headers con token ─────────────────────────────────────────
const getHeaders = () => {
  const token = auth.token || ''
  return { headers: { 'x-token': token, 'Content-Type': 'application/json' } }
}

// ── CARGAR USUARIOS ───────────────────────────────────────────
const cargarUsuarios = async () => {
  try {
    cargando.value = true
    const res = await axios.get("https://joshua-jos-proyect-backend.onrender.com/api/usuario", getHeaders())
    console.log('✅ Respuesta API:', res.data)
    // Soporta { usuarios: [...] } o directamente [...]
    usuarios.value = res.data.usuarios ?? res.data ?? []
    console.log('👥 Total usuarios:', usuarios.value.length)
  } catch (err) {
    console.error('❌ Error cargando usuarios:', err.response?.status, err.response?.data)
    notifyError('Error cargando usuarios. Revisa la consola.')
  } finally {
    cargando.value = false
  }
}

// ── ABRIR MODAL ───────────────────────────────────────────────
const abrirModificar = (u = null) => {
  if (u) {
    editMode.value = true
    formUser.value = { id: u._id, nombre: u.nombre, email: u.email, estado: u.estado ?? 0 }
  } else {
    editMode.value = false
    formUser.value = { id: '', nombre: '', email: '', password: '', edad: 20, fechanacimiento: '2000-01-01', estado: 0 }
  }
  modalOpen.value = true
}

// ── GUARDAR (CREAR / EDITAR) ──────────────────────────────────
const guardarUsuario = async () => {
  if (!formUser.value.nombre?.trim()) { notifyError('El nombre es obligatorio'); return }

  if (!editMode.value) {
    if (!formUser.value.email?.trim())                          { notifyError('El email es obligatorio'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formUser.value.email)) { notifyError('Email inválido'); return }
    if (!formUser.value.password || formUser.value.password.length < 8) { notifyError('Contraseña mínimo 8 caracteres'); return }
    if (!formUser.value.edad || formUser.value.edad < 1)        { notifyError('Edad inválida'); return }
    if (!formUser.value.fechanacimiento)                        { notifyError('Fecha de nacimiento obligatoria'); return }
  }

  try {
    procesando.value = true
    if (editMode.value) {
      // PUT editar
      await axios.put(
        `https://joshua-jos-proyect-backend.onrender.com/api/usuario/${formUser.value.id}`,
        { nombre: formUser.value.nombre },
        getHeaders()
      )
      const idx = usuarios.value.findIndex(x => x._id === formUser.value.id)
      if (idx !== -1) usuarios.value[idx].nombre = formUser.value.nombre
      notifySuccess('Usuario editado correctamente')
    } else {
      // POST crear
      await axios.post('https://joshua-jos-proyect-backend.onrender.com/api/usuario', {
        nombre: formUser.value.nombre,
        email: formUser.value.email,
        password: formUser.value.password,
        edad: formUser.value.edad,
        fechanacimiento: formUser.value.fechanacimiento
      }, getHeaders())
      notifySuccess('Usuario creado exitosamente')
      await cargarUsuarios()
    }
    modalOpen.value = false
  } catch (err) {
    notifyError(err.response?.data?.error || err.response?.data?.msg || 'Error procesando usuario')
    console.error('❌ guardarUsuario:', err)
  } finally {
    procesando.value = false
  }
}

// ── CAMBIAR PLAN (desde modal) ────────────────────────────────
const aplicarPlan = async (nuevoEstado) => {
  if (!formUser.value.id) return
  loadingPlan.value = nuevoEstado
  try {
    const url = nuevoEstado === 1
      ? `https://joshua-jos-proyect-backend.onrender.com/api/usuario/activar/${formUser.value.id}`
      : `https://joshua-jos-proyect-backend.onrender.com/api/usuario/inactivar/${formUser.value.id}`
    await axios.put(url, {}, getHeaders())
    formUser.value.estado = nuevoEstado
    const idx = usuarios.value.findIndex(x => x._id === formUser.value.id)
    if (idx !== -1) usuarios.value[idx].estado = nuevoEstado
    notifySuccess(`Plan cambiado a ${nuevoEstado === 1 ? 'Premium' : 'Gratuito'}`)
  } catch (err) {
    notifyError('Error cambiando plan')
    console.error('❌ aplicarPlan:', err)
  } finally {
    loadingPlan.value = null
  }
}

// ── TOGGLE PLAN (desde tabla directamente) ────────────────────
const togglePlan = async (u) => {
  const nuevoEstado = u.estado === 1 ? 0 : 1
  try {
    const url = nuevoEstado === 1
      ? `https://joshua-jos-proyect-backend.onrender.com/api/usuario/activar/${u._id}`
      : `https://joshua-jos-proyect-backend.onrender.com/api/usuario/inactivar/${u._id}`
    await axios.put(url, {}, getHeaders())
    const idx = usuarios.value.findIndex(x => x._id === u._id)
    if (idx !== -1) usuarios.value[idx].estado = nuevoEstado
    notifySuccess(`Plan → ${nuevoEstado === 1 ? 'Premium' : 'Gratuito'}`)
  } catch (err) {
    notifyError('Error cambiando plan')
    console.error('❌ togglePlan:', err)
  }
}

// ── TOGGLE ESTADO ACTIVO/INACTIVO ─────────────────────────────
const toggleEstado = async (u) => {
  const nuevoActivo = u.activo === false ? true : false
  try {
    // Ajusta el endpoint según tu API
    await axios.put(
      `https://joshua-jos-proyect-backend.onrender.com/api/usuario/${u._id}`,
      { activo: nuevoActivo },
      getHeaders()
    )
    const idx = usuarios.value.findIndex(x => x._id === u._id)
    if (idx !== -1) usuarios.value[idx].activo = nuevoActivo
    notifySuccess(`Usuario ${nuevoActivo ? 'activado' : 'desactivado'}`)
  } catch (err) {
    notifyError('Error cambiando estado')
    console.error('❌ toggleEstado:', err)
  }
}

// ── ELIMINAR ──────────────────────────────────────────────────
const confirmarEliminar = (u) => {
  usuarioAEliminar.value = u
  modalEliminar.value = true
}

const ejecutarEliminar = async () => {
  if (!usuarioAEliminar.value) return
  try {
    eliminando.value = true
    await axios.delete(
      `https://joshua-jos-proyect-backend.onrender.com/api/usuario/${usuarioAEliminar.value._id}`,
      getHeaders()
    )
    usuarios.value = usuarios.value.filter(x => x._id !== usuarioAEliminar.value._id)
    notifySuccess('Usuario eliminado correctamente')
    modalEliminar.value = false
  } catch (err) {
    notifyError(err.response?.data?.msg || 'Error eliminando usuario')
    console.error('❌ ejecutarEliminar:', err)
  } finally {
    eliminando.value = false
  }
}

// ── CERRAR SESIÓN ─────────────────────────────────────────────
const cerrarSesion = () => {
  auth.logout()
  router.push({ name: 'loginUsuario' })
}

onMounted(() => {
  cargarUsuarios()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');

.mi {
  font-family: 'Material Icons Round';
  font-weight:normal; font-style:normal; font-size:20px;
  line-height:1; letter-spacing:normal; text-transform:none;
  display:inline-block; white-space:nowrap; -webkit-font-smoothing:antialiased;
}

:deep(.app-wrap) { font-family:'Manrope',sans-serif; background:#130c1a !important; color:#e2e8f0; }
:deep(.sidebar)  { background:#191022 !important; border-right:1px solid rgba(255,255,255,0.05) !important; }

.sidebar-logo { height:80px; display:flex; align-items:center; padding:0 32px; border-bottom:1px solid rgba(255,255,255,0.05); gap:12px; }
.logo-icon { width:32px; height:32px; border-radius:8px; background:linear-gradient(135deg,#7311d4,#4a0b8a); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:18px; box-shadow:0 0 15px rgba(115,17,212,0.5); flex-shrink:0; }
.logo-text { font-size:20px; font-weight:700; letter-spacing:-0.02em; color:#fff; }
.logo-text span { color:#7311d4; }

.sidebar-nav { flex:1; overflow-y:auto; padding:24px 16px; display:flex; flex-direction:column; gap:4px; }
.nav-section-label { font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.1em; padding:0 16px; margin-bottom:8px; margin-top:4px; }
.nav-item { display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:12px; text-decoration:none; font-size:14px; font-weight:500; color:#94a3b8; transition:all 0.2s; cursor:pointer; }
.nav-item:hover { background:rgba(255,255,255,0.05); color:#fff; }
.nav-item:hover .nav-icon { color:#7311d4; }
.nav-item.active { background:rgba(115,17,212,0.1); color:#fff; border:1px solid rgba(115,17,212,0.2); }
.nav-item.active .nav-icon { color:#7311d4 !important; }

.sidebar-user { padding:16px; border-top:1px solid rgba(255,255,255,0.05); }
.user-row { display:flex; align-items:center; gap:12px; padding:8px; border-radius:12px; cursor:pointer; transition:background 0.2s; }
.user-avatar-wrap { position:relative; flex-shrink:0; }
.user-avatar { width:40px; height:40px; border-radius:50%; border:2px solid rgba(255,255,255,0.1); object-fit:cover; display:block; }
.user-online { position:absolute; bottom:0; right:0; width:12px; height:12px; background:#22c55e; border-radius:50%; border:2px solid #191022; }
.user-name  { font-size:14px; font-weight:600; color:#fff; }
.user-email { font-size:12px; color:#64748b; }

.user-avatar-mini {
  width: 32px; height: 32px; border-radius: 50%;
  background: linear-gradient(135deg, #7311d4, #4a0b8a);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 13px; color: #fff; flex-shrink: 0;
}

.main-area { display:flex; flex-direction:column; height:100vh; overflow:hidden; }

.top-header { height:80px; background:rgba(25,16,34,0.8) !important; backdrop-filter:blur(12px); border-bottom:1px solid rgba(255,255,255,0.05) !important; display:flex; align-items:center; justify-content:space-between; padding:0 24px; position:sticky; top:0; z-index:10; flex-shrink:0; }
.header-title { font-size:20px; font-weight:700; color:#fff; }
.header-sub   { font-size:12px; color:#64748b; margin-top:2px; }

.content-scroll { flex:1; overflow-y:auto; padding:32px; /* display:flex; */ flex-direction:column; gap:32px; padding-bottom:80px; }

.badge { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:500; white-space:nowrap; }
.badge-green  { background:rgba(34,197,94,0.1);  color:#22c55e; }
.badge-yellow { background:rgba(234,179,8,0.1);  color:#eab308; }
.badge-red    { background:rgba(239,68,68,0.1);   color:#ef4444; }
.badge-purple { background:rgba(115,17,212,0.15); color:#a855f7; }
.badge-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.badge-dot-green { background:#22c55e; }
.badge-dot-red   { background:#ef4444; }

.admin-action-btn { padding:5px 12px; border-radius:6px; border:none; font-family:'Manrope',sans-serif; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s; }

.sena-input {
  width:100%; background:rgba(18,10,26,0.5); border:1px solid #322640; border-radius:8px;
  padding:10px 14px; color:#fff; font-family:inherit; font-size:14px; outline:none;
  transition:border-color .2s; box-sizing:border-box; margin-top:4px;
}
/* ── Tabla HTML ── */
.tabla-card { background:#1f1629; border:1px solid rgba(255,255,255,0.05); border-radius:12px; overflow:hidden; }
.tabla-header { padding:16px 20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; border-bottom:1px solid rgba(255,255,255,0.05); }
.tabla-wrap { overflow-x: auto; }
.tabla { width:100%; border-collapse:collapse; }
.tabla thead th { padding:12px 16px; text-align:left; font-size:11px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.08em; border-bottom:1px solid rgba(255,255,255,0.05); background:#1f1629; white-space:nowrap; }
.tabla tbody tr { border-bottom:1px solid rgba(255,255,255,0.04); transition:background 0.15s; }
.tabla tbody tr:hover { background:rgba(255,255,255,0.03); }
.tabla tbody td { padding:12px 16px; font-size:14px; color:#e2e8f0; }
.td-id { color:#64748b !important; font-family:monospace; font-size:12px; }

/* ── Buscador ── */
.search-wrap { position:relative; }
.search-input { background:rgba(18,10,26,0.5); border:1px solid #322640; border-radius:8px; padding:8px 12px 8px 36px; color:#fff; font-family:inherit; font-size:14px; outline:none; transition:border-color .2s; width:220px; }
.search-input:focus { border-color:#7311d4; }
.search-input::placeholder { color:#64748b; }

/* ── Botones ── */
.btn-primary { display:inline-flex; align-items:center; gap:6px; background:#7311d4; color:#fff; border:none; border-radius:8px; padding:9px 16px; font-family:inherit; font-size:13px; font-weight:600; cursor:pointer; transition:background .2s; white-space:nowrap; }
.btn-primary:hover { background:#8b21e8; }
.btn-primary:disabled { opacity:0.6; cursor:not-allowed; }
.btn-cancel { background:transparent; color:#94a3b8; border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:9px 16px; font-family:inherit; font-size:13px; font-weight:600; cursor:pointer; transition:all .2s; }
.btn-cancel:hover { border-color:#fff; color:#fff; }
.btn-danger { display:inline-flex; align-items:center; gap:6px; background:#ef4444; color:#fff; border:none; border-radius:8px; padding:9px 16px; font-family:inherit; font-size:13px; font-weight:600; cursor:pointer; }
.btn-danger:disabled { opacity:0.6; cursor:not-allowed; }

/* ── Icon buttons ── */
.icon-btn { width:32px; height:32px; border:none; border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:opacity .2s; }
.icon-btn:hover { opacity:0.8; }
.btn-gold   { background:rgba(212,175,55,0.12); color:#D4AF37; }
.btn-yellow { background:rgba(234,179,8,0.12);  color:#eab308; }
.btn-green  { background:rgba(34,197,94,0.12);  color:#22c55e; }
.btn-purple { background:rgba(168,85,247,0.12); color:#a855f7; }
.btn-red    { background:rgba(239,68,68,0.12);  color:#ef4444; }

/* ── Modal ── */
.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:1000; padding:16px; }
.modal-box { background:#1c1426; border:1px solid rgba(115,17,212,0.3); border-radius:16px; box-shadow:0 10px 40px rgba(0,0,0,0.5); width:100%; max-width:540px; max-height:90vh; overflow-y:auto; }
.modal-header { display:flex; align-items:center; justify-content:space-between; padding:20px 24px 0; }
.modal-body { padding:20px 24px 24px; }
.btn-close { background:transparent; border:none; color:#64748b; cursor:pointer; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:8px; transition:color .2s; }
.btn-close:hover { color:#fff; }

/* ── Form grid ── */
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.form-col-full { grid-column:1/-1; }

/* ── Plan box ── */
.plan-box { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:16px; }
.btn-plan { flex:1; display:flex; align-items:center; justify-content:center; gap:6px; background:transparent; border:1px solid rgba(255,255,255,0.15); color:#94a3b8; border-radius:8px; padding:10px; font-family:inherit; font-size:13px; font-weight:600; cursor:pointer; transition:all .2s; }
.btn-plan-active-green { background:rgba(34,197,94,0.15) !important; border-color:#22c55e !important; color:#22c55e !important; }
.btn-plan-active-yellow { background:rgba(234,179,8,0.15) !important; border-color:#eab308 !important; color:#eab308 !important; }

/* ── Spinner table loading ── */
.spinner-table { width:32px; height:32px; border:3px solid rgba(115,17,212,0.3); border-top-color:#7311d4; border-radius:50%; animation:spin 0.7s linear infinite; display:inline-block; }
@keyframes spin { to { transform:rotate(360deg); } }
</style>
