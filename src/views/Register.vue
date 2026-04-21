<template>
  <div class="page">
    <!-- Botón Volver Fijo -->
    <button class="btn-back-fixed" @click="router.back()">
      <q-icon name="arrow_back" size="18px" />
      <span>Volver</span>
    </button>
    
    <div class="bg"></div>
    <div class="card">
      <div class="left gt-sm">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkJsS36YgozZ1lzi1eWpVcDcr15CuClyFAQ2RMXHRZnz4XFuy7NuFijhBoHMxPIqflK2zQMCMe7niNY95d10Y5NbRyc_ZNNJeg7Fl7zbFKVM1C3V80Ao9MeFy5OCjUG3z2MEga8-iR_aX7pgLgTeYOXKe26XnYxZuUSnjSHc9QHHEibKdTM0oTOOcQ51JE2G4hxaOc4AkPqiBK1pggJDJ6iVBsz460cT3mm-jbodQ1Df23Aw4ikxZ5BX8HWOrodeWllc9_XXRGFbI" class="bg-img" />
        <div class="overlay"></div>
        <div class="content">
          <div class="logo">
            <q-icon name="auto_awesome" color="gold" size="32px" />
            <h3>Num<span class="primary">AI</span></h3>
          </div>
          <h1>Descubre el código secreto de tu vida</h1>
          <p>Únete a la plataforma de numerología más avanzada. Lecturas generadas por IA, cartas natales precisas y una comunidad consciente te esperan.</p>
          <div class="testimonial" style="margin-top: auto; align-self: flex-start; display: inline-block;">
            <div class="rating">
              <div class="stars">
                <q-icon name="star" color="gold" size="14px" />
                <q-icon name="star" color="gold" size="14px" />
                <q-icon name="star" color="gold" size="14px" />
                <q-icon name="star" color="gold" size="14px" />
                <q-icon name="star" color="gold" size="14px" />
              </div>
              <p><strong>10k+</strong> usuarios iluminados</p>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
       <div class="top-link gt-md" @click="router.push({ name: 'loginUsuario' })">
¿Ya tienes cuenta? <a href="#">Inicia sesión</a>
</div>
        <div class="form-section">
          <!-- Botón Volver -->
         
          <h2>Crear Cuenta</h2>
          <p>Ingresa tus datos para calcular tu numerología inicial.</p>
          <form @submit.prevent="submit" class="form" novalidate>
            <div class="field">
              <label>Nombre Completo</label>
              <div class="input-wrapper">
                <q-icon name="person_outline" />
                <input v-model="data.name" type="text" placeholder="Ej. Ana García" />
              </div>
            </div>

            <div class="field">
              <label>Correo Electrónico</label>
              <div class="input-wrapper">
                <q-icon name="alternate_email" />
                <input v-model="data.email" type="email" placeholder="nombre@ejemplo.com" />
              </div>
            </div>
            <div class="field">
              <label>Fecha de Nacimiento</label>
              <div class="input-wrapper">
                <q-icon name="cake" />
                <input v-model="data.dob" type="date" class="date-input" />
              </div>
              <p class="hint"><q-icon name="lock" size="12px" />Necesario para tu carta natal precisa</p>
            </div>
            <div class="field">
              <label>Contraseña</label>
              <div class="input-wrapper">
                <q-icon name="lock_outline" />
                <input v-model="data.password" autocomplete="new-password" :type="showPwd ? 'text' : 'password'" placeholder="••••••••" />
                <q-icon :name="showPwd ? 'visibility' : 'visibility_off'" class="toggle-pwd" @click="showPwd=!showPwd" />
              </div>
            </div>
            <div class="field">
              <label>Confirmar Contraseña</label>
              <div class="input-wrapper">
                <q-icon name="lock_outline" />
                <input v-model="data.confirmPassword" autocomplete="new-password" :type="showPwd ? 'text' : 'password'" placeholder="••••••••" />
                <q-icon :name="showPwd ? 'visibility' : 'visibility_off'" class="toggle-pwd" @click="showPwd=!showPwd" />
              </div>
            </div>
            <button type="submit" class="btn-submit" :disabled="cargando">
  <span v-if="cargando" class="spinner"></span>
  <template v-else>
    <span>Calcular mi Numerología</span>
    <span class="material-icons" style="font-size:18px;">arrow_forward</span>
  </template>
</button>
          </form>

          <div class="bottom-link lt-md">¿Ya tienes cuenta? <a href="#">Inicia sesión</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'   
import axiosInstance from '../plugins/pluginAxios.js'
import { useNotify } from '../composables/useNotify'

const router = useRouter()             



const data = ref({ 
  name: '', 
  email: '', 
  dob: '', 
  password: '',
  confirmPassword: ''
})

const showPwd = ref(false)
const cargando = ref(false)
const { notifySuccess, notifyError } = useNotify()

onMounted(() => {
  // Fuerza a que los campos inicien limpios si el navegador intenta autocompletarlos
  data.value.password = ''
  data.value.confirmPassword = ''
})

const submit = async () => {
  // ── NOMBRE ──────────────────────────────────────────────────
  if (!data.value.name?.trim()) {
    notifyError('El nombre es obligatorio', 'error_outline')
    return
  }
  if (data.value.name.trim().length < 3) {
    notifyError('El nombre debe tener al menos 3 caracteres', 'error_outline')
    return
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(data.value.name.trim())) {
    notifyError('El nombre solo puede contener letras y espacios', 'error_outline')
    return
  }

  // ── FECHA DE NACIMIENTO ──────────────────────────────────────
  if (!data.value.dob) {
    notifyError('La fecha de nacimiento es obligatoria', 'error_outline')
    return
  }
  const fechaNac = new Date(data.value.dob)
  if (isNaN(fechaNac.getTime())) {
    notifyError('El formato de la fecha de nacimiento no es válido', 'error_outline')
    return
  }
  if (fechaNac >= new Date()) {
    notifyError('La fecha de nacimiento no puede ser una fecha futura', 'error_outline')
    return
  }

  // ── EMAIL ────────────────────────────────────────────────────
  if (!data.value.email?.trim()) {
    notifyError('El correo electrónico es obligatorio', 'error_outline')
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.value.email)) {
    notifyError('El formato del correo electrónico no es válido (ej: nombre@ejemplo.com)', 'error_outline')
    return
  }

  // ── CONTRASEÑA ────────────────────────────────────────────
  if (!data.value.password) {
    notifyError('La contraseña es obligatoria', 'error_outline')
    return
  }
  if (data.value.password.length < 8) {
    notifyError('La contraseña debe tener mínimo 8 caracteres', 'error_outline')
    return
  }

  // ── CONFIRMAR CONTRASEÑA ─────────────────────────────────────
  if (data.value.password !== data.value.confirmPassword) {
    notifyError('Las contraseñas no coinciden, verifica e intenta de nuevo', 'error_outline')
    return
  }

  // ── ENVÍO AL BACKEND ─────────────────────────────────────────
  const payload = { ...data.value }
  delete payload.confirmPassword

  cargando.value = true
  try {
    await axiosInstance.post('/usuario/register', payload)
    notifySuccess('¡Cuenta creada exitosamente! Redirigiendo al login...', 'person_add')
    // Limpiar formulario y redirigir al login
    data.value = { name: '', email: '', dob: '', password: '', confirmPassword: '' }
    setTimeout(() => router.push({ name: 'loginUsuario' }), 1800)
  } catch (error) {
    console.error('[register] Error:', error.response?.data || error.message)
    // Mostrar EXACTAMENTE el mensaje del backend, sin filtros
    const msg = error.response?.data?.error
             || error.response?.data?.message
             || error.response?.data?.msg
             || 'Error al registrar. Verifica tus datos e intenta de nuevo.'
    notifyError(msg, 'error_outline')
  } finally {
    cargando.value = false
  }
}

</script>

<style scoped lang="scss">
$primary: #7311d4;
$light: #8f3ce6;
$gold: #D4AF37;
$bg: #191022;
$surface: #231630;

.page {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: $bg;
  color: #e5e7eb;
  
  .bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at top left, rgba($primary, 0.2), transparent);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 24rem;
      height: 24rem;
      background: rgba($primary, 0.1);
      border-radius: 50%;
      filter: blur(96px);
      opacity: 0.5;
    }
  }
}

.spinner {
  width: 1.2em;
  height: 1.2em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}




.card {
  max-width: 70rem; /* Mejor límite de ancho ~1120px */
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 37.5rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10;
  border: 1px solid rgba($primary, 0.2);
  background: $surface;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    max-width: 35rem; /* Centra el diseño cuando colapsa */
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  position: relative;
  
  .bg-img {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.6;
    mix-blend-mode: overlay;
  }
  
  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, $bg, rgba($primary, 0.2), transparent);
    z-index: 1;
  }
  
  .content {
    position: relative;
    z-index: 10;
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
      
      h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        margin: 0;
        
        .primary { color: $primary; }
      }
    }
    
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      color: white;
      margin: 0 0 1.5rem 0;
    }
    
    p {
      font-size: 1.125rem;
      color: #d1d5db;
      font-weight: 300;
      line-height: 1.5;
    }
    
    .testimonial {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: auto;
      
      .avatars {
        display: flex;
        
        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border: 2px solid $bg;
          object-fit: cover;
          margin-left: -0.75rem;
          
          &:first-child { margin-left: 0; }
        }
      }
      
      .rating {
        .stars {
          display: flex;
          gap: 0.125rem;
          margin-bottom: 0.25rem;
        }
        
        p {
          font-size: 0.875rem;
          color: #d1d5db;
          margin: 0;
          font-weight: normal;
          
          strong { color: white; }
        }
      }
    }
  }
}

.right {
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 100%;
  box-sizing: border-box; /* Previene desbordamiento */
  
  /* Ajustes para tablet/móvil */
  @media (max-width: 768px) {
    padding: 2rem 1.5rem 5rem 1.5rem; /* El 5rem de abajo es para que no se pise con el footer fijo */
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem 4.5rem 1rem;
  }
}

.top-link {
  /* position: absolute REEMPLAZADO por flujo normal */
  width: 100%;
  text-align: right;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #9ca3af;
  word-wrap: break-word; /* Rompe el texto si no cabe */
  
  a {
    color: $primary;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.25rem;
    white-space: nowrap; /* Evita que el hipervínculo se parta feo */
    
    &:hover { color: $light; }
  }
}

.form-section {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  
  
  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin: 0 0 0.5rem 0;
  }
  
  > p {
    color: #9ca3af;
    margin: 0 0 2rem 0;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #d1d5db;
    margin-left: 0.25rem;
  }
  
  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    
    i {
      position: absolute;
      left: 0.75rem;
      color: #6b7280;
      transition: color 0.2s;
      pointer-events: none;
    }
    
    input {
      width: 100%;
      box-sizing: border-box; /* FUNDAMENTAL para que padding no rompa el ancho en móviles */
      padding: 0.75rem 2.5rem 0.75rem 2.5rem; /* El primer 2.5rem da espacio al botón del ojo, el segundo al candado */
      border: 1px solid #374151;
      border-radius: 0.5rem;
      background: rgba($bg, 0.5);
      color: #f3f4f6;
      font-size: 0.875rem;
      transition: all 0.2s;
      
      &::placeholder { color: #9ca3af; }
      
      &:focus {
        outline: none;
        border-color: $primary;
        box-shadow: 0 0 0 1px $primary;
        
        ~ i { color: $gold; }
      }
      
      &.date-input { color-scheme: dark; }
      
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px $surface inset !important;
        -webkit-text-fill-color: white !important;
      }
    }
    
    .toggle-pwd {
      position: absolute;
      left: auto; /* IMPORTANTE: Anula el left del selector 'i' general */
      right: 0.75rem;
      cursor: pointer;
      color: #6b7280;
      pointer-events: auto; /* Restaurar poder hacer click */
      z-index: 10; /* Asegura quedar por encima de otros inputs/textos */
      
      &:hover { color: #d1d5db; }
    }
  }
  
  .hint {
    font-size: 0.75rem;
    color: rgba($primary, 0.8);
    margin-left: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.25rem;
  }
}

.btn-submit {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: $primary;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 0 15px rgba($primary, 0.5);
  margin-top: 0.5rem;
  
  &:hover {
    background: $light;
    box-shadow: 0 0 25px rgba($primary, 0.7);
  }
}

.divider {
  position: relative;
  margin: 2rem 0 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    border-top: 1px solid #374151;
  }
  
  &::after {
    content: attr(data-label);
    position: relative;
    display: inline-block;
    padding: 0 0.75rem;
    background: $surface;
    z-index: 1;
  }
}

.social {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.social-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  background: rgba($bg, 0.5);
  color: #d1d5db;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.bottom-link {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: $bg; /* Mismo fondo de la app */
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
  padding: 1rem;
  z-index: 50; /* Que quede siempre frente a los inputs al hacer scroll */
  box-sizing: border-box;
  margin: 0; /* Resetea el margin previo */
  border-top: 1px solid rgba($primary, 0.3); /* Separador sutil */
  
  @media (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }
  
  a {
    color: $primary;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.25rem;
    
    &:hover { color: $light; }
  }
}

.gt-sm {
  @media (max-width: 640px) { display: none; }
}

.gt-md {
  @media (max-width: 768px) { display: none; }
}

.lt-md {
  @media (min-width: 768px) { display: none; }
}.btn-back-fixed {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  background: rgba($surface, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba($primary, 0.4);
  border-radius: 2rem; /* Forma de píldora */
  color: #e5e7eb;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);

  &:hover {
    background: $primary;
    color: white;
    border-color: $light;
    box-shadow: 0 6px 16px rgba($primary, 0.4);
    transform: translateY(-2px); /* Pequeño salto al hacer hover */
  }

  /* Ajustes responsivos para pantallas más pequeñas */
  @media (max-width: 600px) {
    top: 10px;
    left: 10px;
    padding: 0.4rem 0.9rem;
    font-size: 0.8rem;
  }
}
</style>
