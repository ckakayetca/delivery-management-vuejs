<template>
    <Loader v-if="reportStore.list.state === 'loading'" />

    <template v-else-if="reportStore.list.state === 'loaded'">
        <div class="reports">
            <h1>{{ ownReports ? 'Моите отчети' : 'Отчети' }}</h1>

            <table>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Ресторант</th>
                        <th>Кола</th>
                        <th>Оборот</th>
                        <th>Доставки</th>
                        <th>Takeaway/Glovo</th>
                        <th>Доставки</th>
                        <th>Оборот</th>
                        <th>Други</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="report in reportStore.list.data" :key="report._id">
                        <tr>
                            <td>{{ report.date }}</td>
                            <td>{{ report.restaurant.name }}</td>
                            <td>{{ report.car.make }} {{ report.car.model }}</td>
                            <td>{{ report.amountR }}</td>
                            <td>{{ report.deliveriesR }}</td>
                            <td>{{ report.amountTG }}</td>
                            <td>{{ report.deliveriesTG }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </template>

    <template v-else>
        <div>Error</div>
    </template>
</template>

<script setup>
    import { onBeforeMount, computed } from 'vue'

    import { useReportStore } from '@/stores/report'

    import { useRoute } from 'vue-router'

    const route = useRoute()

    const reportStore = useReportStore()
    const ownReports = computed(() => (route.name === 'MyReports' ? true : false))

    onBeforeMount(() => {
        reportStore.fetchReportsList(ownReports.value)
    })
</script>
