import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SET_USER(state, payload) {
      console.log(payload)
      state.user = payload;
      localStorage.setItem('user', JSON.stringify(payload))
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + payload.token; 
    }
  },
  actions: {
    register({commit}, userInfo) {
      return axios.post("//localhost:3000/register", userInfo).then(({data}) => {
        commit("SET_USER", data);
      })
    }
  },
  modules: {
  }
})
