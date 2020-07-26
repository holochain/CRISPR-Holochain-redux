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
    }
  },
  actions: {
    fetchPersonas: ({ state, commit, rootState }) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('personalinformation', 'personalinformation', 'list_anchor_tags')({ anchor_type: 'list_personafields' }).then((result) => {
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
    },
    updatePersona: ({ state, commit, rootState }, payload) => {
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('personalinformation', 'personalinformation', 'update_personafield')({ id: payload.entry.id, created_at: payload.entry.createdAt, address: payload.entry.address, personafield_input: { ...payload.entry } }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { instance: payload.instance, base: payload.base, error: res.Err.Internal.kind })
          } else {
            commit('updatePersonaField', { instance: payload.instance, base: payload.base, data: payload.entry })
          }
        })
      })
    }
  },
  getters: {
    allPersonas: state => {
      // console.log(state.personas)
      return state.personas
    },
    personaById: (state) => (personaId) => {
      return state.personas.find(p => p.id === personaId)
    }
  }
}
