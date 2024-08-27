import { defineStore } from 'pinia';
import { markRaw } from 'vue';

export interface IUseModalStore {
    isOpen: boolean;
    view: object;
    props?: object;
}

export const useModalStore = defineStore('modal', {
    state: (): IUseModalStore => {
        return {
            isOpen: false,
            view: {},
            props: undefined,
        };
    },
    actions: {
        open(view: object, props?: object) {
            this.props = props;
            this.isOpen = true;
            this.view = markRaw(view);
        },
        close() {
            this.isOpen = false;
            this.view = {};
            this.props = {};
        },
    },
});
