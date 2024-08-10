import { createApp } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import App from './App.vue'
import router from './routes/router'
import { createPinia } from 'pinia'
import Loader from './components/shared/Loader.vue'
import Toast, { POSITION } from 'vue-toastification'

async function bootstrap() {
    const pinia = createPinia()
    const app = createApp(App)

    app.component('Loader', Loader)
    app.use(Toast, {
        position: POSITION.TOP_CENTER,
    })

    app.use(pinia)
    await useAuthStore().init()

    app.use(router)

    app.mount('#app')
}

bootstrap()
