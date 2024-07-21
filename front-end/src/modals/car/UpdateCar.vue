<template>
    <Modal v-model="showModal">
        <form action="" @submit.prevent="onSubmit">
            <div class="form-header">
                <h1>Редактиране на автомобил</h1>
            </div>

            <div class="form-content">
                <FormInput v-model="make" name="make" label="Марка" :error="errors.make" required />

                <FormInput v-model="model" name="model" label="Модел" :error="errors.model" required />

                <FormInput v-model="color" name="color" label="Цвят" :error="errors.color" required />

                <FormInput
                    v-model="registration"
                    name="registration"
                    label="Регистрационен №"
                    :error="errors.registration"
                    required
                />

                <FormInput
                    v-model="insuranceDueDate"
                    name="insuranceDueDate"
                    label="Падежна дата ГО"
                    type="date"
                    :error="errors.insuranceDueDate"
                    required
                />

                <FormInput
                    v-model="motDate"
                    name="motDate"
                    label="Падежна дата ГТП"
                    type="date"
                    :error="errors.motDate"
                    required
                />

                <FormInput
                    v-model="nextOilChange"
                    name="nextOilChange"
                    label="Следващо обслужване (км)"
                    type="number"
                    :error="errors.nextOilChange"
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
    import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
    import { useForm, useField } from 'vee-validate'

    import Modal from '@/components/shared/Modal.vue'
    import FormInput from '@/components/shared/FormInput.vue'

    import { useCarStore } from '@/stores/car'

    import { readableDate } from '@/utils/utils'

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

    const validationSchema = {}

    const { resetForm, setErrors, setFieldValue, errors, meta } = useForm({
        validationSchema,
    })

    const { value: make } = useField('make')
    const { value: model } = useField('model')
    const { value: color } = useField('color')
    const { value: registration } = useField('registration')
    const { value: insuranceDueDate } = useField('insuranceDueDate')
    const { value: motDate } = useField('motDate')
    const { value: nextOilChange } = useField('nextOilChange')

    async function onSubmit() {
        if (!meta.value.valid) return

        formLoading.value = true

        try {
            let formData = {
                make: make.value,
                model: model.value,
                color: color.value,
                registration: registration.value,
                insuranceDueDate: new Date(insuranceDueDate.value),
                motDate: new Date(motDate.value),
                nextOilChange: nextOilChange.value,
            }

            const response = await carStore.updateCar(props.carDetails._id, formData)

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
        setFieldValue('make', props.carDetails.make)
        setFieldValue('model', props.carDetails.model)
        setFieldValue('color', props.carDetails.color)
        setFieldValue('registration', props.carDetails.registration)
        setFieldValue('insuranceDueDate', readableDate(props.carDetails.insuranceDueDate))
        setFieldValue('motDate', readableDate(props.carDetails.motDate))
        setFieldValue('nextOilChange', props.carDetails.nextOilChange)
    })
</script>
