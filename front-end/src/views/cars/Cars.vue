<template>
    <div class="cars">
        <h1>Коли</h1>

        <template v-for="car in carStore.list.data" :key="car._id">
            <div class="car">
                <div class="car-header">{{ car.color }} {{ car.make }} {{ car.model }} - {{ car.registration }}</div>
                <div class="car-content">
                    <div>Падежна дата ГО: {{ fullDate(car.insuranceDueDate) }}</div>
                    <div>Падежна дата ГО: {{ fullDate(car.motDate) }}</div>
                    <div>Следващо обслужване (км): {{ car.nextOilChange }}</div>

                    <template v-if="car.insuranceDueDate < new Date(Date.now() - 7 * day)">
                        <div class="alert">ГО изтича след по-малко от 7 дни</div>
                    </template>
                </div>
                <div class="car-footer">
                    <button class="button secondary">
                        <i class="icon-write" />
                    </button>
                    <button class="button secondary">
                        <i class="icon-trash" />
                    </button>
                </div>
            </div>
        </template>

        <button class="button secondary" @click="openModal">
            <i class="icon-plus" />
            Добави кола
        </button>
    </div>

    <CreateCar v-model="showModal" />
</template>

<script setup>
    import { onBeforeUnmount, onMounted, ref } from 'vue'
    import { useCarStore } from '@/stores/car'

    import { fullDate, day } from '@/utils/utils'

    import CreateCar from '@/modals/car/CreateCar.vue'

    const carStore = useCarStore()
    const showModal = ref(false)

    function openModal() {
        showModal.value = true
    }

    onMounted(async () => {
        await carStore.fetchCarsList()
    })

    onBeforeUnmount(() => {
        carStore.truncateCarsList()
    })
</script>
