export default {
  namespaced: true,
  state: {
    fields: [
      // {
      //   id: 'QmdY9XoRbfSRL2K93LGBBhd4nWjyTdpH1oa2vBig9D44DZ',
      //   name: 'Full Name',
      //   ui: 'text-field'
      // },
      // {
      //   id: 'QmTMgZ7P6DZoVYd52heiNYiLUnM64sprYjMhonX3kxt14X',
      //   name: 'Nick Name',
      //   ui: 'text-field'
      // },
      // {
      //   id: 'QmSP6EDJ5Mymvje6hELXbSmG3pvtKCxAeKdxevNPYivCSu',
      //   name: 'Handle',
      //   ui: 'text-field'
      // },
      // {
      //   id: 'QmVxuUh9yjn2e2E9nsB4RPATcTDNNipAD8oxW4gPj5Bwjd',
      //   name: 'Profile Picture',
      //   ui: 'thumbnail'
      // },
      // {
      //   id: 'QmSdNWEB2bcpy3L4cQMpsgZuJoJ2mRhq3wBZwDZ7ppPbGZ',
      //   name: 'Avatar',
      //   ui: 'thumbnail'
      // },
      // {
      //   id: 'QmVUAiEp86KLKse4dDMgjW9w5oToqaap4WQRb1GxN8ne1k',
      //   name: 'Bio',
      //   ui: 'text-area'
      // }
    ]
  },
  mutations: {
    setFieldsList (state, payload) {
      state.fields = payload.fields
    }
  },
  getters: {
    fields: state => {
      console.log(state.fields)
      return state.fields
    }
  },
  actions: {
    fetchFields: ({ state, commit, rootState }) => {
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('fields', 'fields', 'list_fields')({ base: '' }).then((result) => {
          const res = JSON.parse(result)
          // console.log(res.Ok)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setFieldsList', { fields: res.Ok })
          }
        })
      })
    }
  }
}
