import { profiles } from './profiles.js'
import { personas } from './personas.js'
import { fieldNames } from './fieldNames.js'

export const hApps = [
  {
    id: 'QmCulture',
    name: 'Culture',
    folder: '/Users/philipbeadle/holochain/hApps/Culture',
    url: '/happ-store/Culture',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'IDE for building Holochain hApps from models and templates. Uses Holochain anchors as a git like source control with branching, permission control and traceability of changes.',
    zomes: [
      {
        id: 'QmCultureZome',
        name: 'Culture',
        anchors: [
          {
            type: 'branch',
            text: '',
            links: []
          },
          {
            type: 'branch',
            text: 'agent_defined',
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'branch',
                type: 'branches_link'
              }
            ]
          }
        ],
        entryTypes: [
          {
            name: 'hApp',
            update: true,
            delete: true,
            revisons: true,
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
                id: 'Qm11',
                fieldName: 'name',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'folder',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'url',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'contact',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'mobile',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'description',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'branch',
                fieldType: 'String'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'branchagent_defined',
                type: 'branch_link'
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
            },
            testData: {
              create: {
                anchor: {
                  type: 'branch',
                  text: 'master'
                },
                name: 'hApp name',
                folder: '/hApp',
                url: '/happ-store/hApp',
                contact: 'Contact',
                mobile: '+61 999 999 999',
                description: 'hApp description'
              },
              update: {
                name: 'Update hApp name',
                folder: 'Update /hApp',
                url: 'Update /happ-store/hApp',
                contact: 'Update Contact',
                mobile: 'Update +61 999 999 999',
                description: 'Update hApp description'
              },
              list: []
            }
          }
        ],
        profileSpecs: []
      }
    ],
    modules: []
  },
  {
    id: 'Qmmorebighashes333',
    name: 'Notes',
    folder: '/Users/philipbeadle/holochain/hApps/Notes',
    url: '/happ-store/Notes',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'A basic Holochain hApp that demonstrates how to build a CRUD hApp with Holochain Culture.\nAlso shows how to integrate roles and permissions into Entry Types.',
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
                fieldType: 'String'
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
            },
            testData: {
              create: { title: 'Note 1 title', content: 'Note 1 content' },
              update: [
                { title: 'Updated Note 1 title', content: 'Updated Note 1 content' },
                { title: 'Updated Again Note 1 title', content: 'Updated Again Note 1 content' }
              ],
              list: [
                { title: 'Note 1 title', content: 'Note 1 content' },
                { title: 'Note 2 title', content: 'Note 2 content' },
                { title: 'Note 3 title', content: 'Note 3 content' },
                { title: 'Note 4 title', content: 'Note 4 content' }
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
    ],
    modules: [
      {
        name: 'Profile Website Builder',
        data: {
          profiles: profiles,
          personas: personas,
          fieldNames: fieldNames
        }
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
        id: 'Qmmorehas444',
        name: 'ProfileWebsites',
        anchors: [
          {
            type: 'Profile Websites',
            text: ''
          }
        ],
        entryTypes: [
          {
            name: 'ProfileWebsite',
            update: true,
            delete: true,
            fields: [
              {
                id: 'QmProfileWebsite1',
                fieldName: 'id',
                fieldType: 'String'
              },
              {
                id: 'QmProfileWebsite2',
                fieldName: 'created_at',
                fieldType: 'Iso8601'
              },
              {
                id: 'QmProfileWebsite3',
                fieldName: 'domain',
                fieldType: 'String'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'Profile Websites',
                type: 'profile_websites_link'
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
            },
            testData: {
              create: { domain: 'www.domain.demo' },
              update: [
                { domain: 'Updated www.domain.demo' },
                { domain: 'Updated Again www.domain.demo' }
              ],
              list: [
                { domain: 'www.domain.demo 1' },
                { domain: 'www.domain.demo 2' },
                { domain: 'www.domain.demo 3' },
                { domain: 'www.domain.demo 4' }
              ]
            }
          }
        ],
        profileSpecs: []
      }
    ],
    modules: []
  },
  {
    name: 'my-info',
    folder: '/Users/philipbeadle/holochain/hApps/my-info',
    url: '/entry-types',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'Manage personal information. Information requested by hApps is mapped to the hApp from the players personal my-info hApp.',
    zomes: []
  }
]
