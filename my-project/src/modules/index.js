import Vuex from 'vuex';
import Vue from 'vue'

import userModules from './userModules'
import shuoshuoModules from './shuoshuoModules'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        userModules,
        shuoshuoModules
    }
})