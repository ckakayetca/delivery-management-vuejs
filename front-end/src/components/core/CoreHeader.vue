<template>
    <header class="nav-header">
        <nav>
            <ul>
                <li>
                    <router-link :to="{ name: 'Home' }">
                        <button class="button secondary">
                            <i class="icon-home" />
                        </button>
                    </router-link>
                </li>
            </ul>

            <ul class="desktop">
                <template v-if="authStore.isLoggedIn">
                    <li v-if="authStore.isAdmin">
                        <router-link :to="{ name: 'AdminPanel' }">
                            <button class="button secondary no-border">Администраторски панел</button>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'NewReport' }">
                            <button class="button secondary no-border">Нов отчет</button>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'MyReports' }">
                            <button class="button secondary no-border">Моите отчети</button>
                        </router-link>
                    </li>
                    <li><button class="button primary" @click="onLogout">Изход</button></li>
                </template>
                <li v-else>
                    <router-link :to="{ name: 'Login' }">
                        <button class="button secondary">Вход</button>
                    </router-link>
                </li>
            </ul>

            <div class="mobile">
                <button class="button secondary menu-btn" @click="toggleMenu">
                    <i class="icon-user" />
                </button>

                <div v-if="showMenu" ref="mobileMenu" class="mobile-menu" @click="toggleMenu">
                    <div class="links">
                        <template v-if="authStore.isLoggedIn">
                            <router-link v-if="authStore.isAdmin" :to="{ name: 'AdminPanel' }">
                                Администраторски панел
                            </router-link>

                            <router-link :to="{ name: 'NewReport' }">Нов отчет</router-link>

                            <router-link :to="{ name: 'MyReports' }">Моите отчети</router-link>

                            <a href="#" @click="onLogout">Изход</a>
                        </template>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
    import { ref } from 'vue'

    import { useRoute, useRouter } from 'vue-router'
    import { useAuthStore } from '../../stores/authStore'

    const mobileMenu = ref(null)
    const showMenu = ref(false)
    const route = useRoute()
    const router = useRouter()

    const authStore = useAuthStore()

    async function onLogout() {
        await authStore.logout()

        if (route.name !== 'Login') {
            router.push({ name: 'Login' })
        }
    }

    function toggleMenu() {
        showMenu.value = !showMenu.value

        if (showMenu.value) {
            document.addEventListener('click', onClick, true)
        }
    }

    function onClick(event) {
        console.log('onClick')
        if (mobileMenu.value && !mobileMenu.value.contains(event.target)) {
            showMenu.value = false
            document.removeEventListener('click', onClick, true)
        }
    }
</script>
