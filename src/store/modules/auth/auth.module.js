import {actions} from './auth.actions';
import {mutations} from './auth.mutations';

const state = {
    isLoggedIn: false,
    isAdmin: false,
};

const getters = {
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    },
    isAdmin: (state) => {
        return state.isAdmin
    },
}

const namespaced = true;

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
