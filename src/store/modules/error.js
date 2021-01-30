
export default {
  namespaced: true,
  state: {
    error: false
  },
  mutations: {
    SET_ERROR (state, payload) {
      state.error = payload
    }
  }
}
