import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import NewReport from '../views/reports/NewReport.vue'
import Reports from '../views/reports/Reports.vue'
import Error from '../views/Error.vue'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import AdminPanel from '../views/AdminPanel.vue'
import Cars from '../views/cars/Cars.vue'
import Restaurants from '../views/restaurants/Restaurants.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/reports', name: 'ReportsList', component: Reports },
    { path: '/reports/create', name: 'NewReport', component: NewReport },
    { path: '/auth/login', name: 'Login', component: Login },
    { path: '/auth/register', name: 'Register', component: Register },
    { path: '/my-reports', name: 'MyReports', component: Reports },
    { path: '/cars', name: 'CarsList', component: Cars },
    { path: '/restaurants', name: 'RestaurantsList', component: Restaurants },
    { path: '/error', name: 'Error', component: Error, props: true },
    { path: '/admin-panel', name: 'AdminPanel', component: AdminPanel },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
    useHash: true,
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes,
})

export default router
