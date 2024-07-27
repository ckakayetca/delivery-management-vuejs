<template>
    <Loader v-if="reportStore.list.state === 'loading'" />

    <template v-else-if="reportStore.list.state === 'loaded'">
        <div class="reports">
            <button class="button secondary">Филтриране</button>
            <h1>{{ ownReports ? 'Моите отчети' : 'Отчети' }}</h1>

            <template v-if="!reportStore.list.data.length">
                <div>Няма намерени отчети</div>
            </template>

            <template v-else>
                <table>
                    <thead>
                        <tr>
                            <th>Дата</th>
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
                            <td colspan="3" class="text-right">Общо:</td>
                            <td class="text-center">{{ reportStore.list.totals.totalAmountR }} лв</td>
                            <td class="text-center">{{ reportStore.list.totals.totalAmountTG }} лв</td>
                            <td colspan="2" class="text-center">{{ reportStore.list.totals.totalDeliveries }}</td>
                        </tr>
                    </tfoot>
                </table>
                <h3 class="total-amount">Общ оборот: {{ reportStore.list.totals.totalAmount }} лв.</h3>
            </template>
        </div>
    </template>

    <template v-else>
        <div>Error</div>
    </template>
</template>

<script setup>
    import { onBeforeMount, computed, watch } from 'vue'

    import { useReportStore } from '@/stores/report'

    import { useRoute } from 'vue-router'

    import { fullDate, lastWeek } from '@/utils/date'

    const route = useRoute()

    const reportStore = useReportStore()
    const ownReports = computed(() => (route.name === 'MyReports' ? true : false))

    onBeforeMount(() => {
        reportStore.fetchReportsList(ownReports.value, route.query)
    })

    watch(
        () => route.query,
        () => {
            reportStore.fetchReportsList(ownReports.value, route.query)
        },
    )
</script>
