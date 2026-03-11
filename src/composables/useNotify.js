/**
 * useNotify — Composable reutilizable para notificaciones Quasar
 * Usa Notify.create() directamente (compatible con Vite + Quasar sin CLI)
 */
import { Notify } from 'quasar'

// Configuración base compartida por todas las notificaciones
const base = {
    position: 'top-right',
    timeout: 3500,
    progress: true,
    actions: [{ icon: 'close', color: 'white', round: true }],
}

export function useNotify() {

    /** Éxito: login correcto, lectura guardada, etc. */
    const notifySuccess = (message, icon = 'auto_awesome') => {
        Notify.create({
            ...base,
            type: 'positive',
            icon,
            message,
        })
    }

    /** Error: credenciales inválidas, error de red, etc. */
    const notifyError = (message, icon = 'error') => {
        Notify.create({
            ...base,
            type: 'negative',
            icon,
            message,
        })
    }

    /** Advertencia: acción bloqueada, límite alcanzado, etc. */
    const notifyWarning = (message, icon = 'warning_amber') => {
        Notify.create({
            ...base,
            type: 'warning',
            icon,
            message,
        })
    }

    /** Información: datos del sistema, estado neutro */
    const notifyInfo = (message, icon = 'info') => {
        Notify.create({
            ...base,
            type: 'info',
            icon,
            message,
        })
    }

    /** Proceso en curso: generando lectura, cargando, etc. */
    const notifyLoading = (message = 'Consultando el universo...') => {
        return Notify.create({
            ...base,
            type: 'ongoing',
            icon: 'auto_fix_high',
            message,
            timeout: 0,     // no se cierra solo
            progress: false, // ongoing no usa barra
        })
    }

    return { notifySuccess, notifyError, notifyWarning, notifyInfo, notifyLoading }
}
