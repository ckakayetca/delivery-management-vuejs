<template>
    <div class="w-full flex flex-col">
        <router-link :to="{ name: 'CarsList' }">
            <button class="button secondary">Коли</button>
        </router-link>

        <router-link :to="{ name: 'RestaurantsList' }">
            <button class="button secondary">Ресторанти</button>
        </router-link>

        <router-link :to="{ name: 'ReportsList' }">
            <button class="button primary">Отчети</button>
        </router-link>

        <router-link :to="{ name: 'Register' }">
            <button class="button primary">Нов потребител</button>
        </router-link>
    </div>
</template>

<script setup></script>
