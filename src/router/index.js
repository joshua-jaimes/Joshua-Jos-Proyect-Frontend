import { createRouter, createWebHistory } from 'vue-router'

import LoginUsuario from '../views/loginUsuario.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import LecturaDiaria from '../views/LecturaDiaria.vue'
import Adminpanel from '../views/Adminpanel.vue'
import GeneradorNumeroPrincipal from '../views/GeneradorNumeroPrincipal.vue'
import PerfilUsuario from '../views/PerfilUsuario.vue'
import MembresiasYPagos from '../views/membresías_y_pagos.vue'
import MisLecturas from '../views/MisLecturas.vue'
/* import LoginAdministrador from '../views/loginAdministrador.vue' */

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
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/LecturaDiaria',
    name: 'LecturaDiaria',
    component: LecturaDiaria
  },
  {
    path: '/adminpanel',
    name: 'adminpanel',
    component: Adminpanel
  },
  {
    path: '/generador-principal',
    name: 'GeneradorNumeroPrincipal',
    component: GeneradorNumeroPrincipal
  },
  {
    path: '/perfil',
    name: 'PerfilUsuario',
    component: PerfilUsuario
  },
  {
    path: '/membresias',
    name: 'MembresiasYPagos',
    component: MembresiasYPagos
  },
  {
    path: '/mis-lecturas',
    name: 'MisLecturas',
    component: MisLecturas
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