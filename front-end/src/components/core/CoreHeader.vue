<script setup>
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore()


</script>

<template>
    <header class="nav-header">
        <nav>
            <ul>
                <li>
                    <strong>Delivery</strong>
                </li>
            </ul>

            <ul class="desktop">
                <template v-if="authStore.isLoggedIn">
                    <li v-if="authStore.isAdmin"><a href="#">Отчети</a></li>
                    <li><a href="#">Нов отчет</a></li>
                    <li><a href="#">Моите отчети</a></li>
                    <li><a href="#" role="button">Изход</a></li>
                </template>
                <li v-else><a href="#" role="button">Вход</a></li>
            </ul>

            <ul class="mobile">
                <li>
                <button class="menu-btn">
                    Menu
                </button>
                </li>
            </ul>
        </nav>
    </header>
</template>