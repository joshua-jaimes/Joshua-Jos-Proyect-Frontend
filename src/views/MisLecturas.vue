<template>
  <div class="mis-lecturas-page">

    <!-- Header con botón de regreso -->
    <header class="ml-header">
      <div class="ml-header-inner">
        <div class="ml-logo">
          <q-icon name="auto_awesome" size="md" style="color:#7311d4" />
          <span class="ml-logo-text">Num<span style="color:#7311d4">AI</span></span>
        </div>
        <router-link :to="{ name: 'dashboard' }" class="back-btn">
          <q-icon name="arrow_back" size="sm" />
          <span>Volver al Dashboard</span>
        </router-link>
      </div>
    </header>

    <!-- ══ BLOQUEO: usuario NO Premium ══ -->
    <div v-if="!esPremium" class="ml-blocked">
      <div class="blocked-card">
        <q-icon name="lock" size="60px" style="color:#7311d4;opacity:.7;margin-bottom:1rem" />
        <h2 class="blocked-title">Función Premium</h2>
        <p class="blocked-desc">
          Esta función está disponible solo para usuarios Premium.<br />
          Mejora tu plan para acceder a <strong>Mis Lecturas</strong>,
          favoritos y filtros.
        </p>
        <router-link :to="{ name: 'MembresiasYPagos' }" class="upgrade-link">
          <q-icon name="upgrade" size="sm" />
          Mejorar Plan
        </router-link>
      </div>
    </div>

    <!-- ══ CONTENIDO: usuario Premium ══ -->
    <main v-else class="ml-main">
      <div class="ml-container">

        <!-- Título -->
        <section class="ml-page-header">
          <h1 class="ml-title">
            <q-icon name="library_books" size="md" />
            Mis Lecturas
          </h1>
          <p class="ml-subtitle">Gestiona y explora tus lecturas numerológicas.</p>
        </section>

        <!-- ══ Filtros ══ -->
        <section class="ml-filters-section">
          <div class="ml-filters">
            <button
              v-for="f in filtros"
              :key="f.value"
              class="filter-btn"
              :class="{ active: filtroActivo === f.value }"
              @click="filtroActivo = f.value"
            >
              <q-icon :name="f.icon" size="xs" />
              {{ f.label }}
            </button>
          </div>
        </section>

        <!-- ══ Lecturas Favoritas ══ -->
        <section v-if="lecturasFavoritas.length > 0" class="ml-section">
          <h2 class="ml-section-title">
            <q-icon name="favorite" size="sm" style="color:#ef4444" />
            Lecturas Favoritas
          </h2>
          <div class="ml-grid">
            <div
              v-for="l in lecturasFavoritas"
              :key="l._id"
              class="ml-card favorite-card"
            >
              <div class="ml-card-header">
                <span class="ml-badge" :class="l.tipo">{{ tipoLabel(l.tipo) }}</span>
                <button class="fav-btn active" @click="toggleFav(l._id)" title="Quitar de favoritos">
                  <q-icon name="favorite" size="sm" />
                </button>
              </div>
              <p class="ml-card-preview">{{ preview(l.contenido) }}</p>
              <span class="ml-card-date">{{ formatFecha(l.fecha_lectura || l.dia) }}</span>
            </div>
          </div>
        </section>

        <!-- ══ Lista filtrada ══ -->
        <section class="ml-section">
          <h2 class="ml-section-title">
            <q-icon name="auto_awesome" size="sm" style="color:#7311d4" />
            {{ tituloSeccion }}
          </h2>

          <div v-if="cargando" class="ml-empty">
            <q-spinner size="lg" color="primary" />
            <p>Cargando tus lecturas...</p>
          </div>

          <div v-else-if="lecturasFiltradas.length === 0" class="ml-empty">
            <q-icon name="nights_stay" size="48px" />
            <p>No tienes lecturas en esta categoría.</p>
          </div>

          <div v-else class="ml-grid">
            <div
              v-for="l in lecturasFiltradas"
              :key="l._id"
              class="ml-card"
            >
              <div class="ml-card-header">
                <span class="ml-badge" :class="l.tipo">{{ tipoLabel(l.tipo) }}</span>
                <button
                  class="fav-btn"
                  :class="{ active: esFav(l._id) }"
                  @click="toggleFav(l._id)"
                  :title="esFav(l._id) ? 'Quitar favorito' : 'Agregar a favoritos'"
                >
                  <q-icon :name="esFav(l._id) ? 'favorite' : 'favorite_border'" size="sm" />
                </button>
              </div>
              <p class="ml-card-preview">{{ preview(l.contenido) }}</p>
              <span class="ml-card-date">{{ formatFecha(l.fecha_lectura || l.dia) }}</span>
            </div>
          </div>
        </section>

      </div>
    </main>

    <footer class="ml-footer">
      <p>© 2026 Numerología AI. Todos los derechos reservados.</p>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/Auth'
import { getData } from '../services/apiCliente'

const auth = useAuthStore()

// ══ Acceso general (Premium y Gratuito) ══
const esPremium = computed(() => true)

// ══ Cargar lecturas ══
const todasLasLecturas = ref([])
const cargando = ref(false)

const cargarLecturas = async () => {
  if (!auth.usuario?._id) return
  try {
    cargando.value = true
    const data = await getData(`/lecturas/${auth.usuario._id}`)
    todasLasLecturas.value = data.lecturas || []
  } catch (e) {
    console.error('Error cargando lecturas:', e.message)
  } finally {
    cargando.value = false
  }
}

// ══ Favoritos (localStorage) ══
const FAVES_KEY = `ml_fav_${auth.usuario?._id || 'guest'}`
const favIds = ref(JSON.parse(localStorage.getItem(FAVES_KEY) || '[]'))

const esFav = (id) => favIds.value.includes(id)
const toggleFav = (id) => {
  favIds.value = esFav(id)
    ? favIds.value.filter(f => f !== id)
    : [...favIds.value, id]
  localStorage.setItem(FAVES_KEY, JSON.stringify(favIds.value))
}

const lecturasFavoritas = computed(() =>
  todasLasLecturas.value.filter(l => esFav(l._id))
)

// ══ Filtros ══
const filtros = [
  { value: 'todas',     label: 'Todas',               icon: 'all_inclusive' },
  { value: 'diaria',    label: 'Lecturas Diarias',    icon: 'today' },
  { value: 'principal', label: 'Lecturas Principales', icon: 'star' },
]
const filtroActivo = ref('todas')

const lecturasFiltradas = computed(() =>
  filtroActivo.value === 'todas'
    ? todasLasLecturas.value
    : todasLasLecturas.value.filter(l => l.tipo === filtroActivo.value)
)

const tituloSeccion = computed(() =>
  filtros.find(f => f.value === filtroActivo.value)?.label || 'Lecturas'
)

// ══ Helpers ══
const tipoLabel = (t) => ({ principal: 'Principal', diaria: 'Diaria' }[t] || t || '—')
const preview = (c) => c ? c.replace(/\*\*/g, '').slice(0, 160) + (c.length > 160 ? '...' : '') : '—'
const formatFecha = (v) => {
  if (!v) return '—'
  const d = new Date(v)
  return isNaN(d) ? v : d.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(() => { if (esPremium.value) cargarLecturas() })
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');
* { box-sizing: border-box; }

.mis-lecturas-page {
  min-height: 100vh;
  background: #191022;
  color: #f3f4f6;
  font-family: 'Manrope', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
}

/* Header */
.ml-header {
  background: rgba(25,16,34,.96);
  border-bottom: 1px solid rgba(115,17,212,.2);
  backdrop-filter: blur(12px);
  position: sticky; top: 0; z-index: 50;
}
.ml-header-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;
  height: 64px; display: flex; align-items: center; justify-content: space-between;
}
.ml-logo { display: flex; align-items: center; gap: .5rem; }
.ml-logo-text { font-size: 1.3rem; font-weight: 700; }
.back-btn {
  display: flex; align-items: center; gap: .4rem;
  color: #9ca3af; text-decoration: none; font-size: .9rem; transition: color .2s;
}
.back-btn:hover { color: #b980ff; }

/* Bloqueo */
.ml-blocked {
  flex: 1; display: flex; align-items: center; justify-content: center; padding: 3rem 1rem;
}
.blocked-card {
  background: #231630; border: 1px solid rgba(115,17,212,.25); border-radius: 1.25rem;
  padding: 3rem 2.5rem; max-width: 460px; width: 100%; text-align: center;
  box-shadow: 0 0 40px rgba(115,17,212,.12);
}
.blocked-title { font-size: 1.6rem; font-weight: 700; margin: 0 0 .75rem; }
.blocked-desc { color: #9ca3af; line-height: 1.6; margin-bottom: 1.5rem; }
.upgrade-link {
  display: inline-flex; align-items: center; gap: .4rem;
  background: linear-gradient(135deg, #7311d4, #9b4dff);
  color: #fff; border-radius: .75rem; padding: .75rem 1.5rem;
  font-weight: 600; text-decoration: none; transition: opacity .2s, transform .2s;
}
.upgrade-link:hover { opacity: .9; transform: translateY(-2px); }

/* Main */
.ml-main { flex: 1; padding: 2rem 1rem; }
.ml-container { max-width: 1100px; margin: 0 auto; }
.ml-page-header { margin-bottom: 2rem; }
.ml-title { font-size: 1.8rem; font-weight: 700; display: flex; align-items: center; gap: .5rem; margin: 0 0 .25rem; }
.ml-subtitle { color: #9ca3af; margin: 0; }

/* Filtros */
.ml-filters-section { margin-bottom: 2rem; }
.ml-filters { display: flex; flex-wrap: wrap; gap: .5rem; }
.filter-btn {
  display: flex; align-items: center; gap: .35rem;
  padding: .5rem 1rem; border-radius: 2rem;
  border: 1px solid rgba(115,17,212,.3); background: rgba(115,17,212,.08);
  color: #9ca3af; font-family: inherit; font-size: .85rem; cursor: pointer; transition: all .2s;
}
.filter-btn:hover { border-color: #7311d4; color: #b980ff; }
.filter-btn.active { background: rgba(115,17,212,.25); border-color: #7311d4; color: #f3f4f6; font-weight: 600; }

/* Secciones */
.ml-section { margin-bottom: 2.5rem; }
.ml-section-title { font-size: 1.1rem; font-weight: 600; margin: 0 0 1rem; display: flex; align-items: center; gap: .4rem; }

/* Grid */
.ml-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
.ml-card {
  background: #231630; border: 1px solid rgba(115,17,212,.2); border-radius: 1rem;
  padding: 1.25rem; display: flex; flex-direction: column; gap: .75rem;
  transition: transform .2s, border-color .2s;
}
.ml-card:hover { transform: translateY(-3px); border-color: rgba(115,17,212,.5); }
.favorite-card { border-color: rgba(212,175,55,.4); }
.ml-card-header { display: flex; justify-content: space-between; align-items: center; }
.ml-badge {
  font-size: .7rem; font-weight: 600; padding: .2rem .6rem; border-radius: 1rem;
  text-transform: uppercase; letter-spacing: .05em;
}
.ml-badge.principal { background: rgba(115,17,212,.25); color: #b980ff; border: 1px solid rgba(115,17,212,.4); }
.ml-badge.diaria { background: rgba(212,175,55,.15); color: #d4af37; border: 1px solid rgba(212,175,55,.3); }
.fav-btn { background: none; border: none; cursor: pointer; color: #9ca3af; transition: color .2s, transform .15s; display: flex; }
.fav-btn:hover { transform: scale(1.15); }
.fav-btn.active { color: #ef4444; }
.ml-card-preview { color: #9ca3af; font-size: .88rem; line-height: 1.6; flex: 1; margin: 0; }
.ml-card-date { font-size: .75rem; color: rgba(156,163,175,.6); }

.ml-empty { text-align: center; padding: 3rem 1rem; color: #9ca3af; display: flex; flex-direction: column; align-items: center; gap: .75rem; }

/* Footer */
.ml-footer { text-align: center; padding: 1.25rem; border-top: 1px solid rgba(115,17,212,.15); color: #6b7280; font-size: .8rem; }

@media (max-width: 600px) {
  .ml-main { padding: 1.5rem .75rem; }
  .ml-grid { grid-template-columns: 1fr; }
}
</style>
