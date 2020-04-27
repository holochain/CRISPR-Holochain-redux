export default {
  namespaced: true,
  getters: {
    items: (state, getters, rootState, rootGetters) => {
      const items = []
      for (const profile of rootGetters['tracks/allItems']) {
        items.push(profile)
      }
      return items
    }
  }
}
