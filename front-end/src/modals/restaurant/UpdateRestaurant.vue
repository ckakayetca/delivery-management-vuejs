<template>
    <Modal v-model="showModal">
        <form action="" @submit.prevent="onSubmit">
            <div class="form-header">
                <h1>Редактиране на автомобил</h1>
            </div>

            <div class="form-content">
                <FormInput v-model="name" name="name" label="Име" :error="errors.name" required />

                <FormInput v-model="address" name="address" label="Адрес" :error="errors.address" required />

                <FormInput
                    v-model="phoneNumber"
                    name="phoneNumber"
                    label="Телефонен номер"
                    :error="errors.phoneNumber"
                    required
                />
            </div>

            <div class="form-footer">
                <button class="button primary" :disabled="!meta.valid || formLoading" @click.prevent="onSubmit">
                    Редактиране
                </button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue'
    import { useForm, useField } from 'vee-validate'

    import Modal from '@/components/shared/Modal.vue'
    import FormInput from '@/components/shared/FormInput.vue'

    import { useRestaurantStore } from '@/stores/restaurant'

    import { readableDate } from '@/utils/date'

    const props = defineProps({
        modelValue: {
            type: Boolean,
            required: true,
        },
        restaurantDetails: {
            type: Object,
            required: true,
        },
    })

    const emit = defineEmits(['update:modelValue'])

    const restaurantStore = useRestaurantStore()
    const showModal = ref(props.modelValue)
    const formLoading = ref(false)

    const validationSchema = {}

    const { resetForm, setErrors, setFieldValue, errors, meta } = useForm({
        validationSchema,
    })

    const { value: name } = useField('name')
    const { value: address } = useField('address')
    const { value: phoneNumber } = useField('phoneNumber')

    async function onSubmit() {
        if (!meta.value.valid) return

        formLoading.value = true

        try {
            let formData = {
                name: name.value,
                address: address.value,
                phoneNumber: phoneNumber.value,
            }

            const response = await restaurantStore.updateRestaurant(props.restaurantDetails._id, formData)

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

        if (!showModal.value) {
            resetForm()
        }
    })

    watch(
        () => props.modelValue,
        (newValue) => {
            showModal.value = newValue
        },
    )

    onMounted(() => {
        setFieldValue('name', props.restaurantDetails.name)
        setFieldValue('address', props.restaurantDetails.address)
        setFieldValue('phoneNumber', props.restaurantDetails.phoneNumber)
    })
</script>
