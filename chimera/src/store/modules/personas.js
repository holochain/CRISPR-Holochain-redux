export default {
  namespaced: true,

  state: {
    personas: [
    ]
  },
  mutations: {
    setPersona (state, payload) {
      const persona = state.personas.find(b => b.title === payload.title)
      if (persona !== undefined) {
        persona.fields = payload.fields
      } else {
        state.personas.push(payload)
      }
      console.log(state)
    }
  },
  actions: {
    fetchPersonas: ({ state, commit, rootState }) => {
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('personafields', 'personafields', 'list_personafields')({ base: 'Personal' }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setPersona', { title: 'Personal', fields: res.Ok })
          }
        })
        callZome('personafields', 'personafields', 'list_personafields')({ base: 'Music' }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setPersona', { title: 'Music', fields: res.Ok })
          }
        })
      })
    }
  },
  getters: {
    allPersonas: state => {
      return state.personas
    },
    personaById: (state) => (personaId) => {
      return state.personas.find(p => p.id === personaId)
    }
  }
}
