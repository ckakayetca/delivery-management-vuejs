<template>
    <div class="form-control">
        <label :for="name">{{ label }} <span v-if="required">*</span></label>

        <select :name="name" :id="name" v-bind="$attrs" @input="onChange">
            <option value="" disabled>Изберете...</option>
            <option v-for="option in options" :key="option.value" :selected="modelValue.value === option.value" :value="option.value">{{ option.label }}</option>
        </select>

        <template v-if="error">
            <p class="error"> {{ error }}</p>
        </template>
    </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: [String, Object],
        default: null
    },
    label: {
        type: String,
        default: null
    },
    error: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        required: true,
        default: null
    },
    required: {
        type: Boolean,
        default: false
    },
    options: {
        type: Array,
        default: () => []
    }
})

function onChange(event) {
    console.log(event.target.value)
    emit('update:modelValue', event.target.value)
}

function findOptionByValue(value) {
    return props.options.find(option => option.value === value) ?? value
}

watch(() => props.modelValue,
    (value) => {
        if (!value.label || !value.value) {
            emit('update:modelValue', findOptionByValue(value))
            return
        }
    })

onMounted(() => {
    if (!props.modelValue.label || !props.modelValue.value) {
        emit('update:modelValue', findOptionByValue(props.modelValue))
    }
})
</script>

