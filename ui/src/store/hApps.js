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
            text: 'name of branch',
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'branch',
                type: 'branches'
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
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'branchname of branch',
                type: 'branch'
              }
            ],
            permissionRules: {
              validateEntryCreate: '',
              validateEntryModify: '',
              validateEntryDelete: '',
              validateLinkAdd: '',
              validateLinkRemove: ''
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
          },
          {
            name: 'zome',
            update: true,
            delete: true,
            revisons: true,
            anchors: [],
            fields: [
              {
                id: 'Qm11',
                fieldName: 'name',
                fieldType: 'String'
              },
              {
                id: 'Qm11',
                fieldName: 'description',
                fieldType: 'String'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'branchname of branch',
                type: 'branch'
              }
            ],
            permissionRules: {
              validateEntryCreate: '',
              validateEntryModify: '',
              validateEntryDelete: '',
              validateLinkAdd: '',
              validateLinkRemove: ''
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
            name: '',
            type: 'Notes',
            text: 'ListNotes',
            links: []
          }
        ],
        entryTypes: [
          {
            name: 'NoteId',
            update: false,
            delete: true,
            fields: [
              {
                id: 'Qm11',
                fieldName: 'initial_entry_address',
                fieldType: 'String'
              },
              {
                id: 'Qm12',
                fieldName: 'initial_entry_created_at',
                fieldType: 'Iso8601'
              }
            ],
            links: [
              {
                direction: 'from',
                entityType: 'anchor',
                entityName: 'NotesListNotes',
                type: 'notes'
              }
            ]
          },
          {
            name: 'NoteEntry',
            update: true,
            delete: true,
            fields: [
              {
                id: 'Qm1333',
                fieldName: 'title',
                fieldType: 'String'
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
                entityType: 'entry',
                entityName: 'NoteId',
                type: 'entry'
              }
            ],
            permissionRules: {
              validateEntryCreate: '',
              validateEntryModify: '',
              validateEntryDelete: '',
              validateLinkAdd: '',
              validateLinkRemove: ''
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
        profileSpecs: []
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
            permissionRules: {
              validateEntryCreate: '',
              validateEntryModify: '',
              validateEntryDelete: '',
              validateLinkAdd: '',
              validateLinkRemove: ''
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
