import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import MyReports from '../views/reports/MyReports.vue';
import NewReport from '../views/reports/NewReport.vue';
import Reports from '../views/reports/Reports.vue';
import Error from '../views/Error.vue';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/reports', component: Reports },
    { path: '/reports/create', component: NewReport },
    { path: '/auth/login', component: Login },
    { path: '/auth/register', component: Register },
    { path: '/my-reports', component: Reports },
    { path: '/error', name: 'error', component: Error, props: true },
    { path: '/:pathMatch(.*)*', component: NotFound }
]

const router = createRouter({
    useHash: true,
    history: createWebHistory(),
    routes
});

export default router;