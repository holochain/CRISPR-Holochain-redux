import * as fs from 'fs'
export const developer = {
  folder: '/Users/philipbeadle/holochain/CRISPR'
}
export default {
  namespaced: true,
  state: {
    zomes: [
      {
        id: 'QmZome1hash',
        name: 'Notes',
        base: 'Qmmorebighashes333',
        template: 'notes',
        items: [
          { id: 12, name: 'zome.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/zome.json`, 'utf8').replace(new RegExp('ZomePlaceHolder', 'g'), 'notes') },
          {
            id: 11,
            name: 'code',
            children: [
              { id: 12, name: '.hcbuild', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/.hcbuild`, 'utf8') },
              { id: 12, name: 'Cargo.toml', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/Cargo.toml`, 'utf8') },
              {
                id: 11,
                name: 'src',
                children: [
                  { id: 12, name: 'lib.rs', file: 'rs', code: '' },
                  {
                    id: 11,
                    name: 'note',
                    children: [
                      { id: 12, name: 'handlers.rs', file: 'rs', code: '' },
                      { id: 13, name: 'mod.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/mod.rs`, 'utf8') },
                      { id: 14, name: 'entry_permissions.rs', file: 'rs', code: '' },
                      { id: 14, name: 'link_permissions.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/link_permissions.rs`, 'utf8') },
                      { id: 14, name: 'validation.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/validation.rs`, 'utf8') }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        testItems: [
          {
            id: 7,
            name: 'Note',
            children: [
              { id: 9, name: 'index.js', file: 'js', code: '' }
            ]
          }
        ],
        anchorTypes: [
          {
            id: 'Qmlist_Notes1',
            type: 'list_notes',
            text: '',
            tag: ' ',
            context: 'permanent',
            libCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/lib.rs`, 'utf8'),
            testCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/test/note/index.js`, 'utf8'),
            entryTypes: [
              {
                id: 'QmNoteEntryTypeHash1',
                name: 'Note',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String'
                  },
                  {
                    id: 'QM234566777887',
                    fieldName: 'content',
                    fieldType: 'String'
                  }
                ],
                metaFields: [
                  {
                    id: 'Qm111',
                    fieldName: 'id',
                    fieldType: 'Address'
                  },
                  {
                    id: 'Qm126',
                    fieldName: 'created_at',
                    fieldType: 'Iso8601'
                  },
                  {
                    id: 'Qm126',
                    fieldName: 'created_by',
                    fieldType: 'Address'
                  },
                  {
                    id: 'Qm116',
                    fieldName: 'address',
                    fieldType: 'Address'
                  },
                  {
                    id: 'Qm126',
                    fieldName: 'updated_at',
                    fieldType: 'Iso8601'
                  },
                  {
                    id: 'Qm126',
                    fieldName: 'updated_by',
                    fieldType: 'Address'
                  }
                ],
                functions: [
                  {
                    name: 'declarations',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/lib_entry_def.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/handlers.rs`, 'utf8'),
                    permissionsCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/entry_permissions.rs`, 'utf8')
                  },
                  {
                    name: 'create',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/lib_create.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/create.rs`, 'utf8'),
                    explanation: '',
                    permission: 'anyone',
                    permissionsCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/permissions_rule_templates/validate_permissions_entry_create/anyone.rs`, 'utf8'),
                    permissionsExplanation: 'Docs go here'
                  },
                  {
                    name: 'read',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/lib_read.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/read.rs`, 'utf8'),
                    explanation: 'Docs go here'
                  },
                  {
                    name: 'update',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/lib_update.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/update.rs`, 'utf8'),
                    explanation: 'Docs go here',
                    permission: 'author-only',
                    permissionsCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/permissions_rule_templates/validate_permissions_entry_update/author-only.rs`, 'utf8'),
                    permissionsExplanation: 'Docs go here',
                    testCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/test/note/author-only-update-note.js`, 'utf8')
                  },
                  {
                    name: 'delete',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/lib_delete.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/delete.rs`, 'utf8'),
                    explanation: 'Docs go here',
                    permission: 'anyone',
                    permissionsCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/permissions_rule_templates/validate_permissions_entry_delete/remove.rs`, 'utf8'),
                    permissionsExplanation: 'Docs go here',
                    testCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/test/note/anyone-delete-note.js`, 'utf8')
                  },
                  {
                    name: 'list',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/lib_list.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/zomes/notes/code/src/note/list.rs`, 'utf8'),
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
            anchors: [
              {
                id: 'Qmlist_QmhashNote1',
                type: 'list_notes',
                text: 'QmhashNote1Id',
                links: [
                  {
                    entityId: 'QmNoteEntryTypeHash1',
                    type: 'note_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ]
              },
              {
                id: 'Qmlist_QmhashNote2',
                type: 'list_notes',
                text: 'QmhashNote2Id',
                links: [
                  {
                    entityId: 'QmNoteEntryTypeHash1',
                    type: 'note_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ]
              },
              {
                id: 'Qmlist_QmhashNote3',
                type: 'list_notes',
                text: 'QmhashNote3Id',
                links: [
                  {
                    entityId: 'QmNoteEntryTypeHash1',
                    type: 'note_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ]
              }
            ]
          }
        ],
        entryTypes: [],
        profileSpecs: []
      },
      {
        id: 'QmZome2hashTasks',
        name: 'Tasks',
        base: 'QmmorehashyTasks',
        template: 'tasks',
        items: [
          { id: 12, name: 'zome.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/zome.json`, 'utf8').replace(new RegExp('ZomePlaceHolder', 'g'), 'notes') },
          {
            id: 11,
            name: 'code',
            children: [
              { id: 12, name: '.hcbuild', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/.hcbuild`, 'utf8') },
              { id: 12, name: 'Cargo.toml', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/Cargo.toml`, 'utf8') },
              {
                id: 11,
                name: 'src',
                children: [
                  { id: 12, name: 'lib.rs', file: 'rs', code: '' },
                  {
                    id: 11,
                    name: 'task',
                    children: [
                      { id: 12, name: 'handlers.rs', file: 'rs', code: '' },
                      { id: 13, name: 'mod.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/mod.rs`, 'utf8') },
                      { id: 14, name: 'entry_permissions.rs', file: 'rs', code: '' },
                      { id: 14, name: 'link_permissions.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/link_permissions.rs`, 'utf8') },
                      { id: 14, name: 'validation.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/validation.rs`, 'utf8') }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        testItems: [
          {
            id: 7,
            name: 'Task',
            children: [
              { id: 9, name: 'index.js', file: 'js', code: '' }
            ]
          }
        ],
        anchorTypes: [
          {
            id: 'Qmlist_tasksHash1',
            type: 'list_tasks',
            text: '',
            tag: ' ',
            context: 'permanent',
            libCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/lib.rs`, 'utf8'),
            testCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/test/task/index.js`, 'utf8'),
            entryTypes: [
              {
                id: 'QmNoteTaskEntryTypeAddress',
                name: 'Task',
                fields: [
                  {
                    id: 'Qm1333',
                    fieldName: 'title',
                    fieldType: 'String'
                  },
                  {
                    id: 'QM234566777887',
                    fieldName: 'done',
                    fieldType: 'Bool'
                  }
                ],
                metaFields: [
                  {
                    id: 'Qm111',
                    fieldName: 'id',
                    fieldType: 'Address'
                  },
                  {
                    id: 'Qm126',
                    fieldName: 'created_at',
                    fieldType: 'Iso8601'
                  },
                  {
                    id: 'Qm126',
                    fieldName: 'created_by',
                    fieldType: 'Address'
                  },
                  {
                    id: 'Qm116',
                    fieldName: 'address',
                    fieldType: 'Address'
                  },
                  {
                    id: 'Qm126',
                    fieldName: 'updated_at',
                    fieldType: 'Iso8601'
                  },
                  {
                    id: 'Qm126',
                    fieldName: 'updated_by',
                    fieldType: 'Address'
                  }
                ],
                functions: [
                  {
                    name: 'declarations',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/lib_entry_def.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/handlers.rs`, 'utf8'),
                    permissionsCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/entry_permissions.rs`, 'utf8')
                  },
                  {
                    name: 'create',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/lib_create.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/create.rs`, 'utf8'),
                    explanation: '',
                    permission: 'anyone',
                    permissionsCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/permissions_rule_templates/validate_permissions_entry_create/anyone.rs`, 'utf8'),
                    permissionsExplanation: 'Docs go here'
                  },
                  {
                    name: 'read',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/lib_read.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/read.rs`, 'utf8'),
                    explanation: 'Docs go here'
                  },
                  {
                    name: 'update',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/lib_update.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/update.rs`, 'utf8'),
                    explanation: 'Docs go here',
                    permission: 'author-only',
                    permissionsCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/permissions_rule_templates/validate_permissions_entry_update/author-only.rs`, 'utf8'),
                    permissionsExplanation: 'Docs go here',
                    testCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/test/task/author-only-update-task.js`, 'utf8')
                  },
                  {
                    name: 'delete',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/lib_delete.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/delete.rs`, 'utf8'),
                    explanation: 'Docs go here',
                    permission: 'anyone',
                    permissionsCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/permissions_rule_templates/validate_permissions_entry_delete/remove.rs`, 'utf8'),
                    permissionsExplanation: 'Docs go here',
                    testCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/test/task/anyone-delete-task.js`, 'utf8')
                  },
                  {
                    name: 'list',
                    libCode: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/lib_list.rs`, 'utf8'),
                    code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/zomes/tasks/code/src/task/list.rs`, 'utf8'),
                    explanation: 'Docs go here'
                  }
                ],
                examples: [
                  {
                    id: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
                    createdAt: '2020-04-10T11:23:05.928825+00:00',
                    address: 'QmUDVBPMnRrYq6VKZ9d1BA21gEbQCCua2NQCTd9jDwec3n',
                    updatedAt: '2020-04-10T11:23:05.928825+00:00',
                    title: 'Title fourth task',
                    content: 'Content fourth task'
                  },
                  {
                    id: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
                    createdAt: '2020-04-10T11:23:05.770654+00:00',
                    address: 'Qmc8abkphjkUoNv1TNktUh5sS6tQfhB1ugXQ7Xoct7Da4F',
                    updatedAt: '2020-04-10T11:23:05.770654+00:00',
                    title: 'Title third task',
                    content: 'Content third task'
                  },
                  {
                    id: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
                    createdAt: '2020-04-10T11:23:05.614081+00:00',
                    address: 'QmTWD3JiAXnTH2oTrgEz82ESxAypC7ShDenLHhnqXbDZYp',
                    updatedAt: '2020-04-10T11:23:05.614081+00:00',
                    title: 'Title second task',
                    content: 'Content second task'
                  },
                  {
                    id: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
                    createdAt: '2020-04-10T11:23:05.457226+00:00',
                    address: 'QmUKXcXBcXzt82atskYQxN7tykt7mpUX5knqzfFKn3RLZn',
                    updatedAt: '2020-04-10T11:23:05.457226+00:00',
                    title: 'Title first task',
                    content: 'Content first task'
                  }
                ]
              }
            ],
            anchors: [
              {
                id: 'Qmlist_QmhashTodo2',
                type: 'list_tasks',
                text: 'QmhashEntryId',
                links: [
                  {
                    entityId: 'QmNoteTaskEntryTypeAddress',
                    type: 'task_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ]
              },
              {
                id: 'Qmlist_QmhashProgress2',
                type: 'list_tasks',
                text: 'QmhashEntry2Id',
                links: [
                  {
                    entityId: 'QmNoteTaskEntryTypeAddress',
                    type: 'task_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ]
              },
              {
                id: 'Qmlist_QmhashDone2',
                type: 'list_tasks',
                text: 'QmhashEntry3Id',
                links: [
                  {
                    entityId: 'QmNoteTaskEntryTypeAddress',
                    type: 'task_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ]
              }
            ]
          }
        ],
        entryTypes: [],
        profileSpecs: []
      }
    ]
  },
  getters: {
    allZomes: state => {
      return state.zomes
    },
    zomeByBaseId: (state) => (base) => {
      return state.zomes.find(z => z.base === base)
    }
  }
}
