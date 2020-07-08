import { set } from '@/utils/vuex'
export default {
  namespaced: true,
  state: {
    installedHapps: ['QmHashyOrigins', 'QmHashyBubbles', 'QmHashykanban', 'QmHashyCRISPR'],
    installedParts: ['QmHashyNotes', 'QmHashyTasks', 'QmHashyratings', 'QmHashyWhoIs']
  },
  getters: {
    happs: (state, getters, rootState, rootGetters) => {
      const happs = []
      const installed = state.installedHapps
      for (const app of rootGetters['happs/parsedHapps']) {
        happs.push({
          ...app,
          installed: installed.includes(app.id)
        })
      }
      return happs.sort((a, b) => {
        if (!a.installed) return 1
        if (!b.installed) return -1
        return 0
      })
    },
    parts: (state, getters, rootState, rootGetters) => {
      const parts = []
      const installed = state.installedParts
      for (const part of rootGetters['parts/parsedParts']) {
        parts.push({
          ...part,
          installed: installed.includes(part.id)
        })
      }
      return parts.sort((a, b) => {
        if (!a.installed) return 1
        if (!b.installed) return -1
        return 0
      })
    },
    partInstances: (state, getters, rootState, rootGetters) => {
      console.log(rootGetters['parts/partNames'])
      const partInstances = []
      for (const partName of rootGetters['parts/partNames']) {
        for (const instance of rootGetters['instancemanager/listInstances'](partName)) {
          partInstances.push({
            title: partName.toLowerCase(),
            name: `${partName} - ${instance.instanceName}`,
            instance: instance
          })
        }
      }
      return partInstances
    }
  },
  mutations: {
    setInstalledHapps: set('installedHapps'),
    setInstalledParts: set('installedParts')
  }
}
