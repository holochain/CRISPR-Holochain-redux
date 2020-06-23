const fs = require('fs')
function base64Encode (file) {
  var bitmap = fs.readFileSync(file)
  return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}
export default {
  namespaced: true,
  getters: {
    projectById: (state, getters, rootState) => (payload) => {
      const projects = rootState.root.entries[`${payload.instanceId}${payload.base}`]
      if (projects) {
        const project = projects.find(p => p.id === payload.projectId)
        fs.writeFileSync(`${rootState.auth.developer.folder}/project.json`, JSON.stringify(project), (err) => {
          if (err) throw err
          console.log('The project has been serialised!')
        })
        return project
      } else {
        const project = fs.readFileSync(`${rootState.auth.developer.folder}/project.json`, 'utf8')
        return JSON.parse(project)
      }
    },
    listProjects: (state, getters, rootState, rootGetters) => (payload) => {
      const projects = []
      const entries = rootState.root.entries[`${payload.instance.instanceId}${payload.base}`]
      if (entries) {
        entries.forEach(p => {
          const project = { ...p }
          project.zome = Object.assign({}, JSON.parse(p.zome))
          project.preview = base64Encode(p.preview)
          projects.push(project)
        })
        return projects
      } else {
        return []
      }
    },
    zomes: (state, getters, rootState, rootGetters) => {
      return rootGetters['zomes/allZomes']
    },
    zomeByBaseIdFromTemplate: (state, getters, rootState, rootGetters) => (zome) => {
      return rootGetters['zomes/zomeByBaseIdFromTemplate'](zome)
    }
  }
}
