export default {
  namespaced: true,

  state: {
    profiles: [
      {
        id: 'QmhashProfileCRISPR',
        name: 'CRISPR',
        dna: 'QmHashyCRISPR',
        fields: [
          {
            id: 'nickname',
            name: 'Nick Name',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'Personal', name: 'Handle' }
          },
          {
            id: 'avatar',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Personal', name: 'Avatar' }
          }
        ]
      },
      {
        id: 'QmhashProfileHolopunkRecords',
        name: 'Holopunk Records',
        dna: 'QmHashyholopunk-records',
        fields: [
          {
            id: 'nickname',
            name: 'Nick Name',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'Music', name: 'Handle' }
          },
          {
            id: 'avatar',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Music', name: 'Avatar' }
          }
        ]
      },
      {
        id: 'QmhashProfileNotes',
        name: 'Notes',
        dna: 'QmHashykanban',
        fields: [
          {
            id: 'nickname',
            name: 'Nick Name',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'Personal', name: 'Handle' }
          },
          {
            id: 'avatar',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Personal', name: 'Avatar' }
          }
        ]
      },
      {
        id: 'QmhashProfileSiteBuilder',
        name: 'Site Builder',
        dna: 'QmHashySiteBuilder',
        fields: [
          {
            id: 'nickname',
            name: 'Nick Name',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'Personal', name: 'Handle' }
          },
          {
            id: 'avatar',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Personal', name: 'Avatar' }
          }
        ]
      }
    ]
  },
  getters: {
    allProfiles: state => {
      return state.profiles
    },
    profileById: (state) => (profileId) => {
      return state.profiles.find(p => p.id === profileId)
    },
    profileByDna: (state) => (dna) => {
      return state.profiles.find(p => p.dna === dna)
    }
  }
}
