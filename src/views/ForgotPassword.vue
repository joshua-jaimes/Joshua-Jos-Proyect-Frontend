<template>
  <div class="login-page">

    <!-- Background identical to login -->
    <div class="bg-gradient"></div>
    <div class="pattern"></div>
    <div class="orb orb1"></div>
    <div class="orb orb2"></div>

    <main class="layout-single">
      <section class="login-box glow" style="width: 100%; max-width: 420px;">
        <div class="logo">
          <span class="material-icons">mark_email_read</span>
        </div>

        <h2>Recuperar contraseña</h2>
        <p class="subtitle" style="margin-bottom: 24px;">Ingresa tu correo para enviarte un enlace de recuperación.</p>

        <form @submit.prevent="enviarRecuperacion" novalidate>

          <label>Correo electrónico</label>
          <input v-model="forgotEmail" type="email" placeholder="correo@ejemplo.com" required style="margin-bottom: 20px;">

          <!-- BOTÓN ENVIAR -->
          <button type="submit" class="login-btn" :disabled="cargandoRecuperacion">
            <span v-if="cargandoRecuperacion" class="spinner"></span>
            <span class="material-icons" v-if="!cargandoRecuperacion">send</span>
            <span v-if="!cargandoRecuperacion">Enviar enlace</span>
          </button>
          
          <div style="text-align: center; margin-top: 20px;">
            <router-link to="/" style="color: #b980ff; font-size: 13px; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;">
              <span class="material-icons" style="font-size: 16px;">arrow_back</span>
              Volver al inicio de sesión
            </router-link>
          </div>

        </form>
      </section>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotify } from '../composables/useNotify'
import axiosInstance from '../plugins/pluginAxios.js'

const { notifySuccess, notifyError } = useNotify()

const forgotEmail = ref('')
const cargandoRecuperacion = ref(false)

async function enviarRecuperacion() {
  if (!forgotEmail.value) {
    notifyError('El correo es obligatorio', 'error_outline')
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(forgotEmail.value)) {
    notifyError('Formato de email inválido', 'error_outline')
    return
  }

  try {
    cargandoRecuperacion.value = true
    const res = await axiosInstance.post("/auth/forgot-password", { email: forgotEmail.value })
    notifySuccess(res.data.msg || 'Enlace enviado a tu correo', 'mark_email_read')
    forgotEmail.value = ''
  } catch (error) {
    notifyError(error.response?.data?.error || 'Ocurrió un error al procesar tu solicitud', 'error_outline')
  } finally {
    cargandoRecuperacion.value = false
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
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 100vh;
  width: 100%;
}

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

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}
.orb1 { width: 40vw; height: 40vw; background: rgba(115,17,212,.35); top: -15%; left: -15%; }
.orb2 { width: 35vw; height: 35vw; background: rgba(40,0,120,.45); bottom: -15%; right: -15%; }

.layout-single {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  position: relative;
  z-index: 2;
  width: 100%;
}

.login-box {
  background: linear-gradient(180deg, rgba(35,22,48,.96), rgba(25,16,34,.99));
  padding: 40px 36px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,.1);
  backdrop-filter: blur(10px);
  width: 100%;
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
.logo span { font-size: 32px; color: #b980ff; }
.login-box h2 { text-align: center; margin-bottom: 4px; font-size: 24px;}
.subtitle { text-align: center; font-size: 14px; color: #aaa; margin-bottom: 22px; }

label { font-size: 13px; color: #ccc; display: block; margin-bottom: 6px; }
input {
  width: 100%; padding: 14px 12px; border-radius: 10px; background: #0f0b18;
  border: 1px solid rgba(255,255,255,.15); color: white; margin-bottom: 14px; font-size: 15px;
}
input:focus { outline: none; border-color: #7311d4; }

.login-btn {
  width: 100%; padding: 14px; border-radius: 12px;
  background: linear-gradient(135deg,#7311d4,#9b4dff);
  border: none; font-weight: bold; display: flex; justify-content: center; align-items: center;
  gap: 8px; cursor: pointer; margin-top: 6px; color: white; font-size: 15px;
  box-shadow: 0 0 18px rgba(115,17,212,.6); transition: all .3s ease;
}
.login-btn:hover { transform: translateY(-2px); }

.spinner {
  width: 1.2em; height: 1.2em; border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white; border-radius: 50%; animation: spin 0.7s linear infinite;
  display: inline-block; margin-right: 8px;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
