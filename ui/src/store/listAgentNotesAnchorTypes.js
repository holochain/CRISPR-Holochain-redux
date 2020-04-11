export const listAgentNotesAnchorTypes = [
    {
      id: 'Qmlist_notesHash',
      type: 'list_notes',
      text: '',
      entryTypes: [
        {
          id: 'QmNoteEntryTypeHash',
          name: 'Note',
          fields: [
            {
              id: 'Qm1333',
              fieldName: 'title',
              fieldType: 'String',
              uiView: '<h3>${note.title}</h3>',
              uiEdit: '<div class="form-row"><mwc-textfield outlined label="Title" id="title" .value=${note.title} @change=${  e => { note.title = e.target.value }}></mwc-textfield></div>'
            },
            {
              id: 'Qm2',
              fieldName: 'content',
              fieldType: 'String',
              uiView: '<div class="note-content">${note.content}</div>',
              uiEdit: '<div class="form-row"><mwc-textarea outlined label="Content" id="content" .value=${note.content} @change=${ e => { note.content = e.target.value }}></mwc-textarea></div>'
            }
          ],
          metaFields: [
            {
              id: 'Qm11',
              fieldName: 'id',
              fieldType: 'Address',
              uiView: ''
            },
            {
              id: 'Qm12',
              fieldName: 'created_at',
              fieldType: 'Iso8601',
              uiView: '<p class="subtitle">Created At::$note.created_at</p>'

            },
            {
              id: 'Qm11',
              fieldName: 'address',
              fieldType: 'Address',
              uiView: ''
            },
            {
              id: 'Qm12',
              fieldName: 'updated_at',
              fieldType: 'Iso8601',
              uiView: '<p class="subtitle">Updated At::$note.updated_at</p>'
            }
          ],
          examples: [
            {
              id: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
              createdAt: '2020-04-10T11:23:05.928825+00:00',
              address: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
              updatedAt: '2020-04-10T11:23:05.928825+00:00',
              title: 'Title fourth note',
              content: 'Content fourth note'
            },
            {
              id: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
              createdAt: '2020-04-10T11:23:05.770654+00:00',
              address: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
              updatedAt: '2020-04-10T11:23:05.770654+00:00',
              title: 'Title third note',
              content: 'Content third note'
            },
            {
              id: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
              createdAt: '2020-04-10T11:23:05.614081+00:00',
              address: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
              updatedAt: '2020-04-10T11:23:05.614081+00:00',
              title: 'Title second note',
              content: 'Content second note'
            },
            {
              id: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
              createdAt: '2020-04-10T11:23:05.457226+00:00',
              address: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
              updatedAt: '2020-04-10T11:23:05.457226+00:00',
              title: 'Title first note',
              content: 'Content first note'
            }
          ]
        }
      ],
      anchors: []
    },
    {
      id: 'Qmlist_agentsHash',
      type: 'list_agents',
      text: '',
      entryTypes: [],
      anchors: [
        {
          id: '%agent_id',
          links: [
            {
              id: 'QmNoteEntryTypeHash',
              target: 'address()',
              type: 'agent_note_link'
            }
          ]
        }]
    }
  ]