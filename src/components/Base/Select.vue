<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import BaseInput from './Input.vue';

interface ISelectItem {
    name: string;
    value: string;
}

interface Props {
    modelValue?: ISelectItem | ISelectItem[];
    title?: string;
    options: ISelectItem[];
    name: string;
    multiply?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'change']);
const viewOptions = ref<boolean>(false);

const computedState = computed({
    get(): ISelectItem | ISelectItem[] | undefined {
        return props.modelValue;
    },
    set(value: ISelectItem | ISelectItem[] | undefined) {
        emit('update:modelValue', value);
        emit('change', value);
    },
});

const computedStateValues = computed(() => {
    const { multiply } = props;
    if (Array.isArray(computedState.value) && multiply) {
        return computedState.value.map((item) => item.value);
    } else if (!Array.isArray(computedState.value)) {
        return computedState.value?.value;
    }
});

const selectItem = (item: ISelectItem) => {
    const { multiply } = props;
    if (multiply) {
        if (computedStateValues.value?.includes(item.value)) {
            if (!Array.isArray(computedState.value)) computedState.value = [];
            computedState.value = computedState.value?.filter(
                (i) => i.value !== item.value
            );
        } else {
            if (!Array.isArray(computedState.value)) computedState.value = [];
            computedState.value = [...computedState.value, item];
        }
    } else {
        computedState.value = item;
        selectedValueName.value = item.name;
    }
};

const selectedValueName = ref<string>('');

onMounted(() => {
    const { multiply } = props;
    if (multiply) {
        computedState.value = [];
        watch(
            () => computedStateValues.value,
            () => {
                const { multiply } = props;
                if (multiply && Array.isArray(computedState.value)) {
                    selectedValueName.value = computedState.value
                        .map((i) => i.name)
                        .join(', ');
                }
            },
            {
                deep: true,
            }
        );
    }
});
</script>

<template>
    <div class="BaseSelect">
        <BaseInput
            class="BaseSelect__field"
            v-model="selectedValueName"
            :name="name"
            type="text"
            :title="title"
            :viewType="'select'"
            @focus="(value) => (viewOptions = value)"
        />
        <div class="BaseSelect_dropdown" v-if="viewOptions">
            <button
                @click="selectItem(item)"
                class="BaseSelect__item"
                type="button"
                v-for="(item, idx) in options"
                :key="`BaseSelect__${name}--${idx}`"
            >
                {{ item.name }}
            </button>
        </div>
    </div>
</template>

<style lang="scss">
.BaseSelect {
    position: relative;
    display: flex;
    flex-direction: column;

    &__item {
        text-align: start;
        padding: 5px 10px;
        background: unset;
    }

    &_dropdown {
        position: absolute;
        top: calc(100% + 5px);
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        z-index: 10;
        background: var(--thirthColor);
        border-radius: 6px;
        -webkit-box-shadow: 0px 0px 18px 0px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 0px 0px 18px 0px rgba(34, 60, 80, 0.2);
        box-shadow: 0px 0px 18px 0px rgba(34, 60, 80, 0.2);
    }
}
</style>
