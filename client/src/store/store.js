/**
 * Vuex store 
 * @author ritesh.patel
 */
import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        products: [],
        columns: []
    },
    mutations,
    actions,
    getters
});

export default store;