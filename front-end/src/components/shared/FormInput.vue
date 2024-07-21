<template>
    <div class="form-control">
        <label :for="name">{{ label }} <span v-if="required">*</span></label>

        <input
            :id="name"
            :class="type === 'date' ? 'datepicker' : null"
            :type="type"
            :required="required"
            :name="name"
            :value="modelValue"
            v-bind="$attrs"
            @input="onChange"
        />

        <template v-if="error">
            <p class="error">{{ error }}</p>
        </template>
    </div>
</template>

<script setup>
    const emit = defineEmits(['update:modelValue'])

    const props = defineProps({
        modelValue: {
            type: [String, Number],
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        error: {
            type: String,
            default: null,
        },
        type: {
            type: String,
            default: 'text',
        },
        name: {
            type: String,
            required: true,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
    })

    function onChange(event) {
        emit('update:modelValue', event.target.value)
    }
</script>
