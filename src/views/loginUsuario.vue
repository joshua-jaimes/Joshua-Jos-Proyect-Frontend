<template>
  <div class="login-page">

    <!-- Background -->
    <div class="bg-gradient"></div>
    <div class="pattern"></div>

    <!-- Orbs -->
    <div class="orb orb1"></div>
    <div class="orb orb2"></div>

    <main class="layout">

      <!-- LEFT HERO -->
      <section class="hero">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkJsS36YgozZ1lzi1eWpVcDcr15CuClyFAQ2RMXHRZnz4XFuy7NuFijhBoHMxPIqflK2zQMCMe7niNY95d10Y5NbRyc_ZNNJeg7Fl7zbFKVM1C3V80Ao9MeFy5OCjUG3z2MEga8-iR_aX7pgLgTeYOXKe26XnYxZuUSnjSHc9QHHEibKdTM0oTOOcQ51JE2G4hxaOc4AkPqiBK1pggJDJ6iVBsz460cT3mm-jbodQ1Df23Aw4ikxZ5BX8HWOrodeWllc9_XXRGFbI" class="bg-img" />
        <div class="overlay"></div>
        <div class="hero-content">
          <span class="badge" style="color: #b980ff;font-size: 30px; font-weight: bold;">Numerología AI</span>

          <h1>
            Descubre el poder de tus
            <span>números</span>
          </h1>

          <p>
            Accede a lecturas personalizadas generadas por IA y gestiona
            tu viaje espiritual con nuestra plataforma premium.
          </p>

          <div class="features">
            <div class="feature">🧠 Lecturas AI</div>
            <div class="feature">👥 Comunidad</div>
          </div>
        </div>
      </section>

      <!-- RIGHT LOGIN -->
      <section class="login-box glow">
        <div class="logo">
          <span class="material-icons">all_inclusive</span>
        </div>

        <h2>Bienvenido de nuevo</h2>
        <p class="subtitle">Ingresa a tu portal místico</p>

        <form @submit.prevent="ingresar" novalidate>

          <label>Correo electrónico</label>
          <input v-model="usuario" type="email" placeholder="correo@ejemplo.com" required>

          <label>Contraseña</label>
          <div style="position: relative; margin-bottom: 14px;">
            <input v-model="pass" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" required style="margin-bottom: 0; padding-right: 40px;">
            <span 
              class="material-icons" 
              style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #9ca3af; user-select: none; transition: color 0.2s;"
              @click="showPassword = !showPassword"
              title="Mostrar/Ocultar contraseña"
            >
              {{ showPassword ? 'visibility_off' : 'visibility' }}
            </span>
          </div>

          <!-- BOTÓN LOGIN -->
          <button type="submit" class="login-btn" :disabled="cargando">
  <span v-if="cargando" class="spinner"></span>
  <span class="material-icons" v-if="!cargando">arrow_forward</span>
  <span v-if="!cargando">Iniciar sesión</span>
</button>
          <!-- BOTÓN OLVIDÉ MI CONTRASEÑA -->
          <div style="text-align: center; margin-top: 10px;">
            <router-link to="/forgot-password" style="color: #b980ff; font-size: 13px; text-decoration: none;">¿Olvidaste tu contraseña?</router-link>
          </div>

          <!-- BOTÓN REGISTRAR -->
          <router-link to="/register" class="register-btn">
            <span class="material-icons">person_add</span>
            Registrar Persona
          </router-link>

        </form>
      </section>

    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/Auth'
import { useNotify } from '../composables/useNotify'

const usuario = ref('')
const pass = ref('')
const showPassword = ref(false)
const auth = useAuthStore()
const router = useRouter()
const { notifySuccess, notifyError } = useNotify()
const cargando = ref(false)

async function ingresar() {
  if (!usuario.value) {
    notifyError('El email es obligatorio', 'error_outline')
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(usuario.value)) {
    notifyError('Formato de email inválido', 'error_outline')
    return
  }
  if (!pass.value) {
    notifyError('La contraseña es obligatoria', 'error_outline')
    return
  }

  cargando.value = true
  const ok = await auth.login(usuario.value, pass.value)
  cargando.value = false

  if (ok) {
    notifySuccess(`Bienvenido, ${auth.usuario?.nombre || ''}. Tu sesión ha iniciado correctamente.`, 'auto_awesome')
    // Redirigir según el rol del usuario autenticado
    if (auth.usuario?.rol === 'admin') {
      router.push('/adminpanel')
    } else {
      router.push('/dashboard')
    }
  } else {
    notifyError(auth.error || 'Correo o contraseña incorrectos.', 'error_outline')
  }
}
</script>

<style scoped>

html, body, #app {
  height: 100%;
  margin: 0;
}

.login-page {
  background: #0f0914;
  color: white;
  font-family: system-ui, sans-serif;
  position: relative;
  /* pantalla completa real */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
}

/* Background */
.bg-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #191022, #2a0b4d, #150629);
}

.pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 2px 2px, rgba(115,17,212,.15) 1px, transparent 0);
  background-size: 32px 32px;
  opacity: .35;
}

/* Orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}

.orb1 {
  width: 40vw;
  height: 40vw;
  background: rgba(115,17,212,.35);
  top: -15%;
  left: -15%;
}

.orb2 {
  width: 35vw;
  height: 35vw;
  background: rgba(40,0,120,.45);
  bottom: -15%;
  right: -15%;
}

/* Layout */
.layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 420px;
  align-items: center;
  justify-content: center;
  padding: 60px;
  position: relative;
  z-index: 2;
  gap: 60px;
}

/* HERO */
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  border-radius: 20px;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 10;
}

.bg-img {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
  mix-blend-mode: overlay;
  pointer-events: none;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #0f0914, rgba(115,17,212, 0.2), transparent);
  z-index: 1;
  pointer-events: none;
}

.hero h1 {
  font-size: 3rem;
  line-height: 1.1;
}

.hero h1 span {
  color: #b980ff;
}

.hero p {
  margin-top: 15px;
  color: #bbb;
  max-width: 480px;
}

.badge {
  display: inline-block;
  background: rgba(115,17,212,.15);
  color: #b980ff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 18px;
}

.features {
  display: flex;
  gap: 12px;
  margin-top: 25px;
}

.feature {
  background: rgba(255,255,255,.05);
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 13px;
}

/* LOGIN CARD */
.login-box {
  background: linear-gradient(180deg, rgba(35,22,48,.96), rgba(25,16,34,.99));
  padding: 36px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,.1);
  backdrop-filter: blur(10px);
}

.glow {
  box-shadow: 0 0 45px rgba(115,17,212,.5);
}

.logo {
  width: 60px;
  height: 60px;
  margin: auto;
  background: rgba(115,17,212,.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.logo span {
  font-size: 32px;
  color: #b980ff;
}

.login-box h2 {
  text-align: center;
  margin-bottom: 4px;
}

.subtitle {
  text-align: center;
  font-size: 13px;
  color: #aaa;
  margin-bottom: 22px;
}

/* FORM */
label {
  font-size: 12px;
  color: #ccc;
  display: block;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: #0f0b18;
  border: 1px solid rgba(255,255,255,.15);
  color: white;
  margin-bottom: 14px;
}

input:focus {
  outline: none;
  border-color: #7311d4;
}

/* BOTÓN LOGIN */
.login-btn {
  width: 100%;
  padding: 13px;
  border-radius: 12px;
  background: linear-gradient(135deg,#7311d4,#9b4dff);
  border: none;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin-top: 6px;
  box-shadow: 0 0 18px rgba(115,17,212,.6);
  transition: all .3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
}

/* BOTÓN REGISTRAR */
.register-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(155,77,255,.08);
  border: 1px solid rgba(155,77,255,.6);
  color: #b980ff;
  font-weight: bold;
  text-decoration: none;
  transition: all .3s ease;
  backdrop-filter: blur(6px);
}

.register-btn:hover {
  background: rgba(155,77,255,.2);
  box-shadow: 0 0 15px rgba(155,77,255,.5);
  transform: translateY(-2px);
}

.spinner {
  width: 1.2em;
  height: 1.2em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
    padding: 25px;
  }

  .hero {
    display: none;
  }

  .login-box {
    max-width: 380px;
    margin: auto;
  }
}
</style>