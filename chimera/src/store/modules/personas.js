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
        callZome('personalinformation', 'personalinformation', 'list_anchor_type_texts')({ anchor_type: 'list_personafields' }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            res.Ok.forEach(persona => {
              callZome('personalinformation', 'personalinformation', 'list_personafields')({ base: persona }).then((result) => {
                const pResult = JSON.parse(result)
                // console.log(res)
                if (pResult.Ok === undefined) {
                  console.log(pResult)
                } else {
                  commit('setPersona', { title: persona, fields: pResult.Ok })
                }
              })
            })
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
