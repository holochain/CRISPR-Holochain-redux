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
    personaFieldValue: (state, getters, rootState, rootGetters) => (mapping) => {
      console.log(mapping)
      const persona = rootGetters['personas/allPersonas'].find(p => p.title === mapping.persona)
      const field = persona.fields.find(f => f.fieldsFieldId === mapping.fieldsFieldId)
      console.log(mapping)
      return field.value
    },
    personas: (state, getters, rootState, rootGetters) => {
      const personas = []
      const fields = rootGetters['fieldNames/fields']
      for (const persona of rootGetters['personas/allPersonas']) {
        persona.fields.forEach(pf => {
          const field = fields.find(f => f.id === pf.fieldsFieldId)
          pf.ui = field.ui
          pf.name = field.name
        })
        personas.push(persona)
      }
      return personas
    },
    fields: (state, getters, rootState, rootGetters) => {
      return rootGetters['fieldNames/fields']
    }
  }
}
