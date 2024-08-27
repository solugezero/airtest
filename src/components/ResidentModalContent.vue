<script setup lang="ts">
import { ref, toRefs } from 'vue';
import BaseInput from './Base/Input.vue';
import BaseSelect from './Base/Select.vue';
import BaseRange from './Base/Range.vue';
import BaseButton from './Base/Button.vue';
import { date, number, object, string } from 'yup';
import { useModalStore } from '@/store/useModalStore';
import { useFormStore } from '@/store/useFormStore';

interface IResidentModalState {
    name?: string;
    phone?: string;
    address?: string;
    areaType?: string;
    fromArea?: number;
    toArea?: number;
    fromDate?: Date;
    toDate?: Date;
}

const { close } = toRefs(useModalStore());
const { send } = toRefs(useFormStore());

const schema = object({
    name: string().required(
        'Обязательное поле - Наименование организации / ИП'
    ),
    phone: string().required('Обязательное поле - Контактный телефон'),
    address: string().required('Обязательное поле - Адрес'),
    areaType: string().required('Обязательное поле - Тип помещения'),
    fromArea: number()
        .required('Обязательное поле - Площадь помешения (от)')
        .min(0, 'Поле Площадь помешения (от) не должно быть меньше нуля')
        .max(200, 'Поле Площадь помешения (до) не должно быть больше 200'),
    toArea: number()
        .required('Обязательное поле - Площадь помешения (до)')
        .min(10, 'Поле Площадь помешения (до) не должно быть меньше 10')
        .max(1000, 'Поле Площадь помешения (до) не должно быть больше 1000'),
    fromDate: string().required('Обязательное поле - Дата начала (с)'),
    toDate: string().required('Обязательное поле - Дата окончания (по)'),
});

const state = ref<IResidentModalState>({});

const areaTypeSelectedValue = ref<
    { name: string; value: string } | { name: string; value: string }[]
>();

const areaTypeOptions = ref<{ name: string; value: string }[]>([
    { name: 'Производственная площадь', value: '0' },
    { name: 'Производственная площадь1', value: '1' },
    { name: 'Производственная площадь2', value: '2' },
    { name: 'Производственная площадь3', value: '3' },
]);

const setDate = (from: Date, to: Date) => {
    state.value.fromDate = from;
    state.value.toDate = to;
};

const setPremises = (from: number, to: number) => {
    state.value.fromArea = from;
    state.value.toArea = to;
};

const setAreaType = (
    value: { name: string; value: string } | { name: string; value: string }[]
) => {
    areaTypeSelectedValue.value = value;
    if (value && Array.isArray(value)) {
        state.value.areaType = value.map((i) => i.value).join(',');
    } else {
        state.value.areaType = value.value;
    }
};

const validate = async () => {
    try {
        const validate = await schema.validate(state.value);
        // if(validate) send.value({dto: validate, formname: 'resident'}) после успешной валидации отправляем на бек
        if (validate) alert('Успешно!'); // временное решение
        close.value();
    } catch (err: any) {
        console.error(err.message);
        alert(err.message); // временное решение
        // в случае ошибки - выводим либо уведомление, либо подсвечиваем инпуты в которых обнаружена ошибка
    }
};
</script>

<template>
    <div class="residentModalContent">
        <h3 class="residentModalContent__title">
            Заполните заявку, чтобы стать резидентом
        </h3>
        <form name="residentForm" class="residentModalContent_fields">
            <BaseInput
                v-model="state.name"
                name="name"
                title="Наименование организации / ИП"
            />
            <BaseInput
                v-model="state.phone"
                name="phone"
                mask="+7 (###) ###-##-##"
                title="Контактный телефон"
            />
            <BaseSelect
                v-model="areaTypeSelectedValue"
                :options="areaTypeOptions"
                name="areaType"
                title="Тип помещения"
                @change="(value) => setAreaType(value)"
            />
            <BaseInput v-model="state.address" name="address" title="Адрес" />
            <BaseRange
                title="Площадь помещения (м2)"
                name="premises_area"
                fromTitle="от"
                min_from="0"
                max_from="200"
                min_to="10"
                max_to="1000"
                toTitle="до"
                type="number"
                @change="(value) => setPremises(value.from, value.to)"
            />
            <BaseRange
                type="date"
                title="Дата начала аренды"
                name="start_date"
                fromTitle="с"
                toTitle="по"
                @change="(value) => setDate(value.from, value.to)"
            />
        </form>
        <BaseButton @click="validate" class="residentModalContent__submit"
            >Отправить</BaseButton
        >
    </div>
</template>

<style lang="scss">
.residentModalContent {
    width: 100svw;
    max-width: 800px;
    padding: 40px;
    background: var(--thirthColor);
    display: flex;
    flex-direction: column;
    gap: 40px;

    &__submit {
        margin: 0 auto;
    }

    &__title {
        font-size: 24px;
        font-weight: 600;
    }

    &_fields {
        display: flex;
        width: 100%;
        flex-direction: column;
        gap: 20px;
    }
}
</style>
