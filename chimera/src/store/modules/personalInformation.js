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
      for (const persona of rootGetters['personas/allPersonas']) {
        personas.push(persona)
      }
      return personas
    }
  }
}
