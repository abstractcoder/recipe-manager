import { Store } from 'vuex'

Vue.use(Vuex)

export default new Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
