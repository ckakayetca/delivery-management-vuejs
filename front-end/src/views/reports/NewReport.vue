<template>
    <form action="" @submit.prevent="onSubmit">
        <div class="form-header">
            <h1>Създаване на отчет</h1>
        </div>

        <div class="form-content">
            <template v-if="reportCreateDataState === 'loading'">
                <Loader />
            </template>

            <template v-else-if="reportCreateDataState === 'loaded'">
                <SelectField
                    v-model="restaurant"
                    :error="errors.restaurant"
                    :options="reportCreateData.restaurants"
                    required
                    name="restaurant"
                    label="Ресторант"
                />

                <SelectField
                    v-model="car"
                    :error="errors.car"
                    :options="reportCreateData.cars"
                    required
                    name="car"
                    label="Кола"
                />

                <div class="dual-box">
                    <FormInput v-model="amountR" :error="errors.amountR" name="amountR" label="Сума Р" required />
                    <FormInput
                        v-model="deliveriesR"
                        :error="errors.deliveriesR"
                        name="deliveriesR"
                        label="Доставки Р"
                        required
                    />
                </div>

                <div class="dual-box">
                    <FormInput
                        v-model="amountTG"
                        :error="errors.amountTG"
                        name="amountTG"
                        label="Сума Takeaway/Glovo"
                        required
                    />
                    <FormInput
                        v-model="deliveriesTG"
                        :error="errors.deliveriesTG"
                        name="deliveriesTG"
                        label="Доставки Takeaway/Glovo"
                        required
                    />
                </div>

                <FormInput
                    v-model="fuel"
                    :error="errors.fuel"
                    type="number"
                    name="fuel"
                    label="Гориво (сума)"
                    required
                />
            </template>

            <template v-else>
                <p>Нещо се обърка!</p>
                <p>Моля, опитайте отново!</p>
            </template>
        </div>

        <div class="form-footer">
            <button class="button primary" :disabled="!meta.valid || formLoading" @click.prevent="onSubmit">
                Добавяне
            </button>
        </div>
    </form>
</template>

<script setup>
    import { ref, computed, watch, onBeforeMount } from 'vue'
    import { useForm, useField } from 'vee-validate'

    import SelectField from '@/components/shared/SelectField.vue'
    import FormInput from '@/components/shared/FormInput.vue'

    import { useReportStore } from '@/stores/report'

    const emit = defineEmits(['update:modelValue'])

    const reportStore = useReportStore()
    const formLoading = ref(false)

    const validationSchema = {}

    const { resetForm, setErrors, setFieldValue, errors, meta } = useForm({
        validationSchema,
    })

    // fields of the form
    // date: {
    //     type: Date,
    //     required: true,
    // },
    // restaurant: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Restaurant',
    //     required: true,
    // },
    // amountR: {
    //     type: Number,
    //     required: true,
    // },
    // deliveriesR: {
    //     type: Number,
    //     required: true,
    // },
    // amountTG: {
    //     type: Number,
    //     required: true,
    // },
    // deliveriesTG: {
    //     type: Number,
    //     required: true,
    // },
    // car: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Car',
    //     required: true,
    // },
    // fuel: {
    //     type: Number,
    //     required: true,
    // },
    // postedBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    // },

    const { value: date } = useField('date')
    const { value: restaurant } = useField('restaurant')
    const { value: amountR } = useField('amountR')
    const { value: deliveriesR } = useField('deliveriesR')
    const { value: amountTG } = useField('amountTG')
    const { value: deliveriesTG } = useField('deliveriesTG')
    const { value: car } = useField('car')
    const { value: fuel } = useField('fuel')

    const reportCreateData = computed(() => reportStore.create.data)
    const reportCreateDataState = computed(() => reportStore.create.state)

    async function onSubmit() {
        if (!meta.value.valid) return

        formLoading.value = true

        try {
            let formData = {
                make: make.value,
                model: model.value,
                color: color.value,
            }

            const response = await reportStore.createReport(formData)

            if (response.status === 201) {
                showModal.value = false
            }
        } catch (error) {
            console.log(error)
        }

        formLoading.value = false
    }
    onBeforeMount(async () => {
        await reportStore.fetchReportCreateData()

        setFieldValue('restaurant', reportCreateData.value.restaurants[0])
        setFieldValue('car', reportCreateData.value.cars[0])
    })
</script>
