<template>
    <template v-if="!authStore.isLoggedIn">
        <h1 class="welcome">Добре дошли!</h1>
        <router-link :to="{ name: 'Login' }">
            <button class="login-btn">Вход</button>
        </router-link>
    </template>

    <template v-else>
        <h1 class="welcome">Добре дошъл, {{ authStore.getUser.name.split(' ')[0] }}!</h1>
        <button>Моите отчети</button>
        <button>Нов отчет</button>
    </template>
</template>

<script setup>
	import { useAuthStore } from '../stores/authStore'

	const authStore = useAuthStore()
</script>
