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

<template>
    <div class="form-control">
        <label :for="field">{{ label }} <span v-if="required">*</span></label>
        <slot>
            <input :type="type" :id="field" :required="required" :value="modelValue" @input="onChange"
                @blur="v$.formData[field].$touch">
        </slot>
        <template v-if="v$?.formData[field]">
            <p class="error" v-for="error in v$.formData[field].$errors"> {{ error.$message }}</p>
        </template>
    </div>

</template>


<style></style>