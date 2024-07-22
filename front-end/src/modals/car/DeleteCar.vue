<template>
    <Modal v-model="showModal">
        <form action="" @submit.prevent="onSubmit">
            <div class="form-header">
                <h1>Изтриване на автомобил</h1>
            </div>

            <div class="form-content">
                <p>
                    Сигурни ли сте, че искате да изтриете {{ carDetails.color }} {{ carDetails.make }}
                    {{ carDetails.model }}?
                </p>
            </div>

            <div class="form-footer">
                <button class="button primary" :disabled="formLoading" @click.prevent="onSubmit">Изтриване</button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
    import { ref, watch } from 'vue'

    import Modal from '@/components/shared/Modal.vue'

    import { useCarStore } from '@/stores/car'
    const props = defineProps({
        modelValue: {
            type: Boolean,
            required: true,
        },
        carDetails: {
            type: Object,
            required: true,
        },
    })

    const emit = defineEmits(['update:modelValue'])

    const carStore = useCarStore()
    const showModal = ref(props.modelValue)
    const formLoading = ref(false)

    async function onSubmit() {
        formLoading.value = true

        try {
            const response = await carStore.deleteCar(props.carDetails._id)

            if (response.status === 200) {
                showModal.value = false
            }
        } catch (error) {
            console.log(error)
        }

        formLoading.value = false
    }

    watch(showModal, () => {
        emit('update:modelValue', showModal.value)
    })

    watch(
        () => props.modelValue,
        (newValue) => {
            showModal.value = newValue
        },
    )
</script>
