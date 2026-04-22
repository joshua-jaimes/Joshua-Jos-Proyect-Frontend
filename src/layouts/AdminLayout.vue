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
        <router-link :to="{ name: 'adminpanel' }" class="nav-item" exact-active-class="active">
          <span class="mi nav-icon">dashboard</span>
          Panel de Control
        </router-link>
        
        <router-link :to="{ name: 'AdminUsuarios' }" class="nav-item" exact-active-class="active">
          <span class="mi nav-icon">manage_accounts</span>
          Pagos y Gestión de Usuarios
        </router-link>
        
        <router-link :to="{ name: 'AdminPagos' }" class="nav-item" exact-active-class="active">
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
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
</style>
