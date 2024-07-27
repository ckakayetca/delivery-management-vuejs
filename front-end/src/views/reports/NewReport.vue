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
                <FormInput v-model="date" name="date" label="Дата" type="date" :error="errors.date" required />

                <div class="separator" />
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

                <div class="separator" />
                <h2>Ресторант</h2>

                <div class="dual-box">
                    <FormInput
                        v-model="amountR"
                        :error="errors.amountR"
                        name="amountR"
                        label="Оборот"
                        type="number"
                        required
                    />
                    <FormInput
                        v-model="deliveriesR"
                        :error="errors.deliveriesR"
                        name="deliveriesR"
                        type="number"
                        label="Брой доставки"
                        required
                    />
                </div>

                <div class="separator" />
                <h2>Takeaway/Glovo</h2>

                <div class="dual-box">
                    <FormInput
                        v-model="amountTG"
                        :error="errors.amountTG"
                        name="amountTG"
                        type="number"
                        label="Общ оборот"
                        required
                    />
                    <FormInput
                        v-model="deliveriesTG"
                        :error="errors.deliveriesTG"
                        name="deliveriesTG"
                        label="Брой доставки"
                        type="number"
                        required
                    />
                </div>

                <div class="separator" />

                <FormInput v-model="fuel" :error="errors.fuel" type="number" name="fuel" label="Гориво" />
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
    import { useRouter } from 'vue-router'

    import SelectField from '@/components/shared/SelectField.vue'
    import FormInput from '@/components/shared/FormInput.vue'

    import { useReportStore } from '@/stores/report'

    import { readableDate } from '@/utils/date'

    const emit = defineEmits(['update:modelValue'])

    const router = useRouter()

    const reportStore = useReportStore()
    const formLoading = ref(false)

    const validationSchema = {
        date: (value) => {
            if (!value) {
                return 'Полето е задължително'
            }

            return true
        },
        restaurant: (value) => {
            if (!value) {
                return 'Полето е задължително'
            }

            return true
        },
        amountR: (value) => {
            if (!value) {
                return 'Полето е задължително'
            }

            if (isNaN(Number(value))) {
                return 'Моля, въведете валидно число'
            }

            return true
        },
        deliveriesR: (value) => {
            if (!value) {
                return 'Полето е задължително'
            }

            if (isNaN(Number(value)) || Math.floor(Number(value)) !== Number(value)) {
                return 'Моля, въведете валидно число'
            }

            return true
        },
        amountTG: (value) => {
            if (!value) {
                return 'Полето е задължително'
            }

            if (isNaN(Number(value))) {
                return 'Моля, въведете валидно число'
            }

            return true
        },
        deliveriesTG: (value) => {
            if (!value) {
                return 'Полето е задължително'
            }

            if (isNaN(Number(value)) || Math.floor(Number(value)) !== Number(value)) {
                return 'Моля, въведете валидно число'
            }

            return true
        },
        car: (value) => {
            if (!value) {
                return 'Полето е задължително'
            }

            return true
        },
        fuel: (value) => {
            if (value && isNaN(Number(value))) {
                return 'Моля, въведете валидно число'
            }

            return true
        },
    }

    const { resetForm, setErrors, setFieldValue, errors, meta } = useForm({
        validationSchema,
    })

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
                date: date.value,
                restaurant: restaurant.value.value,
                amountR: amountR.value,
                deliveriesR: deliveriesR.value,
                amountTG: amountTG.value,
                deliveriesTG: deliveriesTG.value,
                car: car.value.value,
                fuel: fuel.value ?? 0,
            }

            console.log('Sending:', formData)

            const response = await reportStore.createReport(formData)

            if (response.status === 201) {
                router.push({ name: 'MyReports' })
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
        setFieldValue('date', readableDate(new Date()))
    })
</script>
