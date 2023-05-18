import { createApp } from '/node_modules/vue';
import '/src/style.css';
import App from "/src/App.vue";
import router from '/src/router/index.js';
import store from "/src/store.js";

const app = createApp(App);
app.use(router).use(store).mount('#app');
