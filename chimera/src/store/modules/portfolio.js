export default {
  namespaced: true,

  getters: {
    projects: (state, getters, rootState, rootGetters) => {
      const projects = []
      for (const project of rootGetters['projects/allProjects']) {
        projects.push(project)
      }
      return projects
    }
  }
}
