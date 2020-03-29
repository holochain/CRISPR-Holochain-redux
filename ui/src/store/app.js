import { fieldNames } from './fieldNames.js'

export default {
  namespaced: true,
  state: {
    developer: {
      folder: '/Users/philipbeadle/holochain/holochain-developer'
    },
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
            anchors: [
              {
                type: 'notes',
                text: 'notes'
              }
            ],
            entryTypes: [
              {
                name: 'Note',
                update: true,
                delete: true,
                fields: [
                  {
                    id: 'Qm11',
                    fieldName: 'id',
                    fieldType: 'String'
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
                ],
                links: [
                  {
                    direction: 'from',
                    entityType: 'anchor',
                    entityName: 'notesnotes',
                    type: 'note_link'
                  }
                ],
                validationRules: {
                  validateEntryCreate: [
                  ],
                  validateEntryModify: [
                    {
                      rule: 'Only allow Agent who authored entry allowed to update',
                      template: 'only-agent-update'
                    }
                  ],
                  validateEntryDelete: [
                    {
                      rule: 'Only allow Agent who authored entry allowed to delete',
                      template: 'only-agent-delete'
                    }
                  ],
                  validateLinkAdd: [
                  ],
                  validateLinkRemove: [
                  ]
                }
              }
            ],
            profileSpecs: [
              {
                name: 'Notes hApp',
                fields: [
                  {
                    anchor: 'first-name',
                    fieldName: 'First Name',
                    fieldType: 'singleLineText',
                    linkContract: 'persist',
                    description: 'Your name so we know who wrote the note.'
                  },
                  {
                    anchor: 'avatar',
                    fieldName: 'Avatar',
                    fieldType: 'thumbnail',
                    linkContract: 'persist',
                    description: 'Shows on the Note so we can see who wrote the note.'
                  },
                  {
                    anchor: 'biography',
                    fieldName: 'Bio',
                    fieldType: 'multiLineText',
                    linkContract: 'persist',
                    description: 'A short bio of yourself to add some cred to your notes.'
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
      validateEntryCreate: [
      ],
      validateEntryModify: [
        {
          group: 'Rule Set 1',
          rules: [
            {
              rule: 'Any Agent can update entry',
              template: 'any-agent-update',
              selected: true
            },
            {
              rule: 'Only allow Agent who authored entry allowed to update',
              template: 'only-agent-update',
              selected: false
            },
            {
              rule: 'Entry can not be updated',
              template: 'not-updateable',
              selected: false
            }
          ]
        },
        {
          group: 'Rule Set 2',
          rules: [
            {
              rule: 'Another rule',
              template: 'another-rule',
              selected: false
            },
            {
              rule: 'Another rule about updating',
              template: 'another-rule-2',
              selected: false
            }
          ]
        }
      ],
      validateEntryDelete: [
        {
          group: 'Rule Set 1',
          rules: [
            {
              rule: 'Any Agent can delete entry',
              template: 'any-agent-delete',
              selected: true
            },
            {
              rule: 'Only allow Agent who authored entry allowed to delete',
              template: 'only-agent-delete',
              selected: false
            },
            {
              rule: 'Entry can not be deleted',
              template: 'not-deleteable',
              selected: false
            }
          ]
        }
      ],
      validateLinkAdd: [
      ],
      validateLinkRemove: [
      ]
    },
    fieldNames: fieldNames
  }
}
