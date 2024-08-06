<template>
    <form action="" class="register" @submit.prevent="onSubmit">
        <div class="form-header">
            <h1>Регистрация</h1>
        </div>

        <div class="form-content">
            <FormInput v-model="username" :error="errors.username" name="username" label="Потребителско име" required />

            <FormInput v-model="name" :error="errors.name" name="name" label="Име" required />

            <FormInput v-model="tel" :error="errors.tel" name="tel" label="Телефон" required />

            <FormInput
                v-model="password"
                :error="errors.password"
                type="password"
                name="password"
                label="Парола"
                required
            />

            <SelectField
                v-model="role"
                :error="errors.role"
                :options="roleOptions"
                required
                name="role"
                label="Права"
            />
        </div>

        <div class="form-footer">
            <button class="button primary">Продължи</button>
        </div>
    </form>
</template>

<script setup>
    import { onBeforeMount } from 'vue'

    import { useAuthStore } from '@/stores/authStore'
    import { useForm, useField } from 'vee-validate'
    import { useRouter } from 'vue-router'
    import { useToast } from 'vue-toastification'

    import FormInput from '@/components/shared/FormInput.vue'
    import SelectField from '@/components/shared/SelectField.vue'

    const roleOptions = [
        { value: 'admin', label: 'Администратор' },
        { value: 'driver', label: 'Шофьор' },
    ]

    const toast = useToast()
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

            if (value.length < 5) {
                return 'Паролата трябва да бъде поне 5 символа'
            }

            return true
        },
        name: (value) => {
            if (value === null || value === undefined || value === '') {
                return 'Името е задължително'
            }

            return true
        },
        tel: (value) => {
            if (value === null || value === undefined || value === '') {
                return 'Телефонът е задължителен'
            }

            return true
        },
        role: (value) => {
            if (value === null || value === undefined || value === '') {
                return 'Правата са задължителни'
            }

            return true
        },
    }

    const { setErrors, setFieldValue, errors, meta } = useForm({
        validationSchema,
    })

    const { value: username } = useField('username')
    const { value: password } = useField('password')
    const { value: name } = useField('name')
    const { value: tel } = useField('tel')
    const { value: role } = useField('role')

    async function onSubmit() {
        if (!meta.value.valid) return

        try {
            let formData = {
                username: username.value,
                password: password.value,
                name: name.value,
                tel: tel.value,
                role: role.value.value,
            }

            const response = await authStore.register(formData)

            if (response === 200) {
                toast.success('Успешна регистрация!')
                router.push({ name: 'Login' })
            } else {
                toast.error('Неуспешна регистрация!')
            }
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    onBeforeMount(() => {
        setFieldValue('role', 'driver')
    })
</script>
