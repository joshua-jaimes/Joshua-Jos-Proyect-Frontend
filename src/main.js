import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { Quasar, QIcon, QLayout, QDrawer, QPageContainer, QPagination, Notify } from 'quasar'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

import router from './router/index.js'

import './style.css'
import App from './App.vue'

const app = createApp(App)

// Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// Router
app.use(router)

// Quasar — componentes registrados globalmente para todas las vistas
app.use(Quasar, {
  plugins: { Notify },
  components: { QIcon, QLayout, QDrawer, QPageContainer, QPagination }
})

app.mount('#app')
