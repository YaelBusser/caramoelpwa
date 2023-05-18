import { createApp } from 'vue';
import './style.css';
import App from "./App.vue";
import router from './router/index.js';
import store from "../store.js";

const app = createApp(App);
app.use(router).use(store).mount('#app');