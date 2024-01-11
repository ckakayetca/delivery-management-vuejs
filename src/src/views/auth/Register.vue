<script>
import FormInput from '../../components/shared/FormInput.vue';
import useVuelidate from '@vuelidate/core';
import * as vuelidators from '@vuelidate/validators';

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
                name: '',
                password: '',
                tel: '',
                role: '',
            }
        }
    },
    validations() {
        return {
            formData: {
                username: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                tel: {
                    type: String,
                    required: true,
                },
                password: {
                    type: String,
                    required: true,
                    minLength: vuelidators.helpers.withMessage('Паролата трябва да е поне 5 символа!', vuelidators.minLength(5)),
                },
                role: {
                    type: String,
                    required: true,
                }
            }
        }
    },
    methods: {
        async onSubmit() {
            const res = await this.v$.$validate();

            if(!res) {
                return
            }
        }
    }
}
</script>

<template>
    <form action="" class="register" @submit.prevent="onSubmit">
        <h1>Регистрация</h1>

        <fieldset>
            <FormInput field="username" label="Потребителско име" required v-model="formData.username" :v$="v$">
                <template v-slot:input></template>
            </FormInput>

            <FormInput field="name" label="Име" required v-model="formData.name" :v$="v$"></FormInput>

            <FormInput field="tel" label="Телефон" required v-model="formData.tel" :v$="v$"></FormInput>

            <FormInput type="password" field="password" label="Парола" required v-model="formData.password" :v$="v$"></FormInput>

            <FormInput type="select" field="role" label="Вид потребител" required v-model="formData.role" :v$="v$">
                <option value="admin">Администратор</option>
                <option value="driver">Шофьор</option>
            </FormInput>

        </fieldset>
        <button>Продължи</button>
    </form>
</template>

<style>
.register {
    width: 30em;
}

.register h1 {
    text-align: center;
}

.register .form-control {
    margin: 1em;
}
</style>