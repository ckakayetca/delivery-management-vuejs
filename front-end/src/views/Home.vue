<template>
    <div class="home-page">
        <h1 class="welcome">{{ welcomeMessage }}</h1>
        <template v-if="authStore.isLoggedIn">
            <router-link :to="{ name: 'MyReports' }">
                <button class="button secondary">Моите отчети</button>
            </router-link>

            <router-link :to="{ name: 'MyReports' }">
                <button class="button secondary">Седмичен отчет</button>
            </router-link>

            <router-link :to="{ name: 'NewReport' }">
                <button class="button primary">Нов отчет</button>
            </router-link>
        </template>
        <template v-else>
            <router-link :to="{ name: 'Login' }">
                <button class="button primary">Вход</button>
            </router-link>
        </template>
    </div>
</template>

<script setup>
    import { computed } from 'vue'

    import { useAuthStore } from '../stores/authStore'

    const authStore = useAuthStore()

    const welcomeMessage = computed(() => {
        if (authStore.isLoggedIn) {
            return `Добре дошъл, ${authStore.getUser.name.split(' ')[0]}!`
        } else {
            return 'Добре дошли!'
        }
    })
</script>
