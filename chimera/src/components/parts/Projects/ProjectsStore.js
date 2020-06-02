import { v4 as uuidv4 } from 'uuid'
const fs = require('fs')
function base64Encode (file) {
  var bitmap = fs.readFileSync(file)
  return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}
export default {
  namespaced: true,
  state: {
    featured: [],
    baseProjects: [
      {
        base: 'PartEditor',
        projects: [
          {
            id: 'PartEditor1',
            happId: 'QmHashyOrigins',
            name: 'Origins',
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Origins/preview.jpg'),
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
          {
            id: 'PartEditor2',
            name: 'Projects',
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Projects/preview.png'),
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
                      id: 'QM234566777887',
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
      },
      {
        base: 'Applications_',
        projects: [
          {
            id: 'QmHashyChimera',
            name: 'Chimera',
            type: 'application',
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Chimera/preview.png'),
            description: 'Agent centric personalised Holochain experience for using & configuring hApps includes perrsonal information management and P2P communication.',
            zome: {}
          },
          {
            id: 'QmHashyCRSIPR',
            happId: 'QmHashyCRISPR',
            name: 'CRISPR',
            type: 'application',
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/CRISPR/preview.png'),
            description: 'Holochain DNA editing system that enables cloning of DNA patterns to create new DNAs. Agents can configure new DNA to store information and behave the way they want. Uses Holochain as a git like source control with branching, permission control and traceability of changes.',
            zome: {}
          },
          {
            id: 'QmHashyKanban',
            happId: 'QmHashykanban',
            name: 'Kanban',
            type: 'application',
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Kanban/preview.png'),
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
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Personal Information/preview.png'),
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
        base: 'Parts_',
        projects: [
          {
            id: 'Qmmorebigoriginhashes333',
            happId: 'QmHashyOrigins',
            name: 'Origins',
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Origins/preview.jpg'),
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
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Curated Fields/preview.png'),
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
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Freckles/preview.png'),
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
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Notes/preview.png'),
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
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Tasks/preview.png'),
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
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Ratings/preview.png'),
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
            preview: base64Encode('/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Projects/preview.png'),
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
    ],
    editing: false,
    errors: []
  },
  mutations: {
    createProject (state, payload) {
      const base = state.baseProjects.find(b => b.base === payload.base)
      if (base) {
        base.projects = base.projects.filter(n => n.id !== 'new')
        base.projects.splice(0, 0, payload.data)
      } else {
        state.baseProjects.push((payload))
      }
    },
    updateProject (state, payload) {
      const base = state.baseProjects.find(e => e.base === payload.base)
      if (!base) {
        state.baseProjects.push(payload)
      } else {
        const updatedProjects = base.projects.map(project => {
          if (project.id === payload.data.id) {
            return Object.assign({}, project, payload.data)
          }
          return project
        })
        state.baseProjects.find(e => e.base === payload.base).projects = updatedProjects
      }
    },
    deleteProject (state, payload) {
      console.log(state, payload)
      const base = state.baseProjects.find(b => b.base === payload.base)
      if (base) {
        state.baseProjects.find(e => e.base === payload.base).projects = base.projects.filter(e => e.id !== payload.data)
      }
    },
    error (state, payload) {
      state.errors.push(payload)
    },
    resetErrors (state, payload) {
      state.errors = state.errors.filter(e => e.base !== payload)
    },
    setProjectsList (state, payload) {
      const base = state.baseProjects.find(b => b.base === payload.base)
      payload.projects.forEach(p => {
        p.zome = Object.assign({}, JSON.parse(p.zome))
        p.preview = base64Encode(p.preview)
      })
      if (base !== undefined) {
        base.projects = payload.projects
      } else {
        state.baseProjects.push(payload)
      }
    }
  },
  getters: {
    featured: (state, getters) => {
      return getters.parsedGames.sort((a, b) => {
        if (a.updated < b.updated) return -1
        if (a.updated > b.updated) return 1
        return 0
      }).slice(0, 3)
    },
    listProjects: state => (base) => {
      const baseProject = state.baseProjects.find(n => n.base === base)
      if (baseProject) {
        return baseProject.projects.sort((a, b) => {
          if (a.order < b.order) return -1
          if (a.order > b.order) return 1
          return 0
        })
      } else {
        return []
      }
    },
    listErrors: state => (base) => {
      const baseErrors = state.errors.filter(e => e.base === base)
      if (baseErrors) {
        return baseErrors.map(b => JSON.parse(b.error).kind)
      } else {
        return []
      }
    },
    projectById: (state) => (projectId) => {
      const base = state.baseProjects.find((base) => {
        return base.projects.some((project) => {
          return project.id === projectId
        })
      })
      const project = base.projects.find(project => project.id === projectId)
      console.log(project)
      return project
    }
  },
  actions: {
    acknowledgeErrors: ({ state, commit, rootState }, base) => {
      commit('resetErrors', base)
    },
    order: ({ state, commit, rootState }, payload) => {
      commit('setProjectsList', { base: payload.base, projects: payload.projects })
      payload.projects.forEach(project => {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('projects', 'projects', 'update_project')({ id: project.id, created_at: project.createdAt, address: project.address, project_input: { uuid: project.uuid, title: project.title, content: project.content, order: project.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateProject', { base: payload.base, data: res.Ok })
            }
          })
        })
      })
    },
    rebase: ({ state, commit, rootState }, payload) => {
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('projects', 'projects', 'rebase_project')({ base_from: payload.from, base_to: payload.to, id: payload.id, created_at: payload.createdAt }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          }
        })
      })
    },
    fetchProjects: ({ state, commit, rootState }, base) => {
      // alert(JSON.stringify(state.baseProjects[0].projects[0].zome))
      if (base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('projects', 'projects', 'list_projects')({ base: base }).then((result) => {
          const res = JSON.parse(result)
          console.log(res)
          if (res.Ok === undefined) {
            console.log(res)
          } else {
            commit('setProjectsList', { base: base, projects: res.Ok })
          }
        })
      })
    },
    saveProject: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      if (payload.project.id === 'new' || payload.project.id === undefined) {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('projects', 'projects', 'create_project')({ base: payload.base, project_input: { uuid: uuidv4(), title: payload.project.title, content: payload.project.content, order: payload.project.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('createProject', { base: payload.base, data: res.Ok })
            }
          })
        })
      } else {
        rootState.devHolochainConnection.then(({ callZome }) => {
          callZome('projects', 'projects', 'update_project')({ id: payload.project.id, created_at: payload.project.createdAt, address: payload.project.address, project_input: { uuid: payload.project.uuid, title: payload.project.title, content: payload.project.content, order: payload.project.order } }).then((result) => {
            const res = JSON.parse(result)
            // console.log(res)
            if (res.Ok === undefined) {
              commit('error', { base: payload.base, error: res.Err.Internal })
            } else {
              commit('updateProject', { base: payload.base, data: res.Ok })
            }
          })
        })
      }
    },
    deleteProject: ({ state, commit, rootState }, payload) => {
      if (payload.base === 'PartEditor') return
      rootState.devHolochainConnection.then(({ callZome }) => {
        callZome('projects', 'projects', 'delete_project')({ base: payload.base, id: payload.project.id, created_at: payload.project.createdAt, address: payload.project.address }).then((result) => {
          const res = JSON.parse(result)
          if (res.Ok === undefined) {
            commit('error', { base: payload.base, error: res.Err.Internal })
          } else {
            commit('deleteProject', { base: payload.base, data: payload.project.id })
          }
        })
      })
    }
  }
}
