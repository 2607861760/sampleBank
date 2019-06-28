import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        app,
        user
    },
    getters,
    plugins: [
        // 采用session储存模式 也可以切换为 cookie  localStorage 模式
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
})

export default store