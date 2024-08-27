<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseInput from './Input.vue';

interface IDoubleState {
    from: string;
    to: string;
}

interface Props {
    modelValue?: IDoubleState;
    name: string;
    title?: string;
    fromTitle: string;
    min_from?: string;
    max_from?: string;
    min_to?: string;
    max_to?: string;
    toTitle: string;
    type?: 'number' | 'text' | 'date';
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'change']);
const inputTypes = computed<'text' | 'number' | 'date'>(
    () => props.type || 'text'
);
const state = ref<IDoubleState>({
    from: '',
    to: '',
});

const computedState = computed({
    get(): any {
        // TODO: fix interface DTO (remove any)
        return props.modelValue;
    },
    set(value: { field: 'from' | 'to'; value: string }) {
        state.value[value.field] = value.value;
        emit('update:modelValue', state.value);
        emit('change', state.value);
    },
});

const onChange = (value: { field: 'from' | 'to'; value: string }) => {
    computedState.value = value;
};
</script>

<template>
    <div class="baseRange">
        <h5 class="baseRange__title" v-if="title">{{ title }}</h5>
        <div class="baseRange_fields">
            <BaseInput
                v-model="state.from"
                :name="`${name}_from`"
                :title="fromTitle"
                :type="inputTypes"
                :min="min_from"
                :max="max_from"
                view-type="double"
                @change="(value) => onChange({ field: 'from', value })"
            />
            <BaseInput
                @change="(value) => onChange({ field: 'to', value })"
                v-model="state.to"
                :name="`${name}_to`"
                :type="inputTypes"
                :min="min_to"
                :max="max_to"
                :title="toTitle"
                view-type="double"
            />
        </div>
    </div>
</template>

<style lang="scss">
.baseRange {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__title {
        font-size: 14px;
        font-weight: 300;
        line-height: 15.4px;
        color: var(--secondaryColor);
    }

    &_fields {
        display: flex;
        gap: 8px;
        width: 100%;
        align-items: center;
    }
}
</style>
