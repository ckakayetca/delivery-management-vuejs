<template>
    <Teleport to="body">
        <div v-if="modelValue" class="modal-container">
            <dialog ref="modalElement" class="modal">
                <i class="icon-cross modal-close-btn" @click="closeModal" />

                <slot />
            </dialog>
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
        document.body.classList.remove('has-open-modal')
        emit('update:modelValue', false)
    }

    // on outside click
    function onOutsideClick(event) {
        if (modalElement.value && modalElement.value != event.target && !modalElement.value.contains(event.target)) {
            document.removeEventListener('click', onOutsideClick, true)

            closeModal()
        }
    }

    onMounted(() => {
        document.addEventListener('click', onOutsideClick, true)
        document.body.classList.add('has-open-modal')
    })
</script>
