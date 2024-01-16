<script>
import FormInput from '../../components/shared/FormInput.vue'
import useVuelidate from '@vuelidate/core'
import { login } from '../../api/api'

export default {
    components: { FormInput },
    setup() {
        return {
            v$: useVuelidate(),
        }
    },
    data() {
        return {
            formData: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        async onSubmit() {
            const res = await this.v$.$validate();

            if (!res) {
                return
            }

            const response = await login(this.formData);

            if(response.status == 200) {
                this.$router.push('/')
            }
        },
    },
    validations() {
        return {
            formData: {
                username: {
                    type: String,
                    required: true,
                },
                password: {
                    type: String,
                    required: true,
                },
            }
        }
    }
}
</script>

<template>
    <form action="" class="login" @submit.prevent="onSubmit">
        <h1>Login</h1>

        <fieldset>
            <FormInput field="username" label="Потребителско име" required v-model="formData.username" :v$="v$"></FormInput>

            <FormInput type="password" field="password" label="Парола" required v-model="formData.password" :v$="v$"></FormInput>

            <button>Вход</button>
        </fieldset>
    </form>
</template>

<style>
.login {
    width: 30em;
}

.login h1 {
    text-align: center;
}

.login .form-control {
    margin: 1em;
}
</style>