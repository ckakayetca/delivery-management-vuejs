<template>
    <Loader v-if="dataState === 'loading'" />

    <div v-else-if="dataState === 'loaded'" class="users-list">
        <div v-for="user in usersList" :key="user._id" class="user-card">
            <p>Потребителско име: {{ user.username }}</p>
            <p>Име: {{ user.name }}</p>
            <p>Телефон: {{ user.tel }}</p>
            <p>Права: {{ user.role === 'admin' ? 'Администратор' : 'Шофьор' }}</p>

            <button class="button secondary">Преглед на отчетите</button>
        </div>
    </div>

    <div v-else class="error">opa ko stana</div>
</template>

<script setup>
    import { useUserStore } from '@/stores/user'
    import { onBeforeMount, computed } from 'vue'

    const userStore = useUserStore()

    const dataState = computed(() => userStore.list.state)
    const usersList = computed(() => userStore.list.data)

    onBeforeMount(() => {
        userStore.fetchUsersList()
    })
</script>
