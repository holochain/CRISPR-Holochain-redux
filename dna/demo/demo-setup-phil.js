const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const { connect } = require('@holochain/hc-web-client')
const devHolochainConnection = connect({ url: 'ws://localhost:33000' })
const net = require('net')
const port = 33000;
const client = new net.Socket()

function base64Encode(file) {
    var bitmap = fs.readFileSync(file);
    return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}

const baseProjects = [
  {
    base: 'Applications',
    projects: [
      {
        id: 'QmHashyChimera',
        name: 'Chimera',
        type: 'application',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Chimera/preview.png',
        description: 'Agent centric personalised Holochain experience for using & configuring hApps includes perrsonal information management and P2P communication.',
        zome: {}
      },
      {
        id: 'QmHashyCRSIPR',
        happId: 'QmHashyCRISPR',
        name: 'CRISPR',
        type: 'application',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/CRISPR/preview.png',
        description: 'Holochain DNA editing system that enables cloning of DNA patterns to create new DNAs. Agents can configure new DNA to store information and behave the way they want. Uses Holochain as a git like source control with branching, permission control and traceability of changes.',
        zome: {}
      },
      {
        id: 'QmHashyKanban',
        happId: 'QmHashykanban',
        name: 'Kanban',
        type: 'application',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Kanban/preview.png',
        description: 'A kanban board that you can kanban any type of part using the slot.',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: 'Kanban',
          entryTypes: [
            {
              id: 'QmColumnEntryTypeHash',
              name: 'column',
              template: 'list_anchor_types_1',
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
          ],
          profileSpec: {
            id: 'QmKanbanProfileSpecHash',
            template: 'identify',
            fields: []
          }
        }
      },
      {
        id: 'QmHashyPersonasProfiles',
        name: 'Personal Information',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Personal Information/preview.png',
        description: 'Keep control of your personal information, know which apps are using it and update your info in one location.',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: 'PersonalInformation',
          entryTypes: [
            {
              id: 'QmPersonaFieldEntryTypeHash',
              name: 'personafield',
              template: 'list_anchor_types_1',
              fields: [
                {
                  id: 'Qm1333',
                  fieldName: 'fields_field_id',
                  fieldType: 'String',
                  fieldDescription: 'id of the field from the curated and custom fields list',
                  required: true
                },
                {
                  id: 'QM2345667778871',
                  fieldName: 'value',
                  fieldType: 'String',
                  fieldDescription: 'The value of the persona field',
                  required: true
                }
              ]
            },
            {
              id: 'QmProfileFieldEntryTypeHash',
              name: 'profilefield',
              template: 'list_anchor_types_1',
              fields: [
                {
                  id: 'Qm1333',
                  fieldName: 'fields_field_id',
                  fieldType: 'String',
                  fieldDescription: 'id of the field from the curated and custom fields list',
                  required: true
                },
                {
                  id: 'QM2345667778871',
                  fieldName: 'persona_field_address',
                  fieldType: 'String',
                  fieldDescription: 'The address of the persona field entry for the profile field.',
                  required: true
                },
                {
                  id: 'QM2345667778871',
                  fieldName: 'contract',
                  fieldType: 'String',
                  fieldDescription: 'The agreement for how the information is stored.',
                  required: true
                }
              ]
            }
          ],
          anchorTypes: [
            {
              id: 'Qmlist_personas1',
              type: 'Personas',
              text: '',
              tag: ' ',
              context: 'permanent',
              links: [],
              anchors: [
                {
                  id: 'Qmlist_Qmhashpersona1',
                  type: 'Personas',
                  text: 'Personal',
                  links: [
                    {
                      entityId: 'QmPersonaFieldEntryTypeHash',
                      type: 'field_link',
                      tag: ' ',
                      context: 'exclusive'
                    }
                  ]
                },
                {
                  id: 'Qmlist_Qmhashpersona2',
                  type: 'Personas',
                  text: 'Music',
                  links: [
                    {
                      entityId: 'QmPersonaFieldEntryTypeHash',
                      type: 'field_link',
                      tag: ' ',
                      context: 'exclusive'
                    }
                  ]
                }
              ]
            },
            {
              id: 'Qmlist_profiles1',
              type: 'Profiles',
              text: '',
              tag: ' ',
              context: 'permanent',
              links: [],
              anchors: [
                {
                  id: 'Qmlist_Qmhashprofile1',
                  type: 'Profiles',
                  text: 'CRISPR',
                  links: [
                    {
                      entityId: 'QmProfileFieldEntryTypeHash',
                      type: 'field_link',
                      tag: ' ',
                      context: 'exclusive'
                    }
                  ]
                },
                {
                  id: 'Qmlist_Qmhashprofile2',
                  type: 'Profiles',
                  text: 'Holo Punk Records',
                  links: [
                    {
                      entityId: 'QmProfileFieldEntryTypeHash',
                      type: 'field_link',
                      tag: ' ',
                      context: 'exclusive'
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    base: 'Parts',
    projects: [
      {
        id: 'Qmmorebigoriginhashes333',
        happId: 'QmHashyOrigins',
        name: 'Origins',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Origins/preview.jpg',
        description: 'Origins have a title, content and order.',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: 'Origins',
          entryTypes: [
            {
              id: 'QmOriginEntryTypeHash',
              name: 'origin',
              template: 'list_anchor_types_1',
              fields: [
                {
                  id: 'QM234566777887',
                  fieldName: 'content',
                  fieldType: 'String',
                  fieldDescription: 'Main body of the origin',
                  required: false
                }
              ]
            }
          ],
          anchorTypes: [
            {
              id: 'Qmlist_origins1',
              type: 'list_origins',
              text: '',
              tag: ' ',
              context: 'permanent',
              links: [
                {
                  entityId: 'QmOriginEntryTypeHash',
                  type: 'origin_link',
                  tag: 'created_at',
                  context: 'exclusive'
                }
              ],
              anchors: []
            }
          ],
          profileSpec: {
            id: 'QmOriginProfileSpecHash',
            template: 'identify',
            fields: []
          }
        }
      },
      // {
      //   id: 'Qmmorebigwebsitehashes333',
      //   name: 'Websites',
      //   type: 'part',
      //   preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Websites/preview.png'),
      //   folder: '/Users/philipbeadle/holochain/CRISPR/dna',
      //   contact: 'Philip Beadle',
      //   mobile: '+61 999 999 999',
      //   description: 'Websites have a title, content and order.',
      //   zome: {
      //       template: 'Origins',
      //       templateTypeName: 'origin',
      //       itemsTemplatesName: 'template1',
      //       name: 'Websites',
      //       entryTypes: [
      //         {
      //           id: 'QmWebsiteEntryTypeHash',
      //           name: 'website',
      //           template: 'list_anchor_types_1',
      //           fields: [
      //             {
      //               id: 'QM234566777887',
      //               fieldName: 'content',
      //               fieldType: 'String',
      //               fieldDescription: 'Main body of the website',
      //               required: false
      //             }
      //           ]
      //         }
      //       ],
      //       anchorTypes: [
      //         {
      //           id: 'Qmlist_websites1',
      //           type: 'list_websites',
      //           text: '',
      //           tag: ' ',
      //           context: 'permanent',
      //           links: [
      //             {
      //               entityId: 'QmWebsiteEntryTypeHash',
      //               type: 'website_link',
      //               tag: 'created_at',
      //               context: 'exclusive'
      //             }
      //           ],
      //           anchors: []
      //         }
      //       ],
      //       profileSpec: {
      //         id: 'QmWebsiteProfileSpecHash',
      //         template: 'identify',
      //         fields: []
      //       }
      //     }
      // },
      {
        id: 'QmHashyCuratedFields',
        name: 'Curated Fields',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Curated Fields/preview.png',
        description: 'A managed list of fields that make it simple to map profile fields to personas.',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: 'Fields',
          entryTypes: [
            {
              id: 'QmFieldEntryTypeHash',
              name: 'field',
              template: 'list_anchor_types_1',
              fields: [
                {
                  id: 'Qm1333',
                  fieldName: 'name',
                  fieldType: 'String',
                  fieldDescription: 'Name of the field',
                  required: true
                },
                {
                  id: 'QM2345667778871',
                  fieldName: 'ui',
                  fieldType: 'String',
                  fieldDescription: 'The UI component to edit the value',
                  required: true
                }
              ]
            }
          ],
          anchorTypes: [
            {
              id: 'Qmlist_fields1',
              type: 'list_fields',
              text: '',
              tag: ' ',
              context: 'permanent',
              links: [
                {
                  entityId: 'QmFieldEntryTypeHash',
                  type: 'field_link',
                  tag: ' ',
                  context: 'exclusive'
                }
              ],
              anchors: []
            }
          ]
        }
      },
      {
        id: 'Qmmorebigfrecklehashes333',
        happId: 'QmHashyFreckles',
        name: 'Freckles',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Freckles/preview.png',
        description: 'Freckles have a title, content and order. Set the permissions at build time to control who can update and delete freckles.',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: 'Freckles',
          entryTypes: [
            {
              id: 'QmFreckleEntryTypeHash',
              name: 'freckle',
              template: 'list_anchor_types_1',
              fields: [
                {
                  id: 'QM234566777887',
                  fieldName: 'content',
                  fieldType: 'String',
                  fieldDescription: 'Main body of the freckle',
                  required: false
                }
              ]
            }
          ],
          anchorTypes: [
            {
              id: 'Qmlist_freckles1',
              type: 'list_freckles',
              text: '',
              tag: ' ',
              context: 'permanent',
              links: [
                {
                  entityId: 'QmFreckleEntryTypeHash',
                  type: 'freckle_link',
                  tag: 'created_at',
                  context: 'exclusive'
                }
              ],
              anchors: []
            }
          ],
          profileSpec: {
            id: 'QmFreckleProfileSpecHash',
            template: 'identify',
            fields: []
          }
        }
      },
      {
        id: 'Qmmorebighashes333',
        name: 'Notes',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Notes/preview.png',
        description: 'Notes have a title, content and order. Set the permissions at build time to control who can update and delete notes.',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: 'Notes',
          entryTypes: [
            {
              id: 'QmNoteEntryTypeHash',
              name: 'note',
              template: 'list_anchor_types_1',
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
      },
      {
        id: 'QmmorehashyTasks',
        name: 'Tasks',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Tasks/preview.png',
        description: 'A clone of Notes DNA. Tasks have title, done and order.',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: 'Tasks',
          entryTypes: [
            {
              id: 'QmTaskEntryTypeHash',
              name: 'task',
              template: 'list_anchor_types_1',
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
      },
      {
        id: 'Qmmoreratings',
        happId: 'QmHashyratings',
        name: 'Ratings',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Ratings/preview.png',
        description: 'Ratings store a number between 0 & x',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: 'Ratings',
          entryTypes: [
            {
              id: 'QmRatingEntryTypeHash',
              name: 'rating',
              template: 'list_anchor_types_1',
              fields: [
                {
                  id: 'QM2345667778871',
                  fieldName: 'rating',
                  fieldType: 'u32',
                  fieldDescription: '',
                  required: false
                }
              ]
            }
          ],
          anchorTypes: [
            {
              id: 'Qmlist_ratings1',
              type: 'list_ratings',
              text: '',
              tag: ' ',
              context: 'permanent',
              links: [
                {
                  entityId: 'QmRatingEntryTypeHash',
                  type: 'rating_link',
                  tag: ' ',
                  context: 'exclusive'
                }
              ],
              anchors: [
                {
                  id: 'Qmlist_Qmhashrating1',
                  type: 'list_ratings',
                  text: 'Address1RatingLinkedFrom',
                  links: [
                    {
                      entityId: 'QmRatingEntryTypeHash',
                      type: 'rating_link',
                      tag: ' ',
                      context: 'exclusive'
                    }
                  ]
                },
                {
                  id: 'Qmlist_Qmhashrating2',
                  type: 'list_ratings',
                  text: 'Address2RatingLinkedFrom',
                  links: [
                    {
                      entityId: 'QmRatingEntryTypeHash',
                      type: 'rating_link',
                      tag: ' ',
                      context: 'exclusive'
                    }
                  ]
                },
                {
                  id: 'Qmlist_Qmhashrating3',
                  type: 'list_ratings',
                  text: 'Address3RatingLinkedFrom',
                  links: [
                    {
                      entityId: 'QmRatingEntryTypeHash',
                      type: 'rating_link',
                      tag: ' ',
                      context: 'exclusive'
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        id: 'QmProjectsHash',
        name: 'Projects',
        preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Projects/preview.png',
        description: 'Projects',
        zome: {
          template: 'Origins',
          templateTypeName: 'origin',
          itemsTemplatesName: 'template1',
          name: 'Projects',
          entryTypes: [
            {
              id: 'QmProjectEntryTypeHash',
              name: 'project',
              template: 'list_anchor_types_1',
              fields: [
                {
                  id: 'Qm1333',
                  fieldName: 'name',
                  fieldType: 'String',
                  fieldDescription: 'Title of the project',
                  required: true
                },
                {
                  id: 'QM234566777887q',
                  fieldName: 'description',
                  fieldType: 'String',
                  fieldDescription: 'What new characteristics are you giving your clone?',
                  required: false
                },
                {
                  id: 'QM234566777887',
                  fieldName: 'preview',
                  fieldType: 'String',
                  fieldDescription: 'Image for the project',
                  required: false
                },
                {
                  id: 'QM23456677w',
                  fieldName: 'zome',
                  fieldType: 'String',
                  fieldDescription: 'Zome definition',
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
              id: 'Qmlist_projects1',
              type: 'list_projects',
              text: '',
              tag: ' ',
              context: 'permanent',
              links: [],
              anchors: [
                {
                  id: 'Qmlist_Qmhashproject1',
                  type: 'list_projects',
                  text: 'Parts',
                  links: [
                    {
                      entityId: 'QmProjectEntryTypeHash',
                      type: 'project_link',
                      tag: ' ',
                      context: 'exclusive'
                    }
                  ]
                },
                {
                  id: 'Qmlist_Qmhashproject2',
                  type: 'list_projects',
                  text: 'Applications',
                  links: [
                    {
                      entityId: 'QmProjectEntryTypeHash',
                      type: 'project_link',
                      tag: ' ',
                      context: 'exclusive'
                    }
                  ]
                }
              ]
            }
          ],
          profileSpec: {
            id: 'QmKanbanProfileSpecHash',
            template: 'identify',
            fields: []
          }
        }
      }
    ]
  }
]

let startedConductor = false
const tryConnection = () => {
  client.connect(
    { port },
    () => {
      client.end()
      if (!startedConductor) {
        console.log('starting ui, connect to:' + port)
        startedConductor = true
        devHolochainConnection.then(({ callZome }) => {
          console.log('started_demo_setup_phil')
          // callZome('notes', 'notes', 'create_note')({ base: '', note_input: { uuid: uuidv4(), title: 'Phils Note from setup file', content: 'demo-setup-phil.js', order: 1 } }).then((result) => {
          //   const res = JSON.parse(result)
          //   console.log('ok_demo_setup_phil', res)
          //   callZome('tasks', 'tasks', 'create_task')({ base: res.Ok.id, task_input: { uuid: uuidv4(), title: 'Phils Task', "done":false } }).then((result) => {
          //     const res = JSON.parse(result)
          //     console.log('ok_demo_setup_phil_task', res)
          //   })
           // })
          baseProjects[0].projects.forEach((p, index) => {
            callZome('projects', 'projects', 'create_project')({ base: 'Applications', project_input : {uuid:uuidv4(), name: p.name, description: p.description, preview: p.preview, zome: JSON.stringify(p.zome), order: index }})
            .then((result) => {
              const res = JSON.parse(result)
              console.log('ok_demo_setup_phil_Applications', res)
            })
            .catch(err =>{
              console.log(err)
            })
          })

          // baseProjects[1].projects.forEach((p, index) => {
          //   callZome('projects', 'projects', 'create_project')({ base: 'Parts', project_input : {uuid:uuidv4(), name: p.name, description: p.description, preview: p.preview, zome: JSON.stringify(p.zome), order: index }})
          //   .then((result) => {
          //     const res = JSON.parse(result)
          //     console.log('ok_demo_setup_phil_parts', res)
          //   })
          //   .catch(err =>{
          //     console.log(err)
          //   })
          // })
        })
      }
    }
  )
}

tryConnection()

client.on('error', () => {
  console.log('Waiting for Holochain to configure and boot')
  setTimeout(tryConnection, 5000)
})


  // // Phil's Personal persona
  // const philPersonalFullName = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": fullNameId.Ok.id, "value": "Philip Beadle"}})
  // console.log('philPersonalFullName', philPersonalFullName)
  // const philPersonalHandle = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "philip.beadle"}})
  // console.log('philPersonalHandle', philPersonalHandle)
  // const philPersonalAvatar = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Personal", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/philip.beadle.png')}})
  // console.log('philPersonalAvatar', philPersonalAvatar)
  // const philHolochainProfilePic = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Holochain", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profilePicId.Ok.id, "value": base64_encode('./assets/philip.beadle.profile.jpg')}})
  // console.log('philHolochainProfilePic', philHolochainProfilePic)

  // // Phil's Music persona
  // const philMusicHandle = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": handleId.Ok.id, "value": "@philt3r"}})
  // console.log('philMusicHandle', philMusicHandle)
  // const philMusicAvatar = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": avatarId.Ok.id, "value": base64_encode('./assets/philt3r.png')}})
  // console.log('philMusicAvatar', philMusicAvatar)
  // const philMusicUrl = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": urlProfileField.Ok.id, "value": "http://philt3r.rocks"}})
  // console.log('philMusicUrl', philMusicUrl)
  // const philMusicBio = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": bioId.Ok.id, "value": "  @philt3r is not a metaphor for a side affect, but rather a side affect of a metamorphosis. For a decade, he has planted smiles and swivelled dials along that great stretch of party paradise that is the east-coast of Australia. @philt3r’s sets started out spanning more genres than a well thought out German street parade, but now it's techno, phat, dark, dystopic TECHNO! @philt3r can read a crowd better than airport security, and take them further up than their overpriced tickets. But that's what we like about @philt3r, his lack of tickets on himself. So get your 'TECHNO!' on with @philt3r at your next attempt to escape reality!"}})
  // console.log('philMusicBio', philMusicBio)
  // const philMusicProfilePic = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profilePicId.Ok.id, "value": base64_encode('./assets/philt3r-profile.jpg')}})
  // console.log('philMusicProfilePic', philMusicProfilePic)
  // const philMusicProfileImages = await phil.call("personalinformation", "personalinformation", "create_personafield",  {"base": "Music", "personafield_input" : {"uuid":uuidv4(), "fieldsFieldId": profileImages.Ok.id, "value": [{ name:"", image: base64_encode('./assets/philt3r-profile.jpg') }, { name:"", image: base64_encode('./assets/philt3r-profile.jpg') }, { name:"", image: base64_encode('./assets/philt3r-profile.jpg') }]}})
  // console.log('philMusicProfileImages', philMusicProfileImages)