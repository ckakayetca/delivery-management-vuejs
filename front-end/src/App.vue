<script setup>
import CoreFooter from './components/core/CoreFooter.vue';
import CoreHeader from './components/core/CoreHeader.vue';
</script>

<template>
  <CoreHeader></CoreHeader>
  <div class="container" id="main">
    <router-view></router-view>
  </div>
  <CoreFooter></CoreFooter>
</template>

<style lang="scss">
@import 'assets/sass/app.scss';
</style>
