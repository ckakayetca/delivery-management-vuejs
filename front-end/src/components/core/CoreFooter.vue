<template>
    <footer class="core-footer">
        <h1 class="firma">EG Solutions LTD</h1>
    </footer>
    <button @click="verify">Verify token</button>
    <button @click="getProfile">Get Profile</button>
</template>

<script>
    import { verifyToken, getProfile } from '../../api/api';

    export default {
        methods: {
            verify: verifyToken,
            getProfile: getProfile,
        }
    }
</script>

<style>
    .core-footer {
        background-color: rgb(15, 34, 49);
        justify-self: flex-end;
        display: flex;
        justify-content: center;
        padding: 0;
    }

    .firma {
        padding: 0;
        margin: 0.5em;
    }
</style>