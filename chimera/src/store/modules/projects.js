export default {
  namespaced: true,

  state: {
    projects: [
      // {
      //   id: 'QmHashyChimera',
      //   name: 'Chimera',
      //   folder: '/Users/philipbeadle/holochain/hApps',
      //   url: '/happ-store/Chimera',
      //   contact: 'Philip Beadle',
      //   mobile: '+61 999 999 999',
      //   description: 'IDE for building Holochain hApps from models and templates. Uses Holochain anchors as a git like source control with branching, permission control and traceability of changes.',
      //   zomes: [],
      //   modules: []
      // },
      {
        id: 'Qmmorebighashes333',
        name: 'Notes',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        url: '/happ-store/Notes',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'Notes have a title, content and order. Set the permissions at build time to control who can update and delete notes.',
        zomes: [
          {
            template: 'Origins',
            name: 'Notes',
            entryTypes: [
              {
                id: 'QmNoteEntryTypeHash',
                name: 'note',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String',
                    fieldDescription: 'Title of the note',
                    required: true
                  },
                  {
                    id: 'QM234566777887',
                    fieldName: 'content',
                    fieldType: 'String',
                    fieldDescription: 'Main body of the note',
                    required: false
                  },
                  {
                    id: 'QM2345667778871',
                    fieldName: 'order',
                    fieldType: 'u32',
                    fieldDescription: '',
                    required: false
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_notes1',
                type: 'list_notes',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmNoteEntryTypeHash',
                    type: 'note_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ],
                anchors: [
                  {
                    id: 'Qmlist_Qmhashnote1',
                    type: 'list_notes',
                    text: 'Address1NoteLinkedFrom',
                    links: [
                      {
                        entityId: 'QmNoteEntryTypeHash',
                        type: 'note_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashnote2',
                    type: 'list_notes',
                    text: 'Address2NoteLinkedFrom',
                    links: [
                      {
                        entityId: 'QmNoteEntryTypeHash',
                        type: 'note_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashnote3',
                    type: 'list_notes',
                    text: 'Address3NoteLinkedFrom',
                    links: [
                      {
                        entityId: 'QmNoteEntryTypeHash',
                        type: 'note_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QmmorehashyTasks',
        name: 'Tasks',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        url: '/store/games/QmHashyTasks',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'A clone of Notes DNA. Tasks have title, done and order.',
        zomes: [
          {
            template: 'Origins',
            name: 'Tasks',
            entryTypes: [
              {
                id: 'QmTaskEntryTypeHash',
                name: 'task',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String',
                    fieldDescription: 'Title of the task',
                    required: true
                  },
                  {
                    id: 'QM234566777887',
                    fieldName: 'done',
                    fieldType: 'bool',
                    fieldDescription: 'Whether its done or not.',
                    required: false
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_tasks1',
                type: 'list_tasks',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmTaskEntryTypeHash',
                    type: 'task_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ],
                anchors: [
                  {
                    id: 'Qmlist_Qmhashtask1',
                    type: 'list_tasks',
                    text: 'Address1TaskLinkedFrom',
                    links: [
                      {
                        entityId: 'QmTaskEntryTypeHash',
                        type: 'task_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashtask2',
                    type: 'list_tasks',
                    text: 'Address2TaskLinkedFrom',
                    links: [
                      {
                        entityId: 'QmTaskEntryTypeHash',
                        type: 'task_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashtask3',
                    type: 'list_tasks',
                    text: 'Address3TaskLinkedFrom',
                    links: [
                      {
                        entityId: 'QmTaskEntryTypeHash',
                        type: 'task_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'QmHashyKanban',
        name: 'Kanban',
        folder: '/Users/philipbeadle/holochain/CRISPR/dna',
        url: '/happ-store/Kanban',
        contact: 'Philip Beadle',
        mobile: '+61 999 999 999',
        description: 'A kanban board that you can kanban any type of part using the slot.',
        zomes: [
          {
            template: 'Origins',
            name: 'Kanban',
            entryTypes: [
              {
                id: 'QmColumnEntryTypeHash',
                name: 'column',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String',
                    fieldDescription: 'Title of the column',
                    required: true
                  },
                  {
                    id: 'QM234566777887',
                    fieldName: 'order',
                    fieldType: 'u32',
                    fieldDescription: '',
                    required: false
                  }
                ]
              }
            ],
            anchorTypes: [
              {
                id: 'Qmlist_columns1',
                type: 'list_columns',
                text: '',
                tag: ' ',
                context: 'permanent',
                links: [
                  {
                    entityId: 'QmColumnEntryTypeHash',
                    type: 'column_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ],
                anchors: [
                  {
                    id: 'Qmlist_Qmhashcolumn1',
                    type: 'list_columns',
                    text: 'Address1ColumnLinkedFrom',
                    links: [
                      {
                        entityId: 'QmColumnEntryTypeHash',
                        type: 'column_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashcolumn2',
                    type: 'list_columns',
                    text: 'Address2ColumnLinkedFrom',
                    links: [
                      {
                        entityId: 'QmColumnEntryTypeHash',
                        type: 'column_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  },
                  {
                    id: 'Qmlist_Qmhashcolumn3',
                    type: 'list_columns',
                    text: 'Address3ColumnLinkedFrom',
                    links: [
                      {
                        entityId: 'QmColumnEntryTypeHash',
                        type: 'column_link',
                        tag: ' ',
                        context: 'exclusive'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  getters: {
    allProjects: state => {
      return state.projects
    },
    projectById: (state) => (projectId) => {
      return state.projects.find(p => p.id === projectId)
    }
  }
}
