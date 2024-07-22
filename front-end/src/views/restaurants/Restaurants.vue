<template>
    <div class="restaurants">
        <h1>Ресторанти</h1>

        <button class="button secondary" @click="openModal('create')">
            <i class="icon-plus" />
            Добави ресторант
        </button>

        <template v-for="restaurant in restaurantStore.list.data" :key="restaurant._id">
            <div class="restaurant">
                <div class="restaurant-header">{{ restaurant.name }}</div>
                <div class="restaurant-content">
                    <div>{{ restaurant.address }}</div>
                    <div>{{ restaurant.phoneNumber }}</div>
                </div>
                <div class="restaurant-footer">
                    <button class="button secondary" @click="openModal('update', restaurant)">
                        <i class="icon-write" />
                    </button>
                    <button class="button secondary" @click="openModal('delete', restaurant)">
                        <i class="icon-trash" />
                    </button>
                </div>
            </div>
        </template>
    </div>

    <CreateRestaurant v-if="modals.create" v-model="modals.create" />
    <UpdateRestaurant v-if="modals.update" v-model="modals.update" :restaurant-details="restaurantDetails" />
    <DeleteRestaurant v-if="modals.delete" v-model="modals.delete" :restaurant-details="restaurantDetails" />
</template>

<script setup>
    import { onBeforeUnmount, onMounted, ref } from 'vue'
    import { useRestaurantStore } from '@/stores/restaurant'

    import CreateRestaurant from '@/modals/restaurant/CreateRestaurant.vue'
    import UpdateRestaurant from '@/modals/restaurant/UpdateRestaurant.vue'
    import DeleteRestaurant from '@/modals/restaurant/DeleteRestaurant.vue'

    const restaurantStore = useRestaurantStore()
    const modals = ref({
        create: false,
        update: false,
        delete: false,
    })
    const restaurantDetails = ref({})

    function openModal(modal, restaurant = null) {
        modals.value[modal] = true

        restaurantDetails.value = restaurant ?? {}
    }

    onMounted(async () => {
        await restaurantStore.fetchRestaurantsList()
    })

    onBeforeUnmount(() => {
        restaurantStore.truncateRestaurantsList()
    })
</script>
