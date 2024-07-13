<script setup>
    import { useAuthStore } from '../../stores/authStore';

    const authStore = useAuthStore()


</script>

<template>
    <header class="nav-header">
        <nav>
            <ul>
                <li><strong>Delivery Management</strong></li>
            </ul>
            <ul>
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
                    <button class="menu-btn">
                        Menu
                    </button>
                </ul>
            </ul>
        </nav>
    </header>
</template>

<style>
.nav-header {
    padding: 0 1em;
    background-color: rgb(15, 34, 49);
}

.nav-header li {
    margin: 0 0.3em;
}
</style>