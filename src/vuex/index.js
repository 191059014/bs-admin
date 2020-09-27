import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import gatters from './gatters.js'
import mutations from './mutations.js'
import actions from './actions.js'

//挂载Vuex
Vue.use(Vuex);

//创建VueX对象
const store = new Vuex.Store({
  state,
  gatters,
  mutations,
  actions
});

export default store
