const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const port = 33000;
const { connect } = require('@holochain/hc-web-client')
const holochainConnection = connect({ url: `ws://localhost:${port}` })
const net = require('net')
const client = new net.Socket()

function base64Encode(file) {
    var bitmap = fs.readFileSync(file);
    return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}

const projects = [
  {
    name: 'Chimera',
    preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Chimera/preview.png',
    description: 'Agent centric personalised Holochain experience for using & configuring hApps includes perrsonal information management and P2P communication.',
    zome: {
      template: 'Origins',
      templateTypeName: 'origin',
      itemsTemplatesName: 'template1',
      name: 'Instances',
      entryTypes: [
        {
          id: 'QmInstanceEntryTypeHash',
          name: 'instance',
          template: 'list_anchor_types_1',
          fields: [
            {
              id: 'Qm1333',
              fieldName: 'zome',
              fieldType: 'String',
              fieldDescription: 'Name of the zome',
              required: true
            },
            {
              id: 'Qm1333',
              fieldName: 'type',
              fieldType: 'String',
              fieldDescription: 'name of the entry type',
              required: true
            },
            {
              id: 'Qm1333',
              fieldName: 'instance_id',
              fieldType: 'String',
              fieldDescription: 'name of the zome',
              required: true
            },
            {
              id: 'Qm1333',
              fieldName: 'instance_name',
              fieldType: 'String',
              fieldDescription: 'name of the zome',
              required: true
            },
            {
              id: 'Qm1333',
              fieldName: 'entry',
              fieldType: 'String',
              fieldDescription: 'A new entry for this entry type',
              required: true
            }
          ]
        }
      ],
      anchorTypes: [
        {
          id: 'Qmlist_instances1',
          type: 'list_instances',
          text: '',
          tag: ' ',
          context: 'permanent',
          links: [
            {
              entityId: 'QmInstanceEntryTypeHash',
              type: 'instance_link',
              tag: ' ',
              context: 'exclusive'
            }
          ],
          anchors: [
            {
              id: 'Qmlist_Qmhashinstance1',
              type: 'list_instances',
              text: 'CRISPR',
              links: [
                {
                  entityId: 'QmInstanceEntryTypeHash',
                  type: 'instance_link',
                  tag: ' ',
                  context: 'exclusive'
                }
              ]
            },
            {
              id: 'Qmlist_Qmhasinst2',
              type: 'list_instances',
              text: 'Tasks',
              links: [
                {
                  entityId: 'QmInstanceEntryTypeHash',
                  type: 'instance_link',
                  tag: ' ',
                  context: 'exclusive'
                }
              ]
            },
            {
              id: 'Qmlist_Qmhashinst3',
              type: 'list_instances',
              text: 'Bubbles',
              links: [
                {
                  entityId: 'QmInstanceEntryTypeHash',
                  type: 'instance_link',
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
    happId: 'QmHashyCRISPR',
    name: 'CRISPR',
    preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/CRISPR/preview.png',
    description: 'Holochain DNA editing system that enables cloning of DNA patterns to create new DNAs. Agents can configure new DNA to store information and behave the way they want. Uses Holochain as a git like source control with branching, permission control and traceability of changes.',
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
  },
  {
    name: 'Holo Punk Records',
    preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/happs/holopunk-records/bg.png',
    description: 'Music & Video sharing and live DJ streaming application & Unity 3D Game.',
    zome: {}
  },
  {
    happId: 'QmHashykanban',
    name: 'Kanban',
    preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/happs/Kanban/preview.png',
    description: 'Music & Video sharing and live DJ streaming application & Unity 3D Game..',
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
    },
  },
  {
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
  },
  {
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
  {
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
    name: 'Tags',
    preview: '/Users/philipbeadle/holochain/CRISPR/chimera/src/assets/projects/Tags/preview.png',
    description: 'Tags',
    zome: {
      template: 'Tags',
      templateTypeName: 'tag',
      itemsTemplatesName: 'template1',
      name: 'Tags',
      entryTypes: [],
      anchorTypes: [
        {
          id: 'Qmlist_tags1',
          type: 'list_tags',
          text: '',
          tag: ' ',
          context: 'permanent',
          anchors: [
            {
              id: 'QmTagsAnchor1',
              type: 'list_tags',
              text: 'Techno',
              anchors: [
                {
                  id: 'QmTagsAnchor2',
                  type: 'tagged_entries',
                  text: 'notes dht instanceId::note1 id',
                  biDirectional: true,
                  context: 'Techno'
                },
                {
                  id: 'QmTagsAnchor44',
                  type: 'tagged_entries',
                  text: 'notes dht instanceId::note2 id',
                  biDirectional: true,
                  context: 'Techno'
                }
              ]
            },
            {
              id: 'QmTagsAnchor155555',
              type: 'list_tags',
              text: 'Psytrance',
              anchors: [
                {
                  id: 'QmTagsAnchor7',
                  type: 'tagged_entries',
                  text: 'notes dht 2 instanceId::note3 id',
                  biDirectional: true,
                  context: 'Psytrance'
                },
                {
                  id: 'QmTagsAnchor44',
                  type: 'tagged_entries',
                  text: 'notes dht instanceId::note2 id',
                  biDirectional: true,
                  context: 'Psytrance'
                }
              ]
            },
            {
              id: 'QmTagsAnchor3',
              type: 'list_tags',
              text: 'Metal',
              anchors: [
                {
                  id: 'QmTagsAnchor44',
                  type: 'tagged_entries',
                  text: 'notes dht instanceId::note2 id',
                  biDirectional: true,
                  context: 'Metal'
                },
                {
                  id: 'QmTagsAnchor12',
                  type: 'tagged_entries',
                  text: 'notes dht 2 instanceId::note47 id',
                  biDirectional: true,
                  context: 'Metal'
                },
                {
                  id: 'QmTagsAnchor123',
                  type: 'tagged_entries',
                  text: 'notes dht 2 instanceId::note201 id',
                  biDirectional: true,
                  context: 'Metal'
                }
              ]
            },
            {
              id: 'QmTagsAnchor4',
              type: 'list_tags',
              text: 'Rock',
              anchors: [
                {
                  id: 'QmTagsAnchor12',
                  type: 'tagged_entries',
                  text: 'notes dht 2 instanceId::note47 id',
                  biDirectional: true,
                  context: 'Rock'
                },
                {
                  id: 'QmTagsAnchor123',
                  type: 'tagged_entries',
                  text: 'notes dht 2 instanceId::note201 id',
                  biDirectional: true,
                  context: 'Rock'
                }
              ]
            }
          ]
        }
      ]
    }
  }
]
const projectCRISPR = projects.find(p => p.name === 'CRISPR')
const projectOrigins = projects.find(p => p.name === 'Origins')
const projectChimera = projects.find(p => p.name === 'Chimera')
const projectHoloPunkRecords = projects.find(p => p.name === 'Holo Punk Records')
const projectKanban = projects.find(p => p.name === 'Kanban')

const projectPersonalInformation = projects.find(p => p.name === 'Personal Information')
const projectCuratedFields = projects.find(p => p.name === 'Curated Fields')
const projectFreckles = projects.find(p => p.name === 'Freckles')
const projectNotes = projects.find(p => p.name === 'Notes')
const projectTasks = projects.find(p => p.name === 'Tasks')
const projectRatings = projects.find(p => p.name === 'Ratings')
const projectProjects = projects.find(p => p.name === 'Projects')
const projectTags = projects.find(p => p.name === 'Tags')

let startedConductor = false
const tryConnection = () => {
  client.connect({ port }, () => {
      client.end()
      if (!startedConductor) {
        console.log('starting ui, connect to:' + port)
        startedConductor = true
        holochainConnection.then(({ callZome }) => {
          // projectCRISPR
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Applications', project_input : { uuid:uuidv4(), name: projectCRISPR.name, description: projectCRISPR.description, preview: projectCRISPR.preview, zome: JSON.stringify(projectCRISPR.zome), order: 0 }})
          .then((result) => {
            const projectCRISPRId = JSON.parse(result).Ok.id
            console.log(JSON.parse(result))
            callZome('95569e2e-0de2-4073-8a7d-579f87534c04', 'kanban', 'create_column')({base: projectCRISPRId, column_input : { uuid:uuidv4(), title: 'Done', order: 2}}).then((result) => {
              const columnId = JSON.parse(result).Ok.id
              console.log(JSON.parse(result))
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Clone parts files', content: 'The cloning process needs to copy the "Origin" files for the vuex store & component', order: 0 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Build & test DNA', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))              
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Copy, Replace, Write store', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                               
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Copy, Replace, Write component', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                               
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Part Editor', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                              
                }).catch(err =>{console.log(err)})
              }).catch(err =>{console.log(err)})
            }).catch(err =>{console.log(err)})
            callZome('95569e2e-0de2-4073-8a7d-579f87534c04', 'kanban', 'create_column')({base: projectCRISPRId, column_input : { uuid:uuidv4(), title: 'Doing', order: 1}}).then((result) => {
              const columnId = JSON.parse(result).Ok.id
              console.log(JSON.parse(result))
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Tags Part', content: 'The tags part can be used to "tag" entries by selecting or adding 1 or more tags. A tag cloud is then created from the tags so that entries can easily be found.', order: 0 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Research Vue components', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))               
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Clone Origins to Tags', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                 
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Design Part Editor state', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Modify Zome Modeller', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                   
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'New code template', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                   
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'hc:package', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                   
                }).catch(err =>{console.log(err)})
              }).catch(err =>{console.log(err)})
            }).catch(err =>{console.log(err)})
            callZome('95569e2e-0de2-4073-8a7d-579f87534c04', 'kanban', 'create_column')({base: projectCRISPRId, column_input : { uuid:uuidv4(), title: 'Do', order: 0}}).then((result) => {
              const columnId = JSON.parse(result).Ok.id
              console.log(JSON.parse(result))
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'InstanceIds', content: 'Each new Part that is added needs either a new DHT or install an existing network. Unique InstanceIds that the Part can be associated with will enable the Part to call the correct DHT. Each InstanceId will need a player friendly name and probably namespaced to the type of Part.', order: 0 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Add instance to partParts', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                                  
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Develop some patterns for associating part to instance', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                 
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Update demo to use Guids for instanceId', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Add multiple Task DHTs in demo', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                   
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Add multiple Freckles DHTs', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                   
                }).catch(err =>{console.log(err)})
              }).catch(err =>{console.log(err)})
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'InstanceId Manager', content: 'Adding or removing a DHT instance involves installing or uninstalling it from the conductor. The list of partParts needs to be updated as well such that if an instance is removed it no longer shows on the parent part it was associated with.', order: 0 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Clone Origins', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                 
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Fields: instance, name, part', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                 
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Install new DHT on add Part', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Install invite DHT on accept invite', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                   
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Add Tags part to each instance', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                   
                }).catch(err =>{console.log(err)})
              }).catch(err =>{console.log(err)})
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Part Editor Improvements', content: 'When using the Part Editor to modify the code of a Part it is quite normal to save code that does not compile due to missed symbols etc. The issue is that it is the editor being used that fails to compile and another code editor has to be used to fix the issue. Not ideal. Most issues could be caught with a code linter that is run before saving the file.', order: 0 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Investigate running eslint in the browser', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                 
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Lint each file on Save', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                 
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Do not save if lint errors', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Install invite DHT on accept invite', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                   
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Add Tags part to each instance', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                   
                }).catch(err =>{console.log(err)})
              }).catch(err =>{console.log(err)})
            }).catch(err =>{console.log(err)})
          }).catch(err =>{console.log(err)})

          // projectChimera
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Applications', project_input : { uuid:uuidv4(), name: projectChimera.name, description: projectChimera.description, preview: projectChimera.preview, zome: JSON.stringify(projectChimera.zome), order: 1 }})
          .then((result) => {
            const projectChimeraId = JSON.parse(result).Ok.id
            console.log(JSON.parse(result))
            callZome('95569e2e-0de2-4073-8a7d-579f87534c04', 'kanban', 'create_column')({base: projectChimeraId, column_input : { uuid:uuidv4(), title: 'Done', order: 2}}).then((result) => {
              console.log(JSON.parse(result))
            }).catch(err =>{console.log(err)})
            callZome('95569e2e-0de2-4073-8a7d-579f87534c04', 'kanban', 'create_column')({base: projectChimeraId, column_input : { uuid:uuidv4(), title: 'Doing', order: 1}}).then((result) => {
              const columnId = JSON.parse(result).Ok.id
              console.log(JSON.parse(result))
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Make partBase []', content: 'When the partBase is an "Application" need to be able to add parts to the parts as well', order: 0 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'partBase is []', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                  
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Add each part in the []', done:false }})
                .then((result) => {
                  console.log(JSON.parse(result))                                                 
                }).catch(err =>{console.log(err)})
              }).catch(err =>{console.log(err)})
            }).catch(err =>{console.log(err)})
            callZome('95569e2e-0de2-4073-8a7d-579f87534c04', 'kanban', 'create_column')({base: projectChimeraId, column_input : { uuid:uuidv4(), title: 'Do', order: 0}}).then((result) => {
              const columnId = JSON.parse(result).Ok.id
              console.log(JSON.parse(result))
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Applications / Parts "store"', content: 'We need an easy way to find new apps and parts as well as a way to publish newly built parts and apps. This "store" is an integral part of socialising DHTs.', order: 0 }})
              .then((result) => {
                console.log(JSON.parse(result))
              }).catch(err =>{console.log(err)})
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Player settings for UI', content: 'It would be really cool to be able to change up the way the UI looks for a part. Eg a note currently is just the text, being able to change the UI to make it look like a PostIt would be great.', order: 0 }})
              .then((result) => {
                console.log(JSON.parse(result))
              }).catch(err =>{console.log(err)})
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'List item options', content: 'Options for listing items could be a straight list, calendar, carousel etc.', order: 0 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
              }).catch(err =>{console.log(err)})
            }).catch(err =>{console.log(err)})
          }).catch(err =>{console.log(err)})

          // projectKanban
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Applications', project_input : { uuid:uuidv4(), name: projectKanban.name, description: projectKanban.description, preview: projectKanban.preview, zome: JSON.stringify(projectKanban.zome), order: 3 }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})

          // projectPersonalInformation
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Applications', project_input : { uuid:uuidv4(), name: projectPersonalInformation.name, description: projectPersonalInformation.description, preview: projectPersonalInformation.preview, zome: JSON.stringify(projectPersonalInformation.zome), order: 4 }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})

          // projectHoloPunkRecords
          callZome('15f5c748-e611-47c7-9d1b-7651e5c16d17', 'projects', 'create_project')({ base: 'Applications', project_input : { uuid:uuidv4(), name: projectHoloPunkRecords.name, description: projectHoloPunkRecords.description, preview: projectHoloPunkRecords.preview, zome: JSON.stringify(projectHoloPunkRecords.zome), order: 5 }})
          .then((result) => {
            const projectHoloPunkRecordsId = JSON.parse(result).Ok.id
            console.log(JSON.parse(result))
            callZome('68342fe4-c2e3-4568-836e-421722757c84', 'kanban', 'create_column')({base: projectHoloPunkRecordsId, column_input : { uuid:uuidv4(), title: 'Done', order: 2}}).then((result) => {
              console.log(JSON.parse(result))
            }).catch(err =>{console.log(err)})
            callZome('68342fe4-c2e3-4568-836e-421722757c84', 'kanban', 'create_column')({base: projectHoloPunkRecordsId, column_input : { uuid:uuidv4(), title: 'In Progress', order: 1}}).then((result) => {
              console.log(JSON.parse(result))
            }).catch(err =>{console.log(err)})
            callZome('68342fe4-c2e3-4568-836e-421722757c84', 'kanban', 'create_column')({base: projectHoloPunkRecordsId, column_input : { uuid:uuidv4(), title: 'Ideas', order: 0}}).then((result) => {
              const columnId = JSON.parse(result).Ok.id
              console.log(JSON.parse(result))
              callZome('6025b761-26e0-42c2-ad96-8bdc1ce00c33', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Distributed DJ streaming', content: 'Players in the Unity game get the upcoming playlist (can be updated during the performance) so there is no buffering or delay. Tracks are played by Unity for the players using the tracklist and the MIDI messags from the DJ. All messages are saved into the DHT as well as being direct messages (possibly WebRTC). Live performance can be replayed and track artists get paid using info such as how much of the track was played.', order: 0 }})
              .then((result) => {
                console.log(JSON.parse(result))
              }).catch(err =>{console.log(err)})
              callZome('6025b761-26e0-42c2-ad96-8bdc1ce00c33', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Live Streaming MIDI messages', content: 'Using http://42noir.com/es/ & https://github.com/shaltiel/42Noir-UnityEasyController we can connect up any MIDI controller and record the messages and Direct Message to players who are listening to the live Stream.', order: 1 }})
              .then((result) => {
                console.log(JSON.parse(result))
              }).catch(err =>{console.log(err)})
              callZome('6025b761-26e0-42c2-ad96-8bdc1ce00c33', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Live Streaming MIDI messages', content: 'Looks like this https://assetstore.unity.com/packages/tools/audio/dj-pro-41993 will be good for playing the DJ set at the players device.', order: 2 }})
              .then((result) => {
                console.log(JSON.parse(result))
              }).catch(err =>{console.log(err)})
              callZome('6025b761-26e0-42c2-ad96-8bdc1ce00c33', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Distributed VJ streaming', content: 'Same approach as DJing just using video clips, can also be controlled by DJ  using the same MIDI messages.', order: 3 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
              }).catch(err =>{console.log(err)})
              callZome('6025b761-26e0-42c2-ad96-8bdc1ce00c33', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'In game lighting & effects', content: 'Using the same MIDI messages for DJing we can control the in game lights & effects.', order: 4 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
              }).catch(err =>{console.log(err)})
            }).catch(err =>{console.log(err)})
          }).catch(err =>{console.log(err)})

          // // projectProjects
          // callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Applications', project_input : { uuid:uuidv4(), name: projectProjects.name, description: projectProjects.description, preview: projectProjects.preview, zome: JSON.stringify(projectProjects.zome), order: 6 }})
          // .then((result) => {
          //   console.log(JSON.parse(result))
          // }).catch(err =>{console.log(err)})   

          // projectCuratedFields
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Applications', project_input : { uuid:uuidv4(), name: projectCuratedFields.name, description: projectCuratedFields.description, preview: projectCuratedFields.preview, zome: JSON.stringify(projectCuratedFields.zome), order: 1 }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})

          // projectOrigins
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Parts', project_input : { uuid:uuidv4(), name: projectOrigins.name, description: projectOrigins.description, preview: projectOrigins.preview, zome: JSON.stringify(projectOrigins.zome), order: 0 }})
          .then((result) => {
            const projectOriginsId = JSON.parse(result).Ok.id
            console.log(JSON.parse(result))
            callZome('95569e2e-0de2-4073-8a7d-579f87534c04', 'kanban', 'create_column')({base: projectOriginsId, column_input : { uuid:uuidv4(), title: 'Done', order: 2}}).then((result) => {
              const columnId = JSON.parse(result).Ok.id
              console.log(JSON.parse(result))
              callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({base: columnId, note_input : { uuid:uuidv4(), title: 'Clone parts files', content: 'The cloning process needs to copy the "Origin" files for the vuex store & component', order: 0 }})
              .then((result) => {
                const noteId = JSON.parse(result).Ok.id
                console.log(JSON.parse(result))
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Build & test DNA', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Copy, Replace, Write store', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                 
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Copy, Replace, Write component', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                  
                }).catch(err =>{console.log(err)})
                callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({base: noteId, task_input : { uuid:uuidv4(), title: 'Part Editor', done:true }})
                .then((result) => {
                  console.log(JSON.parse(result))                 
                }).catch(err =>{console.log(err)})
              }).catch(err =>{console.log(err)})
            }).catch(err =>{console.log(err)})
            callZome('95569e2e-0de2-4073-8a7d-579f87534c04', 'kanban', 'create_column')({base: projectOriginsId, column_input : { uuid:uuidv4(), title: 'Doing', order: 1}}).then((result) => {
              console.log(JSON.parse(result))
            }).catch(err =>{console.log(err)})
            callZome('95569e2e-0de2-4073-8a7d-579f87534c04', 'kanban', 'create_column')({base: projectOriginsId, column_input : { uuid:uuidv4(), title: 'Do', order: 0}}).then((result) => {
              console.log(JSON.parse(result))
            }).catch(err =>{console.log(err)})
          }).catch(err =>{console.log(err)})

          // projectFreckles
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Parts', project_input : { uuid:uuidv4(), name: projectFreckles.name, description: projectFreckles.description, preview: projectFreckles.preview, zome: JSON.stringify(projectFreckles.zome), order: 2 }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})

          // projectNotes
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Parts', project_input : { uuid:uuidv4(), name: projectNotes.name, description: projectNotes.description, preview: projectNotes.preview, zome: JSON.stringify(projectNotes.zome), order: 3 }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})

          // projectTasks
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Parts', project_input : { uuid:uuidv4(), name: projectTasks.name, description: projectTasks.description, preview: projectTasks.preview, zome: JSON.stringify(projectTasks.zome), order: 4 }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})

          // projectRatings
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Parts', project_input : { uuid:uuidv4(), name: projectRatings.name, description: projectRatings.description, preview: projectRatings.preview, zome: JSON.stringify(projectRatings.zome), order: 5 }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})                 

          // projectTags
          callZome('ef5ba968-0048-4135-b831-a86b615a89b2', 'projects', 'create_project')({ base: 'Parts', project_input : { uuid:uuidv4(), name: projectTags.name, description: projectTags.description, preview: projectTags.preview, zome: JSON.stringify(projectTags.zome), order: 7 }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})  
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
