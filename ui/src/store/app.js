export default {
  namespaced: true,
  state: {
    hApps: [
      {
        id: 'Qmmorebighashes333',
        name: 'Notes',
        folder: '/Users/philipbeadle/holochain/hApps/Notes',
        url: '/happ-store/Notes',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'A basic Holochain hApp that demonstrates how to build a CRUD hApp with Holochain Developer.',
        zomes: [
          {
            id: 'Qmmorehas444',
            name: 'Notes',
            entryTypes: [
              {
                name: 'Note',
                update: true,
                delete: true,
                fields: [
                  {
                    id: 'Qm11',
                    fieldName: 'id',
                    fieldType: 'String',
                    links: [
                      {
                        type: 'note_link',
                        anchor: {
                          type: 'notes',
                          text: 'notes'
                        }
                      }
                    ]
                  },
                  {
                    id: 'Qm12',
                    fieldName: 'created_at',
                    fieldType: 'Iso8601'
                  },
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String',
                    createTest: 'philt3r.rocks',
                    updateTest: 'updated'
                  },
                  {
                    id: 'Qm2',
                    fieldName: 'content',
                    fieldType: 'String',
                    createTest: 'Philip Beadle',
                    updateTest: 'Updated'
                  }
                ]
              },
              {
                name: 'Tasks',
                update: true,
                delete: true,
                fields: [
                  {
                    id: 'Qm11',
                    fieldName: 'id',
                    fieldType: 'String',
                    links: [
                      {
                        type: 'task_link',
                        anchor: {
                          type: 'tasks',
                          text: ''
                        }
                      }
                    ]
                  },
                  {
                    id: 'Qm12',
                    fieldName: 'created_at',
                    fieldType: 'Iso8601'
                  },
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String',
                    createTest: 'philt3r.rocks',
                    updateTest: 'updated'
                  },
                  {
                    id: 'Qm2',
                    fieldName: 'description',
                    fieldType: 'String',
                    createTest: 'Philip Beadle',
                    updateTest: 'Updated'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'Qmmorebighashes',
        name: 'eat-sleep-code-repeat',
        folder: '/Users/philipbeadle/eat-sleep-code-repeat/dashboard',
        url: '/happ-store/eat-sleep-code-repeat',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Build and publish static websites from templates and player profiles.',
        zomes: [
          {
            id: 'Qmmorehasshes',
            name: 'Websites',
            entryTypes: [
              {
                name: 'Site',
                fields: [
                  {
                    id: 'Qm1',
                    fieldName: 'domain',
                    fieldType: 'String',
                    createTest: 'philt3r.rocks',
                    updateTest: 'updated'
                  },
                  {
                    id: 'Qm2',
                    fieldName: 'player',
                    fieldType: 'String',
                    createTest: 'Philip Beadle',
                    updateTest: 'Updated'
                  },
                  {
                    id: 'Qm3',
                    fieldName: 'mobile',
                    fieldType: 'String',
                    createTest: '0000000000',
                    updateTest: '1111111111'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'my-info',
        folder: '/Users/philipbeadle/holochain/hApps/my-info',
        url: '/entry-types',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Manage personal information. Information requested by hApps is mapped to the hApp from the players personal my-info hApp.',
        zomnes: []
      }
    ],
    validationRules: {
      validate_entry_create: [
      ],
      validate_entry_modify: [
        {
          group: 'Rule Set 1',
          rules: [
            {
              rule: 'Any Agent can update entry',
              codeTemplate: 'only-agent-update.txt',
              selected: false
            },
            {
              rule: 'Only allow Agent who authored entry to update',
              codeTemplate: 'only-agent-update.txt',
              selected: false
            },
            {
              rule: 'Entry can not be updated',
              codeTemplate: 'only-agent-update.txt',
              selected: false
            }
          ]
        },
        {
          group: 'Rule Set 2',
          rules: [
            {
              rule: 'Another rule',
              codeTemplate: 'only-agent-update.txt',
              selected: false
            },
            {
              rule: 'Another rule about updating',
              codeTemplate: 'only-agent-update.txt',
              selected: false
            }
          ]
        }
      ],
      validate_entry_delete: [
      ],
      validate_link_add: [
      ],
      validate_link_remove: [
      ]
    }
  }
}
