import { createApp } from '/node_modules/vue';
import './style.css';
import App from "./App.vue";
import router from './router';
import store from "./store.js";

const app = createApp(App);
app.use(router).use(store).mount('#app');
