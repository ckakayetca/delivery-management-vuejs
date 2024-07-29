import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import { createPinia } from 'pinia'
import Loader from './components/shared/Loader.vue'
import Toast, { POSITION } from 'vue-toastification'

const pinia = createPinia()
const app = createApp(App)

app.component('Loader', Loader)
app.use(Toast, {
    position: POSITION.TOP_CENTER,
})
app.use(pinia)
app.use(router)

app.mount('#app')
