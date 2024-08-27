<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import ChevronDown from '../Icons/ChevronDown.vue';

interface Props {
    modelValue?: string;
    title?: string;
    placeholder?: string;
    name: string;
    type?: 'text' | 'number' | 'date';
    min?: string;
    max?: string;
    mask?: string; // предполагаем, что строка
    viewType?: 'select' | 'double';
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'focus', 'change']);
const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref<boolean>(false);
const minValue = computed<number | undefined>(() => parseInt(props.min ?? ''));
const maxValue = computed<number | undefined>(() => parseInt(props.max ?? ''));
const viewTypeClass = computed(() => {
    if (props.viewType === 'select') return 'BaseInput--select';
    if (props.viewType === 'double') return 'BaseInput--double';
});
const hasValueOrFocus = computed<boolean>(
    () => !!props.modelValue || isFocused.value
);
const titlePosition = computed<string>(() =>
    hasValueOrFocus.value ? '10px' : '24.5px'
);

const computedState = computed({
    get(): string | undefined {
        return props.modelValue;
    },
    set(value: string | undefined) {
        emit('change', value);
        emit('update:modelValue', value);
    },
});

onMounted(() => {
    if (inputRef.value) {
        inputRef.value.addEventListener('focus', onFocus);
        inputRef.value.addEventListener('blur', onBlur);
    }
});

onUnmounted(() => {
    if (inputRef.value) {
        inputRef.value.removeEventListener('focus', onFocus);
        inputRef.value.removeEventListener('blur', onBlur);
    }
});

const onFocus = (): void => {
    isFocused.value = true;
    setTimeout(() => emit('focus', isFocused.value), 100);
};

const onBlur = (): void => {
    isFocused.value = false;
    setTimeout(() => emit('focus', isFocused.value), 100);
};

const maskOptions = ref<string | undefined>(props.mask);
</script>

<template>
    <div class="BaseInput" :class="[viewTypeClass]" v-if="name">
        <ChevronDown
            class="BaseInput__icon--chevron"
            v-if="viewType === 'select'"
        />
        <p class="BaseInput__title" v-if="title">{{ title }}</p>
        <input
            v-mask
            :data-maska="maskOptions"
            ref="inputRef"
            :type="type ?? 'text'"
            class="BaseInput__field"
            :name="name"
            :max="maxValue"
            :min="minValue"
            v-model="computedState"
            :placeholder="placeholder"
            :id="`${name}--BaseInput`"
        />
    </div>
</template>

<style lang="scss">
.BaseInput {
    position: relative;
    width: 100%;
    height: 64px;

    &--double {
        .BaseInput {
            &__field {
                padding: 22px 20px 22px 40px;
                text-align: right;
            }
            &__title {
                left: 21px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

    &--select {
        cursor: pointer;
    }

    &__icon {
        &--chevron {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 10px;
            height: 6px;
        }
    }

    &__title {
        position: absolute;
        top: v-bind(titlePosition);
        left: 21px;
        font-size: 14px;
        font-weight: 300;
        line-height: 15.4px;
        color: var(--secondaryColor);
        transition: top 0.3s ease-in-out;
        pointer-events: none;
        user-select: none;
    }

    &__field {
        padding: 33px 20px 10px 20px;
        width: 100%;
        height: 100%;
        color: var(--secondaryColor);
        font-size: 18px;
        font-weight: 500;
        transition: padding 0.3s ease-in-out;
        outline: unset;
        border: 2px solid var(--thirthColor-border);
        border-radius: 6px;

        &:active,
        &:focus {
            .BaseInput__title {
                top: 10px;
            }
        }
    }
}
</style>
