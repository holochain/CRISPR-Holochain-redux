export const zome = {
  name: 'Notes',
  agentAddress: true,
  anchorTypes: [
    {
      type: 'list_agents',
      text: '',
      anchors: ['%agent_id']
    },
    {
      type: 'list_notes',
      text: '',
      anchors: [
        {
          type: 'list_notes',
          text: '2020:05:11'
        },
        {
          type: 'list_notes',
          text: '2020:05:10'
        },
        {
          type: 'list_notes',
          text: '2020:05:09'
        }
      ]
    }
  ],
  entryTypes: [],
  profileSpecs: []
}
