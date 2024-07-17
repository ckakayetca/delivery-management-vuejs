<template>
    <header class="nav-header">
        <nav>
            <ul>
                <li @click="$router.push({ name: 'Home' })">
                    <strong>Delivery</strong>
                </li>
            </ul>

            <ul class="desktop">
                <template v-if="authStore.isLoggedIn">
                    <li v-if="authStore.isAdmin"><a href="#">Отчети</a></li>
                    <li><a href="#">Нов отчет</a></li>
                    <li><a href="#">Моите отчети</a></li>
                    <li><button @click="onLogout">Изход</button></li>
                </template>
                <li v-else>
                    <a href="#" role="button">Вход</a>
                </li>
            </ul>

            <ul class="mobile">
                <li>
                    <button class="menu-btn">Menu</button>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { useAuthStore } from '../../stores/authStore'

    const route = useRoute()
    const router = useRouter()

    const authStore = useAuthStore()

    async function onLogout() {
        await authStore.logout()

        if (route.name !== 'Login') {
            router.push({ name: 'Login' })
        }
    }
</script>
