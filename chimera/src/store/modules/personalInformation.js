export default {
  namespaced: true,
  getters: {
    profiles: (state, getters, rootState, rootGetters) => {
      const profiles = []
      for (const profile of rootGetters['profiles/allProfiles']) {
        profiles.push(profile)
      }
      return profiles
    },
    profileById: (state, getters, rootState, rootGetters) => (profileId) => {
      return rootGetters['profiles/profileById'](profileId)
    },
    profileByDna: (state, getters, rootState, rootGetters) => (dna) => {
      return rootGetters['profiles/profileByDna'](dna)
    },
    personas: (state, getters, rootState, rootGetters) => {
      const personas = []
      const fields = rootGetters['fieldNames/fields']
      for (const persona of rootGetters['personas/allPersonas']) {
        persona.fields.forEach(pf => {
          const field = fields.find(f => f.id === pf.fieldsFieldId)
          console.log(field)
          pf.ui = field.ui
          pf.name = field.name
        })
        console.log(persona)
        personas.push(persona)
      }
      return personas
    },
    fields: (state, getters, rootState, rootGetters) => {
      return rootGetters['fieldNames/fields']
    }
  }
}
