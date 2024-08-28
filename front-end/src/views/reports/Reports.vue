<template>
    <Loader v-if="reportStore.list.state === 'loading'" />

    <template v-else-if="reportStore.list.state === 'loaded'">
        <div class="reports">
            <h1>{{ ownReports ? 'Моите отчети' : 'Отчети' }}</h1>

            <div class="filters-container">
                <div class="filters">
                    <div class="dual-box">
                        <button class="button primary" @click="handleLastWeek">Миналата седмица</button>
                        <button class="button primary" @click="handleThisWeek">Тази седмица</button>
                    </div>

                    <FormInput
                        v-model="filters.start_date"
                        type="date"
                        label="От"
                        name="start_date"
                        :max="new Date().toISOString().split('T')[0]"
                    />

                    <FormInput
                        v-model="filters.end_date"
                        type="date"
                        label="До"
                        name="end_date"
                        :max="new Date(new Date().getTime() + day).toISOString().split('T')[0]"
                    />
                </div>
            </div>

            <template v-if="!reportStore.list.data.length">
                <div>Няма намерени отчети</div>
            </template>

            <template v-else>
                <table>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Шофьор</th>
                            <th>Ресторант</th>
                            <th>Кола</th>
                            <th>Оборот Р</th>
                            <th>Оборот T/G</th>
                            <th>Доставки Р</th>
                            <th>Доставки T/G</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="report in reportStore.list.data" :key="report._id">
                            <tr>
                                <td>{{ fullDate(report.date) }}</td>
                                <td>{{ report.postedBy.name }}</td>
                                <td>{{ report.restaurant.name }}</td>
                                <td>{{ report.car.color }} {{ report.car.make }} {{ report.car.model }}</td>
                                <td class="text-center">{{ report.amountR.toFixed(2) }} лв</td>
                                <td class="text-center">{{ report.amountTG.toFixed(2) }} лв</td>
                                <td class="text-center">{{ report.deliveriesR }}</td>
                                <td class="text-center">{{ report.deliveriesTG }}</td>
                            </tr>
                        </template>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="4" class="text-right">Общо:</td>
                            <td class="text-center">{{ reportStore.list.totals.totalAmountR }} лв</td>
                            <td class="text-center">{{ reportStore.list.totals.totalAmountTG }} лв</td>
                            <td colspan="2" class="text-center">{{ reportStore.list.totals.totalDeliveries }}</td>
                        </tr>
                    </tfoot>
                </table>
                <h3 class="total-amount">Общ оборот: {{ reportStore.list.totals.totalAmount }} лв.</h3>
                <button class="button primary" @click="handleSheetGenerate">Генериране на доклад</button>
            </template>
        </div>
    </template>

    <template v-else>
        <div>Error</div>
    </template>
</template>

<script setup>
    import { onBeforeMount, computed, watch, ref } from 'vue'

    import FormInput from '@/components/shared/FormInput.vue'

    import { useReportStore } from '@/stores/report'
    import { useCarStore } from '@/stores/car'
    import { useRestaurantStore } from '@/stores/restaurant'

    import { useRoute, useRouter } from 'vue-router'

    import { fullDate, lastWeek, thisWeek, day } from '@/utils/date'

    const route = useRoute()
    const router = useRouter()

    const allowedFilters = ['start_date', 'end_date', 'restaurant', 'car', 'driver']

    function filterQuery(query) {
        return Object.entries(query)
            .filter(([key, value]) => allowedFilters.includes(key) && value)
            .reduce((obj, [key, value]) => {
                obj[key] = value
                return obj
            }, {})
    }

    function handleThisWeek() {
        filters.value = {
            ...filters.value,
            ...thisWeek(),
        }
    }

    function handleLastWeek() {
        filters.value = {
            ...filters.value,
            ...lastWeek(),
        }
    }

    async function handleSheetGenerate() {
        const response = await reportStore.generateSpreadsheet(filters.value)

        if (response.status === 201) {
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(response.data)
            link.download = `spravka1.xlsx`
            link.click()
        }
    }

    const filters = ref({
        start_date: route?.query?.start_date || null,
        end_date: route?.query?.end_date || null,
        restaurant: route?.query?.restaurant || null,
        car: route?.query?.car || null,
        driver: route?.query?.driver || null,
    })

    const reportStore = useReportStore()
    const ownReports = computed(() => (route.name === 'MyReports' ? true : false))

    onBeforeMount(() => {
        reportStore.fetchReportsList(ownReports.value, filterQuery(route.query))
    })

    watch(
        () => route.query,
        () => {
            if (route.name === 'ReportsList') {
                reportStore.fetchReportsList(ownReports.value, filterQuery(route.query))

                filters.value.start_date = route.query.start_date ?? null
                filters.value.end_date = route.query.end_date ?? null
            }
        },
    )

    watch(
        filters,
        (newValue) => {
            if (newValue.start_date) {
                // if the start date is set, set the end date to the current date if it's not set
                const startDate = new Date(newValue.start_date).getTime()
                const endDate = newValue.end_date ? new Date(newValue.end_date).getTime() : new Date().getTime()

                // if somehow the start date is after the end date, swap them
                if (startDate > endDate) {
                    filters.value.start_date = newValue.end_date
                    filters.value.end_date = newValue.start_date
                }

                // if the difference between the start and end date is more than 30 days, set the start date to 30 days before the end date
                if (Math.abs(startDate - endDate) > 30 * day) {
                    filters.value.start_date = new Date(endDate - 30 * day).toISOString().split('T')[0]
                }
            }

            router.push({ query: filterQuery(filters.value) })
        },
        { deep: true },
    )
</script>
