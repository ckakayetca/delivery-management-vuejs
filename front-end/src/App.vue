<script setup>
import CoreFooter from './components/core/CoreFooter.vue';
import CoreHeader from './components/core/CoreHeader.vue';
</script>

<template>
  <CoreHeader />

  <main class="container"> 
    <router-view />
  </main>
  
  <CoreFooter />
</template>

<style lang="scss">
@import 'assets/sass/app.scss';
</style>
