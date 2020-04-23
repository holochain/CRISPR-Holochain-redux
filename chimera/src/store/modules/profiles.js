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
        id: 'QmhashProjectCRISPR',
        name: 'CRISPR',
        game: 'QmHashyCRISPR',
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
        id: 'QmhashProjectNotes',
        name: 'Project - Notes',
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
        id: 'QmhashProjectMyInfo',
        name: 'Project - My Info',
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
    }
  }
}
