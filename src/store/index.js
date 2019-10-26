import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
import authModule from './modules/auth/auth.module';

Vue.use(Vuex)

//Never use local Storage (session valid for 1 day or user closes the brower)
const vuexSession = new VuexPersistence({
  storage: window.localStorage         
});

export default new Vuex.Store({
  plugins: [vuexSession.plugin],
  modules: {
    auth: authModule
  }
});

