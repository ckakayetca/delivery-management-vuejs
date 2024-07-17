<template>
    <template v-if="isLoading">
        <Loader />
    </template>

    <template v-else>
        <CoreHeader />

        <main class="container">
            <router-view />
        </main>

        <CoreFooter />
    </template>
</template>

<script setup>
    import { ref } from 'vue'

    import CoreFooter from './components/core/CoreFooter.vue'
    import CoreHeader from './components/core/CoreHeader.vue'

    import { useAuthStore } from '@/stores/authStore'

    const authStore = useAuthStore()
    const isLoading = ref(false)

    authStore.init().then(() => {
        isLoading.value = false
    })
</script>

<style lang="scss">
    @import 'assets/sass/app.scss';
</style>
