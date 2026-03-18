<template>
  <q-layout view="lHh lpR fFf" class="app-wrap">

    <!-- ══════════ SIDEBAR ══════════ -->
    <q-drawer :model-value="true" :width="256" :breakpoint="768" side="left" class="sidebar" persistent>
      <div class="sidebar-logo">
        <div class="logo-icon">N</div>
        <span class="logo-text">Numera<span>AI</span></span>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-label">Principal</div>
        <router-link :to="{ name: 'adminpanel' }" class="nav-item active">
          <span class="mi nav-icon">dashboard</span>
          Panel de Control
        </router-link>
        
        <router-link to="/admin-usuarios" class="nav-item">
          <span class="mi nav-icon">manage_accounts</span>
          Pagos y Gestión de Usuarios
        </router-link>
        <div class="nav-section-label">Configuración</div>
        
        
      </nav>

      <div class="sidebar-user">
        <div class="user-row">
          <div class="user-avatar-wrap">
            <img class="user-avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc2t8RIA4Yt_l6AH0ZpVoAvuIc6kWHHKVBhyw9ljvSz1E4mScc-mJgcO4vHh39BY4GkVBfpyJsFBk4k7Y35oxyEuj_6SMEJpBf7aQnXgIaH18EXR-sJGy0MG1LJaRf6HAYc_gGCxs8C1aZIUUa2L2AeetdydM2QLY6P55cnvIgc9wqZT39EQqXMbKTUUt56BxNHjYtsmOK0fa_d0UwL9IND03jmUvcf6DaO81FmH5xrA6m2h8SozovWP6gut-Cbuz2yjG7Lq169VI" alt="Admin"/>
            <div class="user-online"></div>
          </div>
          <div>
            <div class="user-name">Admin Principal</div>
            <div class="user-email">admin@numera.ai</div>
          </div>
        </div>
      </div>
    </q-drawer>

    <!-- ══════════ MAIN ══════════ -->
    <q-page-container>
      <div class="main-area">

        <!-- Top Header -->
        <header class="top-header">
          <div>
            <div class="header-title">Vista General</div>
            <div class="header-sub">Bienvenido de nuevo, Admin</div>
          </div>
          <div>
            <button @click="cerrarSesion" class="admin-action-btn eliminar" style="display:flex;align-items:center;gap:8px;background:rgba(239, 68, 68, 0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:8px 16px;">
              <span class="mi" style="font-size:16px;">logout</span> Cerrar Sesión
            </button>
          </div>
        </header>
        <!-- Scrollable content -->
        <div class="content-scroll">

          <!-- KPI CARDS -->
          <div class="kpi-grid">
            <div class="kpi-card" v-for="kpi in kpiCards" :key="kpi.label">
              <div class="kpi-bubble" :style="{background: kpi.bubbleColor}"></div>
              <div style="position:relative;z-index:1">
                <div class="kpi-top">
                  <div>
                    <div class="kpi-label">{{ kpi.label }}</div>
                    <div class="kpi-value">{{ kpi.value }}</div>
                  </div>
                  <div class="kpi-icon-wrap" :style="{background: kpi.iconBg}">
                    <span class="mi" :style="{color: kpi.iconColor, fontSize:'20px'}">{{ kpi.icon }}</span>
                  </div>
                </div>
                <template v-if="kpi.progress !== undefined">
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" :style="{width: kpi.progress+'%'}"></div>
                  </div>
                  <div style="font-size:11px;color:#64748b">{{ kpi.progressText }}</div>
                </template>
                <template v-else>
                  <div class="kpi-bottom">
                    <span :class="kpi.trendClass">
                      <span class="mi" style="font-size:16px">{{ kpi.trendIcon }}</span>
                      {{ kpi.trendVal }}
                    </span>
                    <span class="kpi-sub">{{ kpi.trendLabel }}</span>
                  </div>
                </template>
              </div>
            </div>
          </div>



          <!-- ══ GRÁFICO DE ESTADÍSTICAS ══ -->
          <div class="panel panel-pad" style="margin-bottom:0">
            <div class="panel-header">
              <div>
                <div class="panel-title">Estadísticas del Sistema</div>
                <div class="panel-sub">Datos en tiempo real desde la base de datos</div>
              </div>
            </div>
            <!-- Gráfico de barras con SVG puro (sin librerías) -->
            <div class="chart-bars-wrap">
              <template v-for="(bar, i) in chartBars" :key="bar.label">
                <div class="chart-bar-col">
                  <div class="chart-bar-value">{{ bar.value }}</div>
                  <div class="chart-bar-track">
                    <div
                      class="chart-bar-fill"
                      :style="{ height: bar.pct + '%', background: bar.color }"
                    ></div>
                  </div>
                  <div class="chart-bar-label">{{ bar.label }}</div>
                </div>
              </template>
            </div>
          </div>

          <!-- TABLA DE USUARIOS -->
          <div class="table-panel">
            <div class="table-header">
              <div class="table-title">Gestión de Usuarios</div>
              <span style="font-size:13px;color:#64748b">Mostrando: {{ usuariosFiltrados.length }} / {{ usuarios.length }}</span>
            </div>
            <!-- Barra de búsqueda -->
            <div style="padding:0 24px 16px">
              <div style="position:relative">
                <span class="mi" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#64748b;font-size:18px;pointer-events:none">search</span>
                <input
                  v-model="busqueda"
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  style="width:100%;padding:8px 16px 8px 40px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#e2e8f0;font-family:'Manrope',sans-serif;font-size:14px;outline:none;box-sizing:border-box"
                />
              </div>
            </div>
            <div style="overflow-x:auto">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th><th>Email</th><th>Fecha Registro</th>
                    <th>Rol</th><th>Estado</th><th style="text-align:right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="cargandoUsuarios">
                    <td colspan="6" style="text-align:center;color:#64748b">Cargando...</td>
                  </tr>
                  <tr v-else-if="usuariosFiltrados.length === 0">
                    <td colspan="6" style="text-align:center;color:#64748b">No se encontraron usuarios.</td>
                  </tr>
                  <tr v-for="u in usuariosFiltrados" :key="u._id">
                    <td><div class="u-name">{{ u.nombre }}</div></td>
                    <td><div class="u-email">{{ u.email }}</div></td>
                    <td class="t-date">{{ u.fechanacimiento ? new Date(u.fechanacimiento).toLocaleDateString('es-CO') : '-' }}</td>
                    <td>
                      <span class="badge" :class="u.rol === 'admin' ? 'badge-purple' : 'badge-yellow'">
                        {{ u.rol || 'usuario' }}
                      </span>
                    </td>
                    <td>
                      <span class="badge" :class="u.estado === 1 ? 'badge-green' : 'badge-red'">
                        <span class="badge-dot" :class="u.estado === 1 ? 'badge-dot-green' : 'badge-dot-red'"></span>
                        {{ u.estado === 1 ? 'Activo' : 'Inactivo' }}
                      </span>
                    </td>
                    <td style="text-align:right">
                      <div style="display:flex;gap:8px;justify-content:flex-end">
                        <button class="admin-action-btn activar" v-if="u.estado !== 1" @click="activarUsuario(u._id)">Activar</button>
                        <button class="admin-action-btn inactivar" v-else @click="inactivarUsuario(u._id)">Desactivar</button>
                        <button class="admin-action-btn eliminar" @click="eliminarUsuario(u._id, u.nombre)">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ══ SECCIÓN: Distribución de Usuarios ══ -->
          <div class="ap-section-grid">

            <!-- Card: Distribución premium vs gratuito -->
            <div class="ap-card">
              <div class="ap-card-header">
                <div>
                  <div class="ap-card-title">Distribución de Usuarios</div>
                  <div class="ap-card-sub">Premium vs Plan Gratuito</div>
                </div>
                <span class="mi ap-card-icon" style="color:#7311d4">pie_chart</span>
              </div>
              <!-- Gráfico Donut SVG puro -->
              <div class="donut-wrap">
                <svg viewBox="0 0 120 120" class="donut-svg">
                  <!-- Track -->
                  <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="18"/>
                  <!-- Activos (verde) -->
                  <circle
                    cx="60" cy="60" r="46" fill="none"
                    stroke="#22c55e" stroke-width="18"
                    stroke-dasharray="289" stroke-dashoffset="0"
                    :stroke-dasharray="`${donutActivos} 289`"
                    transform="rotate(-90 60 60)"
                    stroke-linecap="round"
                  />
                  <!-- Inactivos (rojo) -->
                  <circle
                    cx="60" cy="60" r="46" fill="none"
                    stroke="#ef4444" stroke-width="18"
                    :stroke-dasharray="`${donutInactivos} 289`"
                    :stroke-dashoffset="`${-(donutActivos)}`"
                    transform="rotate(-90 60 60)"
                    stroke-linecap="round"
                  />
                  <text x="60" y="55" text-anchor="middle" fill="#fff" font-size="18" font-weight="700" font-family="Manrope,sans-serif">{{ usuarios.length }}</text>
                  <text x="60" y="71" text-anchor="middle" fill="#64748b" font-size="9" font-family="Manrope,sans-serif">usuarios</text>
                </svg>
                <div class="donut-legend">
                  <div class="donut-item">
                    <span class="donut-dot" style="background:#22c55e"></span>
                    <span>Premium / Activos: <strong>{{ usuarios.filter(u => u.estado === 1).length }}</strong></span>
                  </div>
                  <div class="donut-item">
                    <span class="donut-dot" style="background:#ef4444"></span>
                    <span>Gratuito / Inactivos: <strong>{{ usuarios.filter(u => u.estado !== 1).length }}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card: Distribución lecturas por tipo -->
            <div class="ap-card">
              <div class="ap-card-header">
                <div>
                  <div class="ap-card-title">Lecturas por Tipo</div>
                  <div class="ap-card-sub">Diarias vs Principales</div>
                </div>
                <span class="mi ap-card-icon" style="color:#D4AF37">auto_stories</span>
              </div>
              <div class="tipo-bars">
                <div class="tipo-row" v-for="tipo in tiposLectura" :key="tipo.label">
                  <div class="tipo-label-row">
                    <span class="tipo-dot" :style="{background: tipo.color}"></span>
                    <span class="tipo-label">{{ tipo.label }}</span>
                    <span class="tipo-val">{{ tipo.count }}</span>
                  </div>
                  <div class="tipo-track">
                    <div class="tipo-fill" :style="{ width: tipo.pct + '%', background: tipo.color }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card: Estado del Sistema -->
            <div class="ap-card">
              <div class="ap-card-header">
                <div>
                  <div class="ap-card-title">Estado del Sistema</div>
                  <div class="ap-card-sub">Indicadores en tiempo real</div>
                </div>
                <span class="mi ap-card-icon" style="color:#22c55e">monitor_heart</span>
              </div>
              <div class="status-list">
                <div class="status-row" v-for="s in estadoSistema" :key="s.label">
                  <div class="status-left">
                    <span class="status-dot" :style="{background: s.color}"></span>
                    <span class="status-label">{{ s.label }}</span>
                  </div>
                  <span class="status-badge" :style="{color: s.color, borderColor: s.color + '40', background: s.color + '15'}">
                    {{ s.estado }}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <!-- ══ TABLA DE LECTURAS ══ -->
          <div class="table-panel">
            <div class="table-header">
              <div class="table-title">Lecturas Generadas</div>
              <span style="font-size:13px;color:#64748b">Total: {{ lecturas.length }}</span>
            </div>
            <div style="overflow-x:auto">
              <table>
                <thead>
                  <tr>
                    <th>Usuario ID</th><th>Tipo</th><th>Fecha</th><th>Contenido (resumen)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="cargandoLecturas">
                    <td colspan="4" style="text-align:center;color:#64748b">Cargando...</td>
                  </tr>
                  <tr v-for="l in lecturas" :key="l._id">
                    <td class="u-email">{{ l.usuario_id }}</td>
                    <td>
                      <span class="badge" :class="l.tipo === 'diaria' ? 'badge-green' : 'badge-yellow'">
                        {{ l.tipo }}
                      </span>
                    </td>
                    <td class="t-date">{{ l.dia || (l.createdAt ? new Date(l.createdAt).toLocaleDateString('es-CO') : '-') }}</td>
                    <td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#94a3b8">{{ l.contenido?.substring(0,100) }}...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { getData, deleteData, putData } from '../services/apiCliente'
import { useAuthStore } from '../stores/Auth'
import { useNotify } from '../composables/useNotify'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const { notifySuccess, notifyError, notifyWarning } = useNotify()

const cerrarSesion = () => {
  auth.logout()
  localStorage.removeItem("token")
  router.push({ name: 'loginUsuario' })
}

// ═══ Estado de datos ═══
const usuarios = ref([])
const lecturas = ref([])
const cargandoUsuarios = ref(false)
const cargandoLecturas = ref(false)

// ═══ KPIs dinámicos ═══
const totalUsuarios = computed(() => usuarios.value.length)
const lecturasHoy = computed(() => {
  const hoy = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' })
  return lecturas.value.filter(l => l.dia === hoy).length
})

// ═══ Búsqueda de usuarios ═══
const busqueda = ref('')
const usuariosFiltrados = computed(() => {
  const q = busqueda.value.toLowerCase().trim()
  if (!q) return usuarios.value
  return usuarios.value.filter(u =>
    u.nombre?.toLowerCase().includes(q) ||
    u.email?.toLowerCase().includes(q)
  )
})

// ═══ Cargar usuarios ═══
const cargarUsuarios = async () => {
  try {
    cargandoUsuarios.value = true
    const data = await getData('/usuario')
    usuarios.value = data.usuarios || data || []
  } catch (e) {
    console.error('Error cargando usuarios:', e.message)
  } finally {
    cargandoUsuarios.value = false
  }
}

// ═══ Cargar lecturas ═══
const cargarLecturas = async () => {
  try {
    cargandoLecturas.value = true
    const data = await getData('/lecturas')
    lecturas.value = data.lecturas || data || []
  } catch (e) {
    console.error('Error cargando lecturas:', e.message)
  } finally {
    cargandoLecturas.value = false
  }
}

// ═══ Eliminar usuario ═══
const eliminarUsuario = async (id, nombre) => {
  if (!confirm(`¿Eliminar a "${nombre}"? Esta acción no se puede deshacer.`)) return
  try {
    await deleteData(`/usuario/${id}`)
    usuarios.value = usuarios.value.filter(u => u._id !== id)
    notifySuccess(`Usuario "${nombre}" eliminado correctamente.`, 'delete')
  } catch (e) {
    notifyError('Error al eliminar: ' + (e.response?.data?.msg || e.message), 'error_outline')
  }
}

// ═══ Activar/Desactivar usuario ═══
const activarUsuario = async (id) => {
  try {
    await putData(`/usuario/activar/${id}`, {})
    const u = usuarios.value.find(u => u._id === id)
    if (u) u.estado = 1
    notifySuccess('Usuario activado correctamente.', 'check_circle')
  } catch (e) {
    notifyError('Error al activar: ' + (e.response?.data?.msg || e.message), 'error_outline')
  }
}

const inactivarUsuario = async (id) => {
  try {
    await putData(`/usuario/inactivar/${id}`, {})
    const u = usuarios.value.find(u => u._id === id)
    if (u) u.estado = 0
    notifyWarning('Usuario desactivado.', 'pause_circle')
  } catch (e) {
    notifyError('Error al desactivar: ' + (e.response?.data?.msg || e.message), 'error_outline')
  }
}

// ═══ Datos estáticos del gráfico (sin cambios) ═══
const bars = [
  { label: '01 Nov', outer: 30, inner: 60 },
  { label: '05 Nov', outer: 45, inner: 70 },
  { label: '10 Nov', outer: 60, inner: 50 },
  { label: '15 Nov', outer: 55, inner: 80 },
  { label: '20 Nov', outer: 80, inner: 75 },
  { label: '25 Nov', outer: 70, inner: 65 },
  { label: '30 Nov', outer: 90, inner: 85 },
]

const kpiCards = computed(() => [
  { label:'Usuarios Registrados', value: totalUsuarios.value, icon:'person_outline', iconColor:'#3b82f6', iconBg:'rgba(59,130,246,0.1)', bubbleColor:'rgba(59,130,246,0.1)', trendClass:'up', trendIcon:'arrow_upward', trendVal:'Real', trendLabel:'desde la BD' },
  { label:'Lecturas Generadas Hoy', value: lecturasHoy.value, icon:'psychology', iconColor:'#7311d4', iconBg:'rgba(168,85,247,0.1)', bubbleColor:'rgba(115,17,212,0.1)', trendClass:'up', trendIcon:'auto_awesome', trendVal:'Hoy', trendLabel:'lecturas del día' },
  { label:'Lecturas IA Totales', value: lecturas.value.length, icon:'smart_toy', iconColor:'#22c55e', iconBg:'rgba(34,197,94,0.1)', bubbleColor:'rgba(34,197,94,0.1)', trendClass:'up', trendIcon:'arrow_upward', trendVal:'Total', trendLabel:'todas las lecturas' },
  { label:'Usuarios Activos', value: usuarios.value.filter(u => u.estado === 1).length, icon:'verified_user', iconColor:'#D4AF37', iconBg:'rgba(212,175,55,0.1)', bubbleColor:'rgba(212,175,55,0.1)', trendClass:'up', trendIcon:'check_circle', trendVal:'Estado=1', trendLabel:'activos en el sistema' },
])

// ═══ Gráfico de barras dinámico (datos reales de la BD) ═══
const chartBars = computed(() => {
  const vals = [
    { label: 'Usuarios',    value: totalUsuarios.value,                              color: '#3b82f6' },
    { label: 'Lecturas Hoy', value: lecturasHoy.value,                               color: '#7311d4' },
    { label: 'IA Totales',  value: lecturas.value.length,                            color: '#22c55e' },
    { label: 'Activos',     value: usuarios.value.filter(u => u.estado === 1).length, color: '#D4AF37' },
  ]
  const max = Math.max(...vals.map(v => v.value), 1) // evitar div/0
  return vals.map(v => ({ ...v, pct: Math.round((v.value / max) * 100) }))
})

// ═══ Nuevas computed para cards visuales ═══
// Donut: circunferencia = 2*PI*r = 2*3.14*46 ≈ 289
const CIRC = 289
const donutActivos = computed(() => {
  if (!usuarios.value.length) return 0
  return Math.round((usuarios.value.filter(u => u.estado === 1).length / usuarios.value.length) * CIRC)
})
const donutInactivos = computed(() => CIRC - donutActivos.value)

const tiposLectura = computed(() => {
  const diarias    = lecturas.value.filter(l => l.tipo === 'diaria').length
  const principales = lecturas.value.filter(l => l.tipo === 'principal').length
  const otros      = lecturas.value.filter(l => l.tipo !== 'diaria' && l.tipo !== 'principal').length
  const max        = Math.max(diarias, principales, otros, 1)
  return [
    { label: 'Diarias',    count: diarias,    color: '#D4AF37', pct: Math.round(diarias / max * 100) },
    { label: 'Principales', count: principales, color: '#7311d4', pct: Math.round(principales / max * 100) },
    { label: 'Otros',      count: otros,      color: '#3b82f6', pct: Math.round(otros / max * 100) },
  ]
})

const estadoSistema = computed(() => [
  { label: 'API Backend',       estado: 'En línea',   color: '#22c55e' },
  { label: 'Base de Datos',     estado: usuarios.value.length > 0 ? 'Conectada' : 'Sin datos', color: usuarios.value.length > 0 ? '#22c55e' : '#f59e0b' },
  { label: 'Generador IA',      estado: lecturas.value.length > 0 ? 'Activo' : 'Sin lecturas', color: lecturas.value.length > 0 ? '#22c55e' : '#f59e0b' },
  { label: 'Usuarios Activos',  estado: `${usuarios.value.filter(u => u.estado === 1).length} / ${usuarios.value.length}`, color: '#3b82f6' },
  { label: 'Lecturas Hoy',      estado: String(lecturasHoy.value), color: '#D4AF37' },
])

onMounted(() => {
  cargarUsuarios()
  cargarLecturas()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');

::-webkit-scrollbar { width:6px; height:6px; }
::-webkit-scrollbar-track { background:#130c1a; }
::-webkit-scrollbar-thumb { background:#332640; border-radius:4px; }
::-webkit-scrollbar-thumb:hover { background:#7311d4; }

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
.nav-divider { border:none; border-top:1px solid rgba(255,255,255,0.05); margin:20px 0; }
.nav-item { display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:12px; text-decoration:none; font-size:14px; font-weight:500; color:#94a3b8; transition:all 0.2s; cursor:pointer; }
.nav-item:hover { background:rgba(255,255,255,0.05); color:#fff; }
.nav-item:hover .nav-icon { color:#7311d4; }
.nav-item.active { background:rgba(115,17,212,0.1); color:#fff; border:1px solid rgba(115,17,212,0.2); }
.nav-item.active .nav-icon { color:#7311d4 !important; }
.nav-badge { margin-left:auto; background:rgba(115,17,212,0.2); color:#7311d4; font-size:11px; font-weight:700; padding:2px 8px; border-radius:999px; }

.sidebar-user { padding:16px; border-top:1px solid rgba(255,255,255,0.05); }
.user-row { display:flex; align-items:center; gap:12px; padding:8px; border-radius:12px; cursor:pointer; transition:background 0.2s; }
.user-row:hover { background:rgba(255,255,255,0.05); }
.user-avatar-wrap { position:relative; flex-shrink:0; }
.user-avatar { width:40px; height:40px; border-radius:50%; border:2px solid rgba(255,255,255,0.1); object-fit:cover; display:block; }
.user-online { position:absolute; bottom:0; right:0; width:12px; height:12px; background:#22c55e; border-radius:50%; border:2px solid #191022; }
.user-name  { font-size:14px; font-weight:600; color:#fff; }
.user-email { font-size:12px; color:#64748b; }

.main-area { display:flex; flex-direction:column; height:100vh; overflow:hidden; }

.top-header { height:80px; background:rgba(25,16,34,0.8) !important; backdrop-filter:blur(12px); border-bottom:1px solid rgba(255,255,255,0.05) !important; display:flex; align-items:center; justify-content:space-between; padding:0 24px; position:sticky; top:0; z-index:10; flex-shrink:0; }
.header-title { font-size:20px; font-weight:700; color:#fff; }
.header-sub   { font-size:12px; color:#64748b; margin-top:2px; }
.header-right { display:flex; align-items:center; gap:16px; }

.search-wrap { position:relative; }
.search-icon { position:absolute; left:12px; top:50%; transform:translateY(-50%); color:#64748b; font-size:18px !important; pointer-events:none; }
.search-input { padding:8px 16px 8px 40px; background:rgba(255,255,255,0.05) !important; border:none !important; border-radius:8px; font-family:'Manrope',sans-serif; font-size:14px; color:#e2e8f0; outline:none; width:256px; }
.search-input::placeholder { color:#64748b; }
.search-input:focus { box-shadow:0 0 0 2px rgba(115,17,212,0.5) !important; }

.icon-btn { position:relative; padding:8px; border-radius:8px; background:none !important; border:none !important; color:#94a3b8; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
.icon-btn:hover { background:rgba(255,255,255,0.05) !important; color:#7311d4; }
.notif-dot { position:absolute; top:8px; right:8px; width:8px; height:8px; background:#ef4444; border-radius:50%; animation:pulse 1.5s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

.content-scroll { flex:1; overflow-y:auto; padding:32px; display:flex; flex-direction:column; gap:32px; padding-bottom:80px; }

.kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:24px; }
@media(max-width:1024px){.kpi-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.kpi-grid{grid-template-columns:1fr}}

.kpi-card { background:#1f1629 !important; border:1px solid rgba(255,255,255,0.05) !important; border-radius:12px; padding:24px; position:relative; overflow:hidden; }
.kpi-bubble { position:absolute; right:-24px; top:-24px; width:96px; height:96px; border-radius:50%; transition:all 0.5s; }
.kpi-card:hover .kpi-bubble { transform:scale(1.2); }
.kpi-label { font-size:11px; font-weight:600; color:#64748b; text-transform:uppercase; letter-spacing:0.08em; }
.kpi-value { font-size:24px; font-weight:700; color:#fff; margin-top:4px; }
.kpi-icon-wrap { padding:8px; border-radius:8px; display:flex; align-items:center; justify-content:center; }
.kpi-top  { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
.kpi-bottom { display:flex; align-items:center; gap:8px; font-size:14px; }
.up   { color:#22c55e; font-weight:500; display:flex; align-items:center; }
.down { color:#ef4444; font-weight:500; display:flex; align-items:center; }
.kpi-sub { color:#64748b; }
.progress-bar-bg   { width:100%; background:rgba(255,255,255,0.1); border-radius:999px; height:6px; margin:8px 0; overflow:hidden; }
.progress-bar-fill { height:6px; border-radius:999px; background:linear-gradient(90deg,#7311d4,#a855f7); }

.chart-grid { display:grid; grid-template-columns:1fr 340px; gap:24px; }
@media(max-width:1024px){.chart-grid{grid-template-columns:1fr}}

.panel { background:#1f1629 !important; border:1px solid rgba(255,255,255,0.05) !important; border-radius:12px; }
.panel-pad { padding:24px; }
.panel-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
.panel-title  { font-size:18px; font-weight:700; color:#fff; }
.panel-sub    { font-size:14px; color:#64748b; margin-top:4px; }
.tab-group { display:flex; gap:8px; }
.tab-btn { padding:6px 12px; border-radius:8px; border:none; font-family:'Manrope',sans-serif; font-size:12px; font-weight:500; cursor:pointer; transition:all 0.2s; }
.tab-btn.inactive { background:rgba(255,255,255,0.05); color:#94a3b8; }
.tab-btn.inactive:hover { background:rgba(255,255,255,0.1); }
.tab-btn.active { background:#7311d4 !important; color:#fff; box-shadow:0 4px 12px rgba(115,17,212,0.3); }

.bar-chart { position:relative; height:288px; display:flex; align-items:flex-end; justify-content:space-between; padding:0 8px; gap:8px; }
.bar-grid  { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:space-between; pointer-events:none; }
.bar-gridline { width:100%; height:1px; background:rgba(255,255,255,0.05); }
.bar-group { display:flex; flex-direction:column; align-items:center; gap:8px; width:100%; }
.bar-outer { width:100%; border-radius:4px 4px 0 0; background:rgba(255,255,255,0.06); position:relative; }
.bar-inner { position:absolute; bottom:0; width:100%; background:linear-gradient(to top,rgba(115,17,212,0.8),#7311d4); border-radius:4px 4px 0 0; }
.bar-label { font-size:11px; color:#64748b; white-space:nowrap; }

.right-col { display:flex; flex-direction:column; gap:24px; }
.donut-wrap { display:flex; align-items:center; justify-content:center; padding:16px 0; }
.donut-ring { width:160px; height:160px; border-radius:50%; border:12px solid rgba(255,255,255,0.05); position:relative; display:flex; align-items:center; justify-content:center; }
.donut-arc-1 { position:absolute; inset:-12px; width:calc(100% + 24px); height:calc(100% + 24px); border-radius:50%; border:12px solid #7311d4; border-top-color:transparent; border-left-color:transparent; transform:rotate(45deg); }
.donut-arc-2 { position:absolute; inset:-12px; width:calc(100% + 24px); height:calc(100% + 24px); border-radius:50%; border:12px solid #D4AF37; border-bottom-color:transparent; border-right-color:transparent; border-left-color:transparent; transform:rotate(-12deg); opacity:0.8; }
.donut-center { text-align:center; z-index:1; }
.donut-val { font-size:24px; font-weight:700; color:#fff; display:block; }
.donut-lbl { font-size:11px; color:#64748b; }
.legend-list { display:flex; flex-direction:column; gap:12px; margin-top:8px; }
.legend-row  { display:flex; align-items:center; justify-content:space-between; font-size:14px; padding:4px 0; }
.legend-dot  { width:12px; height:12px; border-radius:50%; flex-shrink:0; }
.legend-left { display:flex; align-items:center; gap:8px; color:#94a3b8; }
.legend-val  { font-weight:500; color:#fff; }

.export-card { background:linear-gradient(135deg,#7311d4,#4a0b8a) !important; border-radius:12px; padding:24px; position:relative; overflow:hidden; box-shadow:0 8px 32px rgba(115,17,212,0.3); }
.export-glow { position:absolute; top:0; right:0; width:128px; height:128px; background:rgba(255,255,255,0.1); border-radius:50%; margin-right:-32px; margin-top:-32px; filter:blur(20px); }
.export-title { font-size:18px; font-weight:700; color:#fff; margin-bottom:8px; position:relative; z-index:1; }
.export-sub   { font-size:14px; color:rgba(255,255,255,0.8); margin-bottom:16px; position:relative; z-index:1; }
.export-btn   { width:100%; padding:8px 16px; background:#fff !important; color:#7311d4 !important; font-family:'Manrope',sans-serif; font-size:14px; font-weight:700; border:none !important; border-radius:8px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:background 0.2s; position:relative; z-index:1; box-shadow:0 4px 12px rgba(0,0,0,0.2); }
.export-btn:hover { background:#f1f5f9 !important; }

.table-panel  { background:#1f1629 !important; border:1px solid rgba(255,255,255,0.05) !important; border-radius:12px; overflow:hidden; }
.table-header { padding:24px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.05); }
.table-title  { font-size:18px; font-weight:700; color:#fff; }
.table-link   { font-size:14px; color:#7311d4; font-weight:500; background:none; border:none; cursor:pointer; font-family:'Manrope',sans-serif; }
.table-link:hover { color:#9c4ce6; }

table { width:100%; text-align:left; font-size:14px; border-collapse:collapse; }
thead { background:rgba(255,255,255,0.05); }
th { padding:16px 24px; font-weight:600; color:#64748b; white-space:nowrap; }
td { padding:16px 24px; border-top:1px solid rgba(255,255,255,0.05); vertical-align:middle; }
tr:hover td { background:rgba(255,255,255,0.03); }

.user-cell { display:flex; align-items:center; gap:12px; }
.avatar-initials { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; flex-shrink:0; }
.avatar-img  { width:32px; height:32px; border-radius:50%; object-fit:cover; flex-shrink:0; }
.u-name  { font-weight:500; color:#fff; font-size:14px; }
.u-email { font-size:12px; color:#64748b; }
.t-plan  { color:#94a3b8; }
.t-date  { color:#64748b; font-family:monospace; }
.t-amount{ font-weight:700; color:#fff; font-family:monospace; }

.badge { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:500; white-space:nowrap; }
.badge-green  { background:rgba(34,197,94,0.1);  color:#22c55e; }
.badge-yellow { background:rgba(234,179,8,0.1);  color:#eab308; }
.badge-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.badge-dot-green  { background:#22c55e; }
.badge-dot-yellow { background:#eab308; animation:pulse 1.5s infinite; }

.row-action-btn { background:none !important; border:none !important; color:#64748b; cursor:pointer; transition:color 0.2s; display:flex; align-items:center; }
.row-action-btn:hover { color:#fff; }

/* ═══ Botones del panel admin ═══ */
.admin-action-btn { padding:5px 12px; border-radius:6px; border:none; font-family:'Manrope',sans-serif; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s; }
.admin-action-btn.activar  { background:rgba(34,197,94,0.15); color:#22c55e; }
.admin-action-btn.activar:hover { background:rgba(34,197,94,0.3); }
.admin-action-btn.inactivar { background:rgba(234,179,8,0.15); color:#eab308; }
.admin-action-btn.inactivar:hover { background:rgba(234,179,8,0.3); }
.admin-action-btn.eliminar  { background:rgba(239,68,68,0.15); color:#ef4444; }
.admin-action-btn.eliminar:hover  { background:rgba(239,68,68,0.3); }

/* Badges adicionales */
.badge-red    { background:rgba(239,68,68,0.1);   color:#ef4444; }
.badge-purple { background:rgba(115,17,212,0.15); color:#a855f7; }
.badge-dot-red { background:#ef4444; }

/* ═══ GRÁFICO DE BARRAS ═══ */
.chart-bars-wrap {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  padding: 8px 0 0;
  height: 180px;
}
.chart-bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  height: 100%;
}
.chart-bar-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: #e2e8f0;
}
.chart-bar-track {
  flex: 1;
  width: 100%;
  background: rgba(255,255,255,0.06);
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.chart-bar-fill {
  width: 100%;
  border-radius: 8px 8px 0 0;
  transition: height 0.8s cubic-bezier(.4,0,.2,1);
  min-height: 4px;
}
.chart-bar-label {
  font-size: 11px;
  color: #64748b;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
}

/* ═══ NUEVAS CARDS VISUALES ═══ */
.ap-section-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media(max-width: 1024px) { .ap-section-grid { grid-template-columns: repeat(2, 1fr); } }
@media(max-width: 640px)  { .ap-section-grid { grid-template-columns: 1fr; } }

.ap-card {
  background: #1f1629;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: border-color 0.2s;
}
.ap-card:hover { border-color: rgba(115,17,212,0.35); }

.ap-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.ap-card-title { font-size: 15px; font-weight: 700; color: #e2e8f0; }
.ap-card-sub   { font-size: 12px; color: #64748b; margin-top: 3px; }
.ap-card-icon  { font-size: 28px !important; opacity: 0.8; }

/* Donut */
.donut-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; }
.donut-svg  { width: 140px; height: 140px; }
.donut-legend { display: flex; flex-direction: column; gap: 8px; width: 100%; }
.donut-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; color: #94a3b8;
}
.donut-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

/* Barras de tipos */
.tipo-bars { display: flex; flex-direction: column; gap: 14px; }
.tipo-row  { display: flex; flex-direction: column; gap: 6px; }
.tipo-label-row { display: flex; align-items: center; gap: 8px; }
.tipo-dot   { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.tipo-label { font-size: 13px; color: #94a3b8; flex: 1; }
.tipo-val   { font-size: 13px; font-weight: 700; color: #e2e8f0; }
.tipo-track { height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
.tipo-fill  { height: 100%; border-radius: 4px; transition: width 0.8s cubic-bezier(.4,0,.2,1); min-width: 4px; }

/* Estado del sistema */
.status-list { display: flex; flex-direction: column; gap: 12px; }
.status-row  { display: flex; align-items: center; justify-content: space-between; }
.status-left { display: flex; align-items: center; gap: 10px; }
.status-dot  {
  width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0;
  box-shadow: 0 0 6px currentColor;
}
.status-label { font-size: 13px; color: #94a3b8; }
.status-badge {
  font-size: 11px; font-weight: 600; padding: 3px 10px;
  border-radius: 999px; border: 1px solid;
}
</style>