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
        <router-link :to="{ name: 'adminpanel' }" class="nav-item">
          <span class="mi nav-icon">dashboard</span>
          Panel de Control
        </router-link>
        <router-link to="/admin-usuarios" class="nav-item">
          <span class="mi nav-icon">manage_accounts</span>
          Gestión de Usuarios
        </router-link>
        <router-link to="/admin-pagos" class="nav-item active">
          <span class="mi nav-icon">receipt_long</span>
          Historial de Pagos
        </router-link>
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
            <div class="header-title">Historial de Pagos</div>
            <div class="header-sub">Registro de transacciones del sistema</div>
          </div>
          <button @click="cerrarSesion" class="admin-action-btn eliminar"
            style="display:flex;align-items:center;gap:8px;background:rgba(239,68,68,0.2);color:#ef4444;border:1px solid rgba(239,68,68,0.3);padding:8px 16px;">
            <span class="mi" style="font-size:16px;">logout</span> Cerrar Sesión
          </button>
        </header>

        <!-- Content -->
        <div class="content-scroll">
          <div class="tabla-card">

            <!-- KPI quick stats -->
            <div class="kpi-row">
              <div class="kpi-mini">
                <span class="mi kpi-mini-icon" style="color:#22c55e;">payments</span>
                <div>
                  <div class="kpi-mini-val">{{ totalPagos }}</div>
                  <div class="kpi-mini-lbl">Total Pagos</div>
                </div>
              </div>
              <div class="kpi-mini">
                <span class="mi kpi-mini-icon" style="color:#D4AF37;">monetization_on</span>
                <div>
                  <div class="kpi-mini-val">{{ formatMonto(montoTotal) }}</div>
                  <div class="kpi-mini-lbl">Monto Total</div>
                </div>
              </div>
              <div class="kpi-mini">
                <span class="mi kpi-mini-icon" style="color:#3b82f6;">today</span>
                <div>
                  <div class="kpi-mini-val">{{ pagosHoy }}</div>
                  <div class="kpi-mini-lbl">Pagos Hoy</div>
                </div>
              </div>
              <div class="kpi-mini">
                <span class="mi kpi-mini-icon" style="color:#7311d4;">group</span>
                <div>
                  <div class="kpi-mini-val">{{ usuariosUnicos }}</div>
                  <div class="kpi-mini-lbl">Usuarios con pago</div>
                </div>
              </div>
            </div>

            <!-- Header tabla con filtros -->
            <div class="tabla-header">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:18px; font-weight:700; color:#fff;">Pagos Registrados</span>
                <span class="badge badge-purple" style="font-size:11px; padding:3px 10px;">
                  {{ pagosFiltrados.length }} registros
                </span>
              </div>
              <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                <!-- Filtro método -->
                <select v-model="filtroMetodo" class="sena-select">
                  <option value="">Todos los métodos</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="mercadopago">Mercado Pago</option>
                </select>
                <!-- Buscador por ID usuario -->
                <div class="search-wrap">
                  <span class="mi" style="color:#64748b; font-size:18px; position:absolute; left:10px; top:50%; transform:translateY(-50%);">search</span>
                  <input v-model="busqueda" class="search-input" placeholder="Buscar por usuario ID..." />
                </div>
                <!-- Botón actualizar -->
                <button class="btn-primary" @click="cargarPagos" :disabled="cargando">
                  <span class="mi" style="font-size:16px;">refresh</span>
                  Actualizar
                </button>
              </div>
            </div>

            <!-- Loading -->
            <div v-if="cargando" style="padding:48px; text-align:center; color:#64748b;">
              <q-spinner-dots color="primary" size="3rem" />
              <div style="margin-top:12px;">Cargando historial de pagos...</div>
            </div>

            <!-- Error -->
            <div v-else-if="errorMsg" style="padding:48px; text-align:center;">
              <span class="mi" style="font-size:40px; color:#ef4444;">error_outline</span>
              <div style="color:#ef4444; margin-top:12px; font-weight:600;">{{ errorMsg }}</div>
              <button class="btn-primary" style="margin-top:16px;" @click="cargarPagos">Reintentar</button>
            </div>

            <!-- Tabla HTML pura -->
            <div v-else class="tabla-wrap">
              <table class="tabla">
                <thead>
                  <tr>
                    <th>ID Transacción</th>
                    <th>Usuario ID</th>
                    <th style="text-align:center;">Monto</th>
                    <th style="text-align:center;">Método</th>
                    <th style="text-align:center;">Fecha Pago</th>
                    <th style="text-align:center;">Vencimiento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="pagosFiltrados.length === 0">
                    <td colspan="6" style="text-align:center; color:#64748b; padding:32px;">
                      No hay pagos registrados
                    </td>
                  </tr>
                  <tr v-for="pago in pagosPaginados" :key="pago._id">
                    <td class="td-id" style="font-family:monospace; font-size:12px; color:#64748b;">
                      ...{{ pago._id?.substring(18) }}
                    </td>
                    <td style="font-family:monospace; font-size:11px; color:#94a3b8;">
                      {{ pago.usuario_id || '-' }}
                    </td>
                    <td style="text-align:center;">
                      <span style="font-weight:700; color:#22c55e; font-family:monospace;">
                        {{ formatMonto(pago.monto) }}
                      </span>
                    </td>
                    <td style="text-align:center;">
                      <span class="badge" :class="badgeMetodo(pago.metodo)">
                        <span class="mi" style="font-size:13px;">{{ iconoMetodo(pago.metodo) }}</span>
                        {{ pago.metodo || '-' }}
                      </span>
                    </td>
                    <td style="text-align:center; color:#94a3b8; font-family:monospace; font-size:13px;">
                      {{ formatFecha(pago.fecha_pago) }}
                    </td>
                    <td style="text-align:center; font-family:monospace; font-size:13px;"
                        :style="{ color: estaVencido(pago.fecha_vencimiento) ? '#ef4444' : '#22c55e' }">
                      {{ formatFecha(pago.fecha_vencimiento) }}
                      <span v-if="estaVencido(pago.fecha_vencimiento)" class="mi" style="font-size:13px; vertical-align:middle;">warning</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Paginación -->
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

          </div>
        </div>
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth'
import axios from 'axios'
import { useNotify } from '../composables/useNotify'

const auth = useAuthStore()
const router = useRouter()
const { notifyError } = useNotify()

// ── Estado principal ───────────────────────────────────────────
const pagos    = ref([])
const cargando = ref(false)
const errorMsg = ref('')

// ── Filtros ────────────────────────────────────────────────────
const busqueda    = ref('')
const filtroMetodo = ref('')

// ── Paginación ─────────────────────────────────────────────────
const paginaActual    = ref(1)
const pagosPorPagina  = 8

// ── Headers con token ──────────────────────────────────────────
const getHeaders = () => {
  const token = auth.token || ''
  return { headers: { 'x-token': token, 'Content-Type': 'application/json' } }
}

// ── CARGAR PAGOS ───────────────────────────────────────────────
const cargarPagos = async () => {
  try {
    cargando.value = true
    errorMsg.value = ''
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    const res = await axios.get(`${baseUrl}/pagos`, getHeaders())
    pagos.value = res.data.pagos ?? res.data ?? []
  } catch (err) {
    errorMsg.value = 'No se pudo cargar el historial de pagos. Verifica que el servidor esté activo.'
    console.error('❌ Error cargando pagos:', err.response?.status, err.response?.data)
    notifyError('Error cargando historial de pagos.')
  } finally {
    cargando.value = false
  }
}

// ── Filtrado ───────────────────────────────────────────────────
const pagosFiltrados = computed(() => {
  let lista = pagos.value
  if (filtroMetodo.value) {
    lista = lista.filter(p => p.metodo === filtroMetodo.value)
  }
  if (busqueda.value.trim()) {
    const q = busqueda.value.toLowerCase()
    lista = lista.filter(p =>
      p.usuario_id?.toString().toLowerCase().includes(q) ||
      p._id?.toLowerCase().includes(q)
    )
  }
  return lista
})

// ── Paginación ─────────────────────────────────────────────────
const totalPaginas = computed(() =>
  Math.ceil(pagosFiltrados.value.length / pagosPorPagina) || 1
)

const pagosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * pagosPorPagina
  return pagosFiltrados.value.slice(inicio, inicio + pagosPorPagina)
})

// Resetear página al filtrar
watch([busqueda, filtroMetodo], () => { paginaActual.value = 1 })

// ── KPIs ───────────────────────────────────────────────────────
const totalPagos   = computed(() => pagos.value.length)
const montoTotal   = computed(() => pagos.value.reduce((acc, p) => acc + (p.monto || 0), 0))
const usuariosUnicos = computed(() => new Set(pagos.value.map(p => p.usuario_id)).size)
const pagosHoy     = computed(() => {
  const hoy = new Date().toLocaleDateString('en-CA')
  return pagos.value.filter(p => {
    if (!p.fecha_pago) return false
    return new Date(p.fecha_pago).toLocaleDateString('en-CA') === hoy
  }).length
})

// ── Helpers visuales ───────────────────────────────────────────
const formatMonto = (val) =>
  val != null ? `$${Number(val).toLocaleString('es-CO')} COP` : '-'

const formatFecha = (val) => {
  if (!val) return '-'
  return new Date(val).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: '2-digit'
  })
}

const estaVencido = (fecha) => fecha && new Date(fecha) < new Date()

const badgeMetodo = (metodo) => ({
  'badge-green':  metodo === 'transferencia',
  'badge-purple': metodo === 'tarjeta' || metodo === 'mercadopago',
  'badge-yellow': metodo === 'efectivo',
  'badge-gray':   !metodo,
})

const iconoMetodo = (metodo) => {
  const m = { tarjeta: 'credit_card', efectivo: 'payments', transferencia: 'swap_horiz', mercadopago: 'account_balance' }
  return m[metodo] || 'help_outline'
}

const cerrarSesion = () => {
  auth.logout()
  router.push({ name: 'loginUsuario' })
}

onMounted(() => cargarPagos())
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

::-webkit-scrollbar { width:6px; height:6px; }
::-webkit-scrollbar-track { background:#130c1a; }
::-webkit-scrollbar-thumb { background:#332640; border-radius:4px; }
::-webkit-scrollbar-thumb:hover { background:#7311d4; }

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
.nav-item.active { background:rgba(115,17,212,0.1); color:#fff; border:1px solid rgba(115,17,212,0.2); }
.nav-item.active .nav-icon { color:#7311d4 !important; }

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

.content-scroll { flex:1; overflow-y:auto; padding:32px; display:flex; flex-direction:column; gap:24px; padding-bottom:80px; }

/* KPI mini row */
.kpi-row { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
@media(max-width:900px){ .kpi-row { grid-template-columns:repeat(2,1fr); } }
@media(max-width:500px){ .kpi-row { grid-template-columns:1fr; } }

.kpi-mini { background:#1f1629; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:16px 20px; display:flex; align-items:center; gap:14px; }
.kpi-mini-icon { font-size:28px !important; }
.kpi-mini-val { font-size:20px; font-weight:700; color:#fff; }
.kpi-mini-lbl { font-size:12px; color:#64748b; margin-top:2px; }

/* Card principal */
.tabla-card { background:#1f1629; border:1px solid rgba(255,255,255,0.07); border-radius:16px; overflow:hidden; display:flex; flex-direction:column; gap:0; }

.tabla-header { padding:20px 24px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.05); flex-wrap:wrap; gap:12px; }

.tabla-wrap { overflow-x:auto; }
.tabla { width:100%; text-align:left; font-size:14px; border-collapse:collapse; }
thead { background:rgba(255,255,255,0.05); }
th { padding:14px 20px; font-weight:600; color:#64748b; white-space:nowrap; }
td { padding:14px 20px; border-top:1px solid rgba(255,255,255,0.04); vertical-align:middle; }
tr:hover td { background:rgba(255,255,255,0.02); }

.td-id { font-family:monospace; color:#64748b; font-size:12px; }

/* Search & Select */
.search-wrap { position:relative; }
.search-input { padding:8px 16px 8px 36px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#e2e8f0; font-family:'Manrope',sans-serif; font-size:13px; outline:none; width:220px; }
.search-input::placeholder { color:#64748b; }
.search-input:focus { border-color:rgba(115,17,212,0.5); }

.sena-select { padding:8px 12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#e2e8f0; font-family:'Manrope',sans-serif; font-size:13px; outline:none; cursor:pointer; }
.sena-select option { background:#1f1629; color:#e2e8f0; }

/* Botones */
.btn-primary { display:flex; align-items:center; gap:6px; padding:8px 16px; background:linear-gradient(135deg,#7311d4,#4a0b8a); color:#fff; border:none; border-radius:8px; font-family:'Manrope',sans-serif; font-size:13px; font-weight:600; cursor:pointer; transition:opacity 0.2s; }
.btn-primary:hover { opacity:0.85; }
.btn-primary:disabled { opacity:0.5; cursor:not-allowed; }
.admin-action-btn { padding:5px 12px; border-radius:6px; border:none; font-family:'Manrope',sans-serif; font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s; }
.admin-action-btn.eliminar { background:rgba(239,68,68,0.15); color:#ef4444; }
.admin-action-btn.eliminar:hover { background:rgba(239,68,68,0.3); }

/* Badges */
.badge { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:999px; font-size:12px; font-weight:500; white-space:nowrap; }
.badge-green  { background:rgba(34,197,94,0.1);  color:#22c55e; }
.badge-yellow { background:rgba(234,179,8,0.1);  color:#eab308; }
.badge-purple { background:rgba(115,17,212,0.15); color:#a855f7; }
.badge-red    { background:rgba(239,68,68,0.1);   color:#ef4444; }
.badge-gray   { background:rgba(255,255,255,0.05); color:#64748b; }
.badge-dot    { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
.badge-dot-green  { background:#22c55e; }

.flex { display:flex; }
.flex-center { justify-content:center; }
.q-mt-md { margin-top:16px; }
.q-pb-lg { padding-bottom:24px; }
</style>
