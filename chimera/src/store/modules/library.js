import { set } from '@/utils/vuex'

export default {
  namespaced: true,

  state: {
    installed: ['QmHashySiteBuilder', 'QmHashyNotes', 'QmHashyCRISPR', 'QmHashyholopunk-records'],
    games: ['QmHashySiteBuilder', 'QmHashyholopunk-records', 'QmHashyastras', 'QmHashystorm', 'QmHashyPhase', 'QmHashyNotes', 'QmHashyCRISPR']
  },

  getters: {
    games: (state, getters, rootState, rootGetters) => {
      const games = []
      const installed = state.installed

      for (const game of rootGetters['games/parsedGames']) {
        if (!state.games.includes(game.id)) continue

        games.push({
          ...game,
          installed: installed.includes(game.id)
        })
      }

      return games.sort((a, b) => {
        if (!a.installed) return 1
        if (!b.installed) return -1
        return 0
      })
    }
  },

  mutations: {
    setInstalled: set('installed')
  }
}
