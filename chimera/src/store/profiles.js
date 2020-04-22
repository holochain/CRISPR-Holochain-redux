export const profiles = [
  {
    id: 'QmhashQmiVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVphilt3rProfile2',
    name: 'Chimera',
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
