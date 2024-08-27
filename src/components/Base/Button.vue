<script setup lang="ts"></script>

<template>
    <button class="baseButton">
        <slot />
    </button>
</template>

<style lang="scss">
.baseButton {
    height: 38px;
    border-radius: 1000px; // 1000px in figma ?????
    color: var(--thirthColor);
    background: var(--secondaryColor);
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    max-width: 160px;
    transition: background 0.3s ease-in-out;

    &:hover {
        background: var(--secondaryColor-hover);
    }
}
</style>
