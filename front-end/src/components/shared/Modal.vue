<template>
    <Teleport to="body">
        <div v-if="modelValue" class="modal-container">
            <div ref="modalElement" class="modal">
                <i class="icon-cross modal-close-btn" @click="closeModal" />

                <slot />
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import { onMounted, ref, watch } from 'vue'

    const props = defineProps({
        /**
         * Whether the modal is open or not
         * @type {Boolean}
         */
        modelValue: {
            type: Boolean,
            required: true,
        },
    })

    const emit = defineEmits(['update:modelValue'])

    const modalElement = ref(null)

    function closeModal() {
        emit('update:modelValue', false)
    }

    // on outside click
    function onOutsideClick(event) {
        if (modalElement.value && modalElement.value != event.target && !modalElement.value.contains(event.target)) {
            document.removeEventListener('click', onOutsideClick, true)

            emit('update:modelValue', false)
        }
    }

    onMounted(() => {
        document.addEventListener('click', onOutsideClick, true)
    })
</script>
