<template>
    <form action="" class="login" @submit.prevent="onSubmit">
        <div class="form-header">
            <h1 class="login-title">Вход</h1>
        </div>

        <div class="form-content">
            <FormInput v-model="username" name="username" label="Потребителско име" :error="errors.username" required />

            <FormInput
                v-model="password"
                name="password"
                label="Парола"
                :error="errors.password"
                type="password"
                required
            />
        </div>

        <div class="form-footer">
            <button @click.prevent="onSubmit">Вход</button>
        </div>
    </form>
</template>

<script setup>
    import FormInput from '../../components/shared/FormInput.vue'
    import { useAuthStore } from '../../stores/authStore'

    import { useForm, useField } from 'vee-validate'

    import { useRouter } from 'vue-router'

    const router = useRouter()
    const authStore = useAuthStore()

    const validationSchema = {
        username: (value) => {
            if (value === null || value === undefined || value === '') {
                return 'Потребителското име е задължително'
            }

            return true
        },
        password: (value) => {
            if (value === null || value === undefined || value === '') {
                return 'Паролата е задължителна'
            }

            return true
        },
    }

    const { setErrors, setFieldValue, errors, meta } = useForm({
        validationSchema,
    })

    const { value: username } = useField('username')
    const { value: password } = useField('password')

    async function onSubmit() {
        if (!meta.value.valid) return

        try {
            let formData = {
                username: username.value,
                password: password.value,
            }

            const response = await authStore.login(formData)

            if (response === 200) {
                router.push({ name: 'Home' })
            }
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }
</script>
