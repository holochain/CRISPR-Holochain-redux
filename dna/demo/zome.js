export const zome = {
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