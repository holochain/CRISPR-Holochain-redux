import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    profiles: [],
    baseWebsites: [
      {
        base: 'PartEditor',
        websites: [
          {
            id: 'PartEditor1',
            content: 'Content for Website 1'
          },
          {
            id: 'PartEditor2',
            content: 'Content for Website 2'
          },
          {
            id: 'PartEditor3',
            content: 'Content for Website 3'
          }
        ]
      }
    ],
    errors: []
  },
  mutations: {
    createWebsite (state, payload) {
      const base = state.baseWebsites.find(b => b.base === payload.base)
      if (base) {
        base.websites = base.websites.filter(n => n.id !== 'new')
        base.websites.splice(0, 0, payload.data)
      } else {
        state.baseWebsites.push((payload))
      }
    },
    updateWebsite (state, payload) {
      const base = state.baseWebsites.find(e => e.base === payload.base)
      if (!base) {
        state.baseWebsites.push(payload)
      } else {
        const updatedWebsites = base.websites.map(website => {
          if (website.id === payload.data.id) {
            return Object.assign({}, website, payload.data)
          }
          return website
        })
        state.baseWebsites.find(e => e.base === payload.base).websites = updatedWebsites
      }
    },
    deleteWebsite (state, payload) {
      console.log(state, payload)
      const base = state.baseWebsites.find(b => b.base === payload.base)
      if (base) {
        state.baseWebsites.find(e => e.base === payload.base).websites = base.websites.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setWebsitesList (state, payload) {
      const base = state.baseWebsites.find(b => b.base === payload.base)
      if (base !== undefined) {
        base.websites = payload.websites
      } else {
        state.baseWebsites.push(payload)
      }
    }
  },
  getters: {
    latest: (state, getters) => {
      return getters.parsedGames.sort((a, b) => {
        if (a.updatedAt < b.updatedAt) return -1
        if (a.updatedAt > b.updatedAt) return 1
        return 0
      }).slice(0, 3)
    },
    listWebsites: state => (base) => {
      const baseWebsite = state.baseWebsites.find(n => n.base === base)
      if (baseWebsite) {
        return baseWebsite.websites
      } else {
        return []
      }
    },
    listErrors: state => (base) => {
      const baseErrors = state.errors.filter(e => e.base === base)
      if (baseErrors) {
        return baseErrors.map(b => JSON.parse(b.error).kind)
      } else {
        return []
      }
    }
  },
  actions: {
    acknowledgeErrors: ({ state, commit, rootState }, base) => {
      commit('resetErrors', base)
    },
    // order: ({ state, commit, rootState }, payload) => {
    //   commit('setWebsitesList', { base: payload.base, websites: payload.websites })
    //   payload.websites.forEach(website => {
    //     rootState.devHolochainConnection.then(({ callZome }) => {
    //       callZome('websites', 'websites', 'update_website')({ id: website.id, created_at: website.createdAt, address: website.address, website_input: { uuid: website.uuid, content: website.content } }).then((result) => {
    //         const res = JSON.parse(result)
    //         // console.log(res)
    //         if (res.Ok === undefined) {
    //           commit('error', { base: payload.base, error: res.Err.Internal })
    //         } else {
    //           commit('updateWebsite', { base: payload.base, data: res.Ok })
    //         }
    //       })
    //     })
    //   })
    // },
    // rebase: ({ state, commit, rootState }, payload) => {
    //   rootState.devHolochainConnection.then(({ callZome }) => {
    //     callZome('websites', 'websites', 'rebase_website')({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
    //       const res = JSON.parse(result)
    //       console.log(res)
    //       if (res.Ok === undefined) {
    //         commit('error', { base: payload.base, error: res.Err.Internal })
    //       }
    //     })
    //   })
    // },
    agentAddress: ({ state, commit, rootState, dispatch }) => {
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('websites', 'websites', 'agent_address')({ }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            dispatch('auth/agentAddress', { agentAddress: res.Ok }, { root: true })
            console.log(rootState.auth.agentAddress)
          }
        })
      })
    },
    fetchProfiles: ({ state, commit, rootState, dispatch }) => {
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('websites', 'websites', 'list_profiles')({ base: '' }).then((result) => {
          const res = JSON.parse(result)
          console.log(res.Ok)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            const friends = res.Ok.map(p => {
              return {
                id: p.id,
                agentAddress: p.agentId,
                name: p.handle,
                online: true,
                info: {
                  id: 10,
                  avatar: p.avatar,
                  name: ''
                },
                notifications: 0,
                value: 0,
                start: 0
              }
            })
            dispatch('friends/profiles', { profiles: friends }, { root: true })
          }
        })
      })
    },
    fetchWebsites: ({ state, commit, rootState }, base) => {
      if (base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('websites', 'websites', 'list_websites')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setWebsitesList', { base: base, websites: res.Ok })
          }
        })
      })
    },
    saveWebsite: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.website.id === 'new' || payload.website.id === undefined) {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('websites', 'websites', 'create_website')({ base: payload.base, website_input: { uuid: uuidv4(), content: payload.website.content } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createWebsite', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('websites', 'websites', 'update_website')({ id: payload.website.id, created_at: payload.website.createdAt, address: payload.website.address, website_input: { uuid: payload.website.uuid, content: payload.website.content } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateWebsite', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteWebsite: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('websites', 'websites', 'delete_website')({ base: payload.base, id: payload.website.id, created_at: payload.website.createdAt, address: payload.website.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteWebsite', { base: payload.base, data: payload.website.id })
          }
        })
      })
    }
  }
}
