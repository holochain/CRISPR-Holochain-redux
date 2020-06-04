import { v4 as uuidv4 } from 'uuid'
export default {
  namespaced: true,
  state: {
    mock: true,
    profiles: [],
    baseTags: [
      {
        base: '',
        tags: [
          {
            id: 'PartEditor1',
            text: 'Techno'
          },
          {
            id: 'PartEditor2',
            text: 'Trance'
          },
          {
            id: 'PartEditor3',
            text: 'Metal'
          },
          {
            id: 'PartEditor4',
            text: 'Rock'
          },
          {
            id: 'PartEditor5',
            text: 'Pop'
          },
          {
            id: 'PartEditor6',
            text: 'Country'
          }
        ]
      },
      {
        base: 'PartEditor',
        tags: [
          {
            id: 'PartEditor1',
            text: 'Techno'
          },
          {
            id: 'PartEditor3',
            text: 'Metal'
          }
        ]
      }
    ],
    errors: []
  },
  mutations: {
    createTag (state, payload) {
      const base = state.baseTags.find(b => b.base === payload.base)
      if (base) {
        base.tags = base.tags.filter(n => n.id !== 'new')
        base.tags.splice(0, 0, payload.data)
      } else {
        state.baseTags.push((payload))
      }
    },
    updateTag (state, payload) {
      const base = state.baseTags.find(e => e.base === payload.base)
      if (!base) {
        state.baseTags.push(payload)
      } else {
        const updatedTags = base.tags.map(tag => {
          if (tag.id === payload.data.id) {
            return Object.assign({}, tag, payload.data)
          }
          return tag
        })
        state.baseTags.find(e => e.base === payload.base).tags = updatedTags
      }
    },
    deleteTag (state, payload) {
      console.log(state, payload)
      const base = state.baseTags.find(b => b.base === payload.base)
      if (base) {
        state.baseTags.find(e => e.base === payload.base).tags = base.tags.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setTagsList (state, payload) {
      const base = state.baseTags.find(b => b.base === payload.base)
      if (base !== undefined) {
        base.tags = payload.tags
      } else {
        state.baseTags.push(payload)
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
    listTags: state => (base) => {
      const baseTag = state.baseTags.find(n => n.base === base)
      if (baseTag) {
        return baseTag.tags
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
    //   commit('setTagsList', { base: payload.base, tags: payload.tags })
    //   payload.tags.forEach(tag => {
    //     rootState.holochainConnection.then(({ callZome }) => {
    //       callZome('tags', 'tags', 'update_tag')({ id: tag.id, created_at: tag.createdAt, address: tag.address, tag_input: { uuid: tag.uuid, content: tag.content } }).then((result) => {
    //         const res = JSON.parse(result)
    //         // console.log(res)
    //         if (res.Ok === undefined) {
    //           commit('error', { base: payload.base, error: res.Err.Internal })
    //         } else {
    //           commit('updateTag', { base: payload.base, data: res.Ok })
    //         }
    //       })
    //     })
    //   })
    // },
    // rebase: ({ state, commit, rootState }, payload) => {
    //   rootState.holochainConnection.then(({ callZome }) => {
    //     callZome('tags', 'tags', 'rebase_tag')({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
    //       const res = JSON.parse(result)
    //       console.log(res)
    //       if (res.Ok === undefined) {
    //         commit('error', { base: payload.base, error: res.Err.Internal })
    //       }
    //     })
    //   })
    // },
    agentAddress: ({ state, commit, rootState, dispatch }) => {
      if (state.mock) return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('tags', 'tags', 'agent_address')({ }).then((result) => {
          const res = JSON.parse(result)
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
      if (state.mock) return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('tags', 'tags', 'list_profiles')({ base: '' }).then((result) => {
          const res = JSON.parse(result)
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
    fetchTags: ({ state, commit, rootState }, base) => {
      if (state.mock) return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('tags', 'tags', 'list_tags')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setTagsList', { base: base, tags: res.Ok })
          }
        })
      })
    },
    saveTag: ({ state, commit, rootState }, payload) => {
      console.log(payload)
      if (state.mock) {
        const tag = payload.tag
        if (tag.id === 'new') {
          tag.id = uuidv4()
          commit('createTag', { base: payload.base, data: tag })
        } else {
          commit('updateTag', { base: payload.base, data: tag })
        }
        return
      }
      if (payload.tag.id === 'new' || payload.tag.id === undefined) {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('tags', 'tags', 'create_tag')({ base: payload.base, tag_input: { text: payload.tag.content } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createTag', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.holochainConnection.then(({ callZome }) => {
          callZome('tags', 'tags', 'update_tag')({ id: payload.tag.id, created_at: payload.tag.createdAt, address: payload.tag.address, tag_input: { content: payload.tag.text } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateTag', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteTag: ({ state, commit, rootState }, payload) => {
      if (state.mock) return
      rootState.holochainConnection.then(({ callZome }) => {
        callZome('tags', 'tags', 'delete_tag')({ base: payload.base, id: payload.tag.id, created_at: payload.tag.createdAt, address: payload.tag.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteTag', { base: payload.base, data: payload.tag.id })
          }
        })
      })
    }
  }
}
