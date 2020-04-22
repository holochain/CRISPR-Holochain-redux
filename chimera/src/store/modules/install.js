export default {
  namespaced: true,

  actions: {
    installGame: ({ commit }) => {
      commit('setDialog', true)
    }
  }
}
