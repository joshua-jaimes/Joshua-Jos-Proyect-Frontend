import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../plugins/pluginAxios.js";

export const useAuthStore = defineStore("auth", () => {

    const token = ref("")
    const usuario = ref(null)
    const error = ref("")

    async function login(email, password) {
        error.value = ""
        try {
            const response = await axiosInstance.post(
                "/usuario/login",
                {
                    email,
                    password
                }
            )

            token.value = response.data.token
            usuario.value = response.data.usuario

            return true  // 👈 IMPORTANTE
        } catch (err) {
            console.error("Error en login:", err)
            error.value = err.response?.data?.error || err.response?.data?.message || err.response?.data?.msg || "Error al iniciar sesión"
            return false // 👈 IMPORTANTE
        }
    }

    // ══ Cerrar sesión ════════════════════════════════════════
    function logout() {
        token.value = ''
        usuario.value = null
        error.value = ''
    }

    return {
        token,
        usuario,
        error,
        login,
        logout
    }

}, { persist: true })