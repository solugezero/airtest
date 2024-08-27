<script setup lang="ts">
import ResidentModal from '@/components/ResidentModal.vue';
import ModalView from './components/ModalView.vue';
</script>

<template>
    <div id="app">
        <ModalView />
        <ResidentModal />
    </div>
</template>

<style lang="scss">
@import './assets/scss/main.scss';

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
