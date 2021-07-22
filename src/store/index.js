import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    stored_event: Object,
    logged_in: false
  },

  getters: {
    stored_event: state => {
      return state.stored_event;
    },
    logged_in: state => {
      return state.logged_in;
    }
  },

  actions: {},

  mutations: {
    store_event(state, value) {
      state.stored_event = value;
    },
    set_logged_in(state, value) {
      state.logged_in = value;
    }
  }
});

export default store;
