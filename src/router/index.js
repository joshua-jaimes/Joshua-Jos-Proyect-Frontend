import { createRouter, createWebHistory } from 'vue-router'

import LoginUsuario from '../views/loginUsuario.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import LecturaDiaria from '../views/LecturaDiaria.vue'
import Adminpanel from '../views/Adminpanel.vue'
import AdminUsuarios from '../views/AdminUsuarios.vue'
import GeneradorNumeroPrincipal from '../views/GeneradorNumeroPrincipal.vue'
import PerfilUsuario from '../views/PerfilUsuario.vue'
import MembresiasYPagos from '../views/Membresias_y_Pagos.vue'
import MisLecturas from '../views/MisLecturas.vue'
import PagoExitoso from '../views/PagoExitoso.vue'
import PagoFallido from '../views/PagoFallido.vue'
import PagoPendiente from '../views/PagoPendiente.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
/* import LoginAdministrador from '../views/loginAdministrador.vue' */

import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    name: 'loginUsuario',
    component: LoginUsuario
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/adminpanel',
    name: 'adminpanel',
    component: Adminpanel
  },
  {
    path: '/admin-usuarios',
    name: 'AdminUsuarios',
    component: AdminUsuarios
  },
  // Rutas de resultados de pago (sin layout, accesibles sin auth para que MP redirija)
  {
    path: '/pago-exitoso',
    name: 'PagoExitoso',
    component: PagoExitoso
  },
  {
    path: '/pago-fallido',
    name: 'PagoFallido',
    component: PagoFallido
  },
  {
    path: '/pago-pendiente',
    name: 'PagoPendiente',
    component: PagoPendiente
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: 'LecturaDiaria',
        name: 'LecturaDiaria',
        component: LecturaDiaria
      },
      {
        path: 'generador-principal',
        name: 'GeneradorNumeroPrincipal',
        component: GeneradorNumeroPrincipal
      },
      {
        path: 'perfil',
        name: 'PerfilUsuario',
        component: PerfilUsuario
      },
      {
        path: 'membresias',
        name: 'MembresiasYPagos',
        component: MembresiasYPagos
      },
      {
        path: 'mis-lecturas',
        name: 'MisLecturas',
        component: MisLecturas
      }
    ]
  }




  /*  {
     path: '/admin',
     name: 'loginAdministrador',
     component: LoginAdministrador
   } */
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router