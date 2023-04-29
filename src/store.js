import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
    },
    getters: {
        getUser(state) {
            return state.user;
        },
    },
    plugins: [createPersistedState()]
});

export default store;
