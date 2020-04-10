import { profiles } from './profiles.js'
import { personas } from './personas.js'
import { fieldNames } from './fieldNames.js'
import { items } from './foldersFiles.js'

export const hApps = [
  {
    id: 'QmHolochainIDE',
    name: 'Holochain-IDE',
    folder: '/Users/philipbeadle/holochain/hApps/Holochain-IDE',
    url: '/happ-store/Holochain-IDE',
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
                type: 'anchor_link'
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
                type: 'anchor_link'
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
                type: 'anchor_link'
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
    description: 'A Holochain hApp that demonstrates how to build a CRUD hApp with Holochain-IDE.\nSelecting permissions and roles generates the code for the Zome based on Entry Type fields and links.\nAlso shows how to integrate roles and permissions into Entry Types.',
    zomes: [
      {
        id: 'Qmmorehas444',
        name: 'Notes',
        anchors: [
          {
            type: 'root_anchor',
            text: '',
            links: []
          },
          {
            type: 'list_notes',
            text: '',
            links: [{
              direction: 'from',
              entityType: 'anchor',
              entityName: 'root_anchor',
              type: 'anchor_link'
            }]
          }
        ],
        entryTypes: [
          {
            name: 'Note',
            fields: [
              {
                id: 'Qm11',
                fieldName: 'id',
                fieldType: 'Address'
              },
              {
                id: 'Qm12',
                fieldName: 'created_at',
                fieldType: 'Iso8601'
              },
              {
                id: 'Qm11',
                fieldName: 'address',
                fieldType: 'Address'
              },
              {
                id: 'Qm12',
                fieldName: 'updated_at',
                fieldType: 'Iso8601'
              },
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
                entityType: 'anchor',
                entityName: 'list_notes',
                type: 'anchor_link'
              }
            ]
          }
        ],
        profileSpecs: [],
        items: items
      },
      {
        id: 'Qmmorehas444',
        name: 'notes',
        anchors: [
          {
            name: '',
            type: 'list_notes',
            text: '',
            links: []
          }
        ],
        entryTypes: [
          {
            name: 'NoteId',
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
                entityType: 'entryType',
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
    modules: [{
      name: 'Profile Website Builder',
      data: {
        profiles: profiles,
        personas: personas,
        fieldNames: fieldNames
      }
    }]
  },
  {
    name: 'personas-profiles',
    folder: '/Users/philipbeadle/holochain/hApps/personas-profiles',
    url: '/entry-types',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'Manage personal information. Information requested by hApps is mapped to the hApp from the players personal my-info hApp.',
    zomes: []
  }
]
