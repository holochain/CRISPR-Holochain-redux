export default {
  namespaced: true,

  state: {
    profiles: [
      {
        id: 'QmhashPersonal',
        name: 'Personal',
        fields: [
          {
            anchor: 'nickname',
            fieldName: 'Nick Name',
            fieldType: 'singleLineText',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'nickname' }
          },
          {
            anchor: 'avatar',
            fieldName: 'Avatar',
            fieldType: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'avatar' }
          }
        ]
      },
      {
        id: 'QmhashProfileCRISPR',
        name: 'CRISPR',
        dna: 'QmHashyCRISPR',
        fields: [
          {
            anchor: 'nickname',
            fieldName: 'Nick Name',
            fieldType: 'singleLineText',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'nickname' }
          },
          {
            anchor: 'avatar',
            fieldName: 'Avatar',
            fieldType: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'avatar' }
          }
        ]
      },
      {
        id: 'QmhashProfileNotes',
        name: 'Project - Notes',
        dna: 'QmHashyNotes',
        fields: [
          {
            anchor: 'nickname',
            fieldName: 'Nick Name',
            fieldType: 'singleLineText',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'nickname' }
          },
          {
            anchor: 'avatar',
            fieldName: 'Avatar',
            fieldType: 'thumbnail',
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
            anchor: 'nickname',
            fieldName: 'Nick Name',
            fieldType: 'singleLineText',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'QmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3r', tag: 'nickname' }
          },
          {
            anchor: 'avatar',
            fieldName: 'Avatar',
            fieldType: 'thumbnail',
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
