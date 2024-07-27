<template>
    <div class="form-control">
        <label :for="name">{{ label }} <span v-if="required">*</span></label>

        <select :id="name" :name="name" v-bind="$attrs" @input="onChange">
            <option
                v-for="option in formattedOptions"
                :key="option.value"
                :selected="modelValue?.value === option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>

        <template v-if="error">
            <p class="error">{{ error }}</p>
        </template>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { onMounted, watch } from 'vue'

    const emit = defineEmits(['update:modelValue'])

    const props = defineProps({
        modelValue: {
            type: [String, Object, null],
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
        name: {
            type: String,
            required: true,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
        options: {
            type: Array,
            default: () => [],
        },
    })

    function onChange(event) {
        emit('update:modelValue', event.target.value)
    }

    function findOptionByValue(value) {
        return props.options.find((option) => option.value === value) ?? value
    }

    const formattedOptions = computed(() => {
        return props.options.map((option) => {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option,
                }
            }

            return option
        })
    })

    watch(
        () => props.modelValue,
        (value) => {
            if (!value) {
                return
            }

            if (!value.label || !value.value) {
                emit('update:modelValue', findOptionByValue(value))
                return
            }
        },
    )

    onMounted(() => {
        if (!props.modelValue) {
            emit('update:modelValue', '')
            return
        }

        if (!props.modelValue.label || !props.modelValue.value) {
            emit('update:modelValue', findOptionByValue(props.modelValue))
        }
    })
</script>
