export const mutations = {
    SET_LOGGED_IN(state, payload){
        state.isLoggedIn = payload.isLoggedIn;
        state.isAdmin = payload.isAdmin;
    }
}