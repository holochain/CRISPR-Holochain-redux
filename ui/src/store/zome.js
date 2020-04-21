/* eslint no-template-curly-in-string: "off" */
import * as fs from 'fs'
export const developer = {
  folder: '/Users/philipbeadle/holochain/holochain-ide'
}
export const zomes = [
  {
    id: 'QmZome1hash',
    name: 'Notes',
    items: [
      { id: 12, name: 'zome.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/zome.json`, 'utf8').replace(new RegExp('ZomePlaceHolder', 'g'), 'notes') },
      {
        id: 11,
        name: 'code',
        children: [
          { id: 12, name: '.hcbuild', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/.hcbuild`, 'utf8') },
          { id: 12, name: 'Cargo.toml', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/Cargo.toml`, 'utf8') },
          {
            id: 11,
            name: 'src',
            children: [
              { id: 12, name: 'lib.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/lib.rs`, 'utf8') },
              {
                id: 11,
                name: 'note',
                children: [
                  { id: 12, name: 'handlers.rs', file: 'rs', code: '' },
                  { id: 13, name: 'mod.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/mod.rs`, 'utf8') },
                  { id: 14, name: 'entry_permissions.rs', file: 'rs', code: '' },
                  { id: 14, name: 'link_permissions.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/link_permissions.rs`, 'utf8') },
                  { id: 14, name: 'validation.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/validation.rs`, 'utf8') }
                ]
              }
            ]
          }
        ]
      }
    ],
    anchorTypes: [
      {
        id: 'Qmlist_notesHash1',
        type: 'list_notes',
        text: '',
        tag: ' ',
        context: 'permanent',
        libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/lib.rs`, 'utf8'),
        entryTypes: [
          {
            id: 'QmNoteEntryTypeHash1',
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
            functions: [
              {
                name: 'declarations',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/lib_entry_def.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/handlers.rs`, 'utf8'),
                permissionsCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/entry_permissions.rs`, 'utf8')
              },
              {
                name: 'create',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/lib_create.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/create.rs`, 'utf8'),
                explanation: '',
                permission: 'anyone',
                permissionsCode: fs.readFileSync(`${developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_create/anyone.rs`, 'utf8'),
                permissionsExplanation: 'Docs go here'
              },
              {
                name: 'read',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/lib_read.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/read.rs`, 'utf8'),
                explanation: 'Docs go here'
              },
              {
                name: 'update',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/lib_update.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/update.rs`, 'utf8'),
                explanation: 'Docs go here',
                permission: 'author-only',
                permissionsCode: fs.readFileSync(`${developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_update/author-only.rs`, 'utf8'),
                permissionsExplanation: 'Docs go here'
              },
              {
                name: 'delete',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/lib_delete.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/delete.rs`, 'utf8'),
                explanation: 'Docs go here',
                permission: 'author-only',
                permissionsCode: fs.readFileSync(`${developer.folder}/templates/permissions_rule_templates/validate_permissions_entry_delete/author-only.rs`, 'utf8'),
                permissionsExplanation: 'Docs go here'
              },
              {
                name: 'list',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/lib_list.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/list.rs`, 'utf8'),
                explanation: 'Docs go here'
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
      }
    ],
    entryTypes: [],
    profileSpecs: []
  }
]
