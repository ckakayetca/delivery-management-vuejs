<template>
    <div class="form-control">
        <label :for="field">{{ label }} <span v-if="required">*</span></label>

        <select v-if="type == 'select'" :id="field" :required="required" :value="modelValue" @input="onChange"
            @blur="v$.formData[field].$touch">
            <slot>
                <option> No options </option>
            </slot>
        </select>

        <input v-else :type="type" :id="field" :required="required" :value="modelValue" @input="onChange"
            @blur="v$.formData[field].$touch">


        <template v-if="v$?.formData[field]">
            <p class="error" v-for="error in v$.formData[field].$errors"> {{ error.$message }}</p>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        v$: {
            type: Object
        },
        modelValue: {},
        field: {
            required: true,
            type: String,
        },
        label: {
            required: true,
            type: String,
        },
        type: {
            type: String,
        },
        required: {
            type: Boolean,
        }
    },
    emits: ['update:modelValue'],
    methods: {
        onChange(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    },
}
</script>

