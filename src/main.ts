import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { vMaska } from 'maska';

const pinia = createPinia();

createApp(App).use(pinia).directive('mask', vMaska).mount('#app');
