export default {
  namespaced: true,

  getters: {
    projects: (state, getters, rootState, rootGetters) => {
      const projects = []
      for (const project of rootGetters['projects/allProjects']) {
        projects.push(project)
      }
      return projects
    },
    projectById: (state, getters, rootState, rootGetters) => (projectId) => {
      return rootGetters['projects/projectById'](projectId)
    },
    zomes: (state, getters, rootState, rootGetters) => {
      const zomes = []
      for (const zome of rootGetters['zomes/allZomes']) {
        zomes.push(zome)
      }
      return zomes
    },
    zomeById: (state, getters, rootState, rootGetters) => (zomeId) => {
      return rootGetters['zomes/zomeById'](zomeId)
    }
  }
}
