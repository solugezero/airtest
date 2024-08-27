import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import FormRepository from '@/repositories/form.repository';

export interface IUseFormStore {}

export const useFormStore = defineStore('form', {
    state: (): IUseFormStore => {
        return {};
    },
    actions: {
        async send(variables: { dto: object; formname: string }) {
            const formRepository = new FormRepository('BASE_URL', {});
            try {
                const response = await formRepository.send(variables);
                if (response) return true;
                else return false;
            } catch (err) {
                console.error('Error: ', err);
                return false;
            }
        },
    },
});
