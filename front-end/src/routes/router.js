import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import NewReport from '../views/reports/NewReport.vue'
import Reports from '../views/reports/Reports.vue'
import Home from '../views/Home.vue'
import AdminPanel from '../views/AdminPanel.vue'
import Cars from '../views/cars/Cars.vue'
import Restaurants from '../views/restaurants/Restaurants.vue'
import Users from '../views/users/Users.vue'
import Error from '../views/Error.vue'
import NotFound from '../views/NotFound.vue'

// guard:
// 'none' - no guard
// 'auth' - only authenticated users
// 'admin' - only admin users

const routes = [
    { path: '/', name: 'Home', component: Home, meta: { guard: 'auth' } },
    { path: '/reports', name: 'ReportsList', component: Reports, meta: { guard: 'admin' } },
    { path: '/reports/create', name: 'NewReport', component: NewReport, meta: { guard: 'auth' } },
    { path: '/auth/login', name: 'Login', component: Login, meta: { guard: 'none' } },
    { path: '/auth/register', name: 'Register', component: Register, meta: { guard: 'admin' } },
    { path: '/my-reports', name: 'MyReports', component: Reports, meta: { guard: 'auth' } },
    { path: '/cars', name: 'CarsList', component: Cars, meta: { guard: 'admin' } },
    { path: '/restaurants', name: 'RestaurantsList', component: Restaurants, meta: { guard: 'admin' } },
    { path: '/users', name: 'UsersList', component: Users, meta: { guard: 'admin' } },
    { path: '/admin-panel', name: 'AdminPanel', component: AdminPanel, meta: { guard: 'admin' } },
    { path: '/error', name: 'Error', component: Error, props: true, meta: { guard: 'none' } },
    { path: '/:pathMatch(.*)*', component: NotFound, meta: { guard: 'none' } },
]

const router = createRouter({
    useHash: true,
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes,
})

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()

    if (!authStore.isLoggedIn && ['auth', 'admin'].includes(to.meta.guard)) {
        return { name: 'Login' }
    }

    if (!authStore.isAdmin && to.meta.guard === 'admin') {
        return { name: 'Home' }
    }

    if (authStore.isLoggedIn && to.name === 'Login') {
        return { name: 'Home' }
    }
})

export default router
