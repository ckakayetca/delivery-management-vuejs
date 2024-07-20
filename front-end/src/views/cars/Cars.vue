<template>
    <div class="cars">
        <h1>Коли</h1>

        <button class="button secondary" @click="openModal">
            <i class="icon-plus" />
            Добави кола
        </button>
    </div>

    <CreateCar v-model="showModal" />
</template>

<script setup>
    import { ref } from 'vue'
    import CreateCar from '../../modals/car/CreateCar.vue'

    const showModal = ref(false)

    function openModal() {
        showModal.value = true
    }
</script>
