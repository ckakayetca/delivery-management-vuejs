<script>
import { useAuthStore } from '../../stores/authstore';
import { mapState } from 'pinia';

export default {
    setup() {
        return {
            authStore: useAuthStore(),
        }
    },
    data() {

    },
    computed: {
        ...mapState(useAuthStore, ['isAdmin', 'isLoggedIn', 'user']),
    }
}
</script>

<template>
    <header class="nav-header">
        <nav>
            <ul>
                <li><strong>Delivery Management</strong></li>
            </ul>
            <ul>
                <template v-if="isLoggedIn">
                    <li v-if="isAdmin"><a href="#">Отчети</a></li>
                    <li><a href="#">Нов отчет</a></li>
                    <li><a href="#">Моите отчети</a></li>
                    <li><a href="#" role="button">Изход</a></li>
                </template>
                <li v-else><a href="#" role="button">Вход</a></li>
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