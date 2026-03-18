<template>
  <q-layout view="lHh Lpr lFf">
    <!-- SIDEBAR (EXTRAÍDO DE DASHBOARD) -->
    <q-drawer
      show-if-above
      :width="256"
      class="sidebar"
      side="left"
    >
      <div class="logo-box">
        <div class="logo-icon">
          <q-icon name="auto_awesome" size="lg" />
        </div>
        <h3 class="logo-text">Num<span class="primary">AI</span></h3>
      </div>

      <nav class="nav-menu">
        <router-link :to="{ name: 'dashboard' }" class="nav-item" exact-active-class="active">
          <q-icon name="dashboard" />
          <span>Inicio</span>
        </router-link>
       
        <router-link :to="{ name: 'MisLecturas' }" class="nav-item" exact-active-class="active">
          <q-icon name="library_books" />
          <span>Mis Lecturas</span>
        </router-link>
        
        <div class="nav-divider">
          <p class="divider-text">Cuenta</p>
          <router-link :to="{ name: 'MembresiasYPagos' }" class="nav-item" exact-active-class="active">
            <q-icon name="card_membership" />
            <span>Membresía</span>
          </router-link>
          <router-link :to="{ name: 'PerfilUsuario' }" class="nav-item" exact-active-class="active">
            <q-icon name="person" />
            <span>Perfil</span>
          </router-link>
        </div>
      </nav>

      <div class="user-profile">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJx4eLv1skOsEEfsPV0qDIYSErReSPjx-hO9UyaGI9jOlijk8lQ7xcNRvRTzxD4n1PEHnQGuobGqbZ0bjGqEkOApGiS5mDyTxFAyj0NbjakEH7ptwCFziWRrC2Gfen3stPaj-pAH5ZbQWIXLkTn2rRj2CHgvOZZlmSduCrQV3XnkFZlrPJxpo_4oOZmbPvoTZoiqVP_Ofz2VePL2LBRJG9vNQYeW2KQTshVsic5Ag5syLaaE32FqcPni4osBYCQir8SSwH7H2wvp8" alt="user" class="user-avatar" />
        <div class="user-info">
          <p class="user-name">{{ nombreUsuario }}</p>
          <p class="user-plan">{{ rolLabel }}</p>
        </div>
        <button class="logout-btn" @click="handleLogout">
          <q-icon name="logout" />
        </button>
      </div>
    </q-drawer>

    <!-- MAIN EXPERIENCES WRAPPER -->
    <q-page-container>
      <!-- Vistas anidadas -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from "../stores/Auth.js"
import { computed } from "vue"
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const nombreUsuario = computed(() => auth.usuario?.nombre || "")
const rolLabel = computed(() => {
  const rol = auth.usuario?.rol
  if (rol === 'admin' || rol === 'administrador') return 'Administrador'
  if (auth.usuario?.estado === 1) return 'Místico Pro'
  return 'Plan Gratuito'
})

const handleLogout = () => {
  auth.logout()
  router.push({ name: 'loginUsuario' })
}
</script>

<style scoped lang="scss">
$primary: #7311d4;
$primary-light: #9c4ddb;
$surface-darker: #140c1c;

* { box-sizing: border-box; }

// SIDEBAR REUTILIZANDO LOS MISMOS ESTILOS DEL DASHBOARD ORIGINAL
.sidebar {
  width: 16rem;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex !important;
  flex-direction: column;
  z-index: 20;
  height: 100vh;
  
  @media (prefers-color-scheme: dark) {
    background: $surface-darker;
    border-right-color: #1f2937;
  }

  .logo-box {
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    .logo-icon {
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
      background: $primary;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .logo-text {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      color: #111;

      @media (prefers-color-scheme: dark) {
        color: white;
      }

      .primary {
        color: $primary;
      }
    }
  }

  .nav-menu {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    color: #6b7280;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    cursor: pointer;

    @media (prefers-color-scheme: dark) {
      color: #9ca3af;
    }

    &:hover {
      background: #f3f4f6;
      color: #111;

      @media (prefers-color-scheme: dark) {
        background: rgba(255, 255, 255, 0.05);
        color: white;
      }
    }

    &.active {
      background: rgba($primary, 0.1);
      color: $primary;

      @media (prefers-color-scheme: dark) {
        background: rgba($primary, 0.1);
        color: $primary-light;
      }
    }
  }

  .nav-divider {
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px solid #e5e7eb;

    @media (prefers-color-scheme: dark) {
      border-top-color: #1f2937;
    }

    .divider-text {
      font-size: 0.75rem;
      font-weight: 600;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0 1rem;
      margin-bottom: 0.5rem;
    }
  }

  .user-profile {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    @media (prefers-color-scheme: dark) {
      border-top-color: #1f2937;
    }

    .user-avatar {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 9999px;
      border: 2px solid rgba($primary, 0.3);
      object-fit: cover;
    }

    .user-info {
      flex: 1;
      min-width: 0;
      margin: 0;

      .user-name {
        margin: 0;
        font-size: 0.875rem;
        font-weight: 500;
        color: #111;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (prefers-color-scheme: dark) {
          color: white;
        }
      }

      .user-plan {
        margin: 0;
        font-size: 0.75rem;
        color: #6b7280;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        @media (prefers-color-scheme: dark) {
          color: #9ca3af;
        }
      }
    }

    .logout-btn {
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      transition: color 0.2s;

      &:hover {
        color: #111;

        @media (prefers-color-scheme: dark) {
          color: white;
        }
      }
    }
  }
}
</style>
