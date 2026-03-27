asar · VUE
Copiar

<template>
  <div class="page">
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
  <label>Edad</label>
  <div class="input-wrapper">
    <q-icon name="calendar_today" />
    <input v-model="data.age" type="number" min="0" placeholder="Ej. 25" />
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
                <input v-model="data.password" :type="showPwd ? 'text' : 'password'" placeholder="••••••••" />
                <q-icon :name="showPwd ? 'visibility' : 'visibility_off'" class="toggle-pwd" @click="showPwd=!showPwd" />
              </div>
            </div>
            <div class="field">
              <label>Confirmar Contraseña</label>
              <div class="input-wrapper">
                <q-icon name="lock_outline" />
                <input v-model="data.confirmPassword" :type="showPwd ? 'text' : 'password'" placeholder="••••••••" />
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

import { ref } from 'vue'
import { useRouter } from 'vue-router'   
import axiosInstance from '../plugins/pluginAxios.js'
import { useNotify } from '../composables/useNotify'

const router = useRouter()             



const data = ref({ 
  name: '', 
  email: '', 
  dob: '', 
  age: '',   // 👈 nuevo campo
  password: '',
  confirmPassword: ''
})

const showPwd = ref(false)
const cargando = ref(false)
const { notifySuccess, notifyError } = useNotify()

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

  // ── EDAD ────────────────────────────────────────────────────
  if (data.value.age === '' || data.value.age === null || data.value.age === undefined) {
    notifyError('La edad es obligatoria', 'error_outline')
    return
  }
  const edadNum = Number(data.value.age)
  if (isNaN(edadNum) || !Number.isInteger(edadNum)) {
    notifyError('La edad debe ser un número válido', 'error_outline')
    return
  }
  if (edadNum < 1) {
    notifyError('La edad debe ser mayor a 0', 'error_outline')
    return
  }
  if (edadNum < 18) {
    notifyError('Debes ser mayor de 18 años para registrarte', 'error_outline')
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

  // ── CONTRASEÑA ───────────────────────────────────────────────
  if (!data.value.password) {
    notifyError('La contraseña es obligatoria', 'error_outline')
    return
  }
  if (data.value.password.length < 8) {
    notifyError('La contraseña debe tener mínimo 8 caracteres', 'error_outline')
    return
  }
  if (!/[A-Z]/.test(data.value.password)) {
    notifyError('La contraseña debe incluir al menos una letra mayúscula', 'error_outline')
    return
  }
  if (!/\d/.test(data.value.password)) {
    notifyError('La contraseña debe incluir al menos un número', 'error_outline')
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
    const response = await axiosInstance.post("/usuario/register", payload)
    notifySuccess('Usuario registrado correctamente. Bienvenido al universo.', 'person_add')
    console.log(response.data)
  } catch (error) {
    console.error(error)
    const status  = error.response?.status
    const msg     = error.response?.data?.error
                 || error.response?.data?.message
                 || error.response?.data?.msg

    // Mensajes específicos según el tipo de error del backend
    if (status === 400 && msg?.toLowerCase().includes('email')) {
      notifyError('Este correo ya está registrado, intenta con uno diferente', 'error_outline')
    } else if (status === 400 && msg?.toLowerCase().includes('duplicado')) {
      notifyError('Este usuario ya existe en el sistema', 'error_outline')
    } else if (status === 409) {
      notifyError('Este correo o usuario ya está registrado, intenta con uno diferente', 'error_outline')
    } else if (status >= 500) {
      notifyError('Ocurrió un error en el servidor, intenta de nuevo más tarde', 'error_outline')
    } else {
      notifyError(msg || 'Error al registrar usuario, verifica los datos e intenta de nuevo', 'error_outline')
    }
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
  max-width: 112rem;
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
}

.top-link {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2rem;
  font-size: 0.875rem;
  color: #9ca3af;
  
  a {
    color: $primary;
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.25rem;
    
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
    
    i {
      position: absolute;
      left: 0.75rem;
      color: #6b7280;
      transition: color 0.2s;
      pointer-events: none;
    }
    
    input {
      width: 100%;
      padding: 0.75rem 0.75rem 0.75rem 2.5rem;
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
      right: 0.75rem;
      cursor: pointer;
      color: #6b7280;
      
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
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 2rem;
  
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
}
</style>
