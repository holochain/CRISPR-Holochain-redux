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
            description: 'Your nick name or handle that will show on Notes and projects you edit.'
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
            ui: 'singleLineText',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVmusic', tag: 'nickname' }
          },
          {
            id: 'avatar',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVmusic', tag: 'avatar' }
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
            ui: 'singleLineText',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'nickname' }
          },
          {
            id: 'avatar',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'avatar' }
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
            ui: 'singleLineText',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'nickname' }
          },
          {
            id: 'avatar',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'avatar' }
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
