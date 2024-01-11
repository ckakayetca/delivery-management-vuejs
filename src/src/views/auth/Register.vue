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

        }
    },
    methods: {
        async onSubmit() {

        }
    }
}
</script>

<template>
    <form action="" class="register" @submit.prevent="onSubmit">
        <h1>Регистрация</h1>

        <fieldset>

        </fieldset>
    </form>
</template>

<style></style>