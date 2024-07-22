<template>
    <div class="cars">
        <h1>Коли</h1>

        <button class="button secondary" @click="openModal('create')">
            <i class="icon-plus" />
            Добави кола
        </button>

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
                    <button class="button secondary" @click="openModal('update', car)">
                        <i class="icon-write" />
                    </button>
                    <button class="button secondary" @click="openModal('delete', car)">
                        <i class="icon-trash" />
                    </button>
                </div>
            </div>
        </template>
    </div>

    <CreateCar v-if="modals.create" v-model="modals.create" />
    <UpdateCar v-if="modals.update" v-model="modals.update" :car-details="carDetails" />
    <DeleteCar v-if="modals.delete" v-model="modals.delete" :car-details="carDetails" />
</template>

<script setup>
    import { onBeforeUnmount, onMounted, ref } from 'vue'
    import { useCarStore } from '@/stores/car'

    import { fullDate, day } from '@/utils/utils'

    import CreateCar from '@/modals/car/CreateCar.vue'
    import UpdateCar from '@/modals/car/UpdateCar.vue'
    import DeleteCar from '@/modals/car/DeleteCar.vue'

    const carStore = useCarStore()
    const modals = ref({
        create: false,
        update: false,
        delete: false,
    })
    const carDetails = ref({})

    function openModal(modal, car = null) {
        modals.value[modal] = true

        carDetails.value = car ?? {}
    }

    onMounted(async () => {
        await carStore.fetchCarsList()
    })

    onBeforeUnmount(() => {
        carStore.truncateCarsList()
    })
</script>
