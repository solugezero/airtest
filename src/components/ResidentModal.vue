<script setup lang="ts">
import { useModalStore } from '@/store/useModalStore';
import ResidentModalContent from './ResidentModalContent.vue';
import { ref, toRefs } from 'vue';
import BaseButton from './Base/Button.vue';

const { open } = toRefs(useModalStore());

const openModal = (): void => {
    open.value(ResidentModalContent, undefined);
};
</script>

<template>
    <div class="residentModal">
        <BaseButton class="residentModal__trigger" @click="openModal"
            >Стать резидентом</BaseButton
        >
    </div>
</template>

<style lang="scss">
.residentModal {
    padding: 30px;
}
</style>
