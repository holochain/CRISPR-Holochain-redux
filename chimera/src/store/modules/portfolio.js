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
    }
  }
}
