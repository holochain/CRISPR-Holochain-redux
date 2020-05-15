export default {
  namespaced: true,
  getters: {
    applicationProjects: (state, getters, rootState, rootGetters) => {
      const projects = []
      for (const project of rootGetters['projects/applicationProjects']) {
        projects.push(project)
      }
      return projects
    },
    partProjects: (state, getters, rootState, rootGetters) => {
      const projects = []
      for (const project of rootGetters['projects/partProjects']) {
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
    zomeByBaseIdFromTemplate: (state, getters, rootState, rootGetters) => (zome) => {
      return rootGetters['zomes/zomeByBaseIdFromTemplate'](zome)
    }
  }
}
