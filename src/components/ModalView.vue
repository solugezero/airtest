<script setup lang="ts">
import { useModalStore } from '@/store/useModalStore';
import { toRefs, watch } from 'vue';

const { props, view, isOpen, close } = toRefs(useModalStore());

watch(
    () => isOpen,
    () => {
        if (typeof document === 'undefined') return;
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
    },
    {
        immediate: true,
        deep: true,
    }
);
</script>

<template>
    <transition name="fade">
        <div class="modalView" v-if="isOpen" @click="close">
            <div class="modalView_content" @click.stop>
                <component v-bind="props" :is="view" />
            </div>
        </div>
    </transition>
</template>

<style lang="scss">
.modalView {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100dvh;
    background: rgba(0, 0, 0, 0.274);
    z-index: 10;
    padding: 20px;

    @media (max-width: 840px) {
        padding: 0;
    }

    &_content {
        max-height: calc(100dvh - 40px);
        max-width: calc(100dvw - 40px);
        overflow: auto;
        // width: 100%;

        @media (max-width: 840px) {
            max-width: 100%;
            max-height: 100%;
            width: 100%;
        }
    }
}
</style>
