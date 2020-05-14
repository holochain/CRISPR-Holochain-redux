import * as fs from 'fs'
export const developer = {
  folder: '/Users/philipbeadle/holochain/CRISPR'
}

function replacePlaceHolders (content, placeHolder, replacement) {
  const replacementC = replacement.charAt(0).toUpperCase() + replacement.substring(1)
  const replacementAllC = replacement.toUpperCase()
  const placeHolderC = placeHolder.charAt(0).toUpperCase() + placeHolder.substring(1)
  const placeHolderAllC = placeHolder.toUpperCase()
  return content.replace(new RegExp(placeHolder, 'g'), replacement).replace(new RegExp(placeHolderAllC, 'g'), replacementAllC).replace(new RegExp(placeHolderC, 'g'), replacementC)
}

function replaceMod (modTemplate, entryType) {
  const rustFields = []
  const constRustNewFields = []
  entryType.fields.forEach(field => {
    rustFields.push(`\n\t${field.fieldName}: ${field.fieldType}`)
    constRustNewFields.push(`\n\t\t\t${field.fieldName}: entry.${field.fieldName}`)
  })
  const modSplit = modTemplate.split('ReplaceFields')
  const modDone = [modSplit[0], ...rustFields, modSplit[1], ...rustFields, modSplit[2], ...constRustNewFields, modSplit[3], ...constRustNewFields, modSplit[4]]
  return modDone.join().replace(new RegExp('_comma,', 'g'), '')
}

function setTypeNameAndFieldsInTemplateFiles (item, templateTypeName, entryType) {
  if (entryType.fields === undefined) return
  if (item.children) {
    item.children.forEach(item => {
      if (item.file) {
        item.code = replacePlaceHolders(item.code, templateTypeName, entryType.name)
        if (item.name === 'mod.rs') {
          item.code = replaceMod(item.code, entryType)
        } else {
          item.code = replacePlaceHolders(item.code, templateTypeName, entryType.name)
        }
      }
      item.name = replacePlaceHolders(item.name, templateTypeName, entryType.name)
      setTypeNameAndFieldsInTemplateFiles(item, templateTypeName, entryType)
    })
  }
}
export default {
  namespaced: true,
  state: {
    zomeTemplates: [
      {
        id: 'QmZomeOrigin',
        name: 'Origins',
        libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/lib.rs`, 'utf8'),
        testCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/test/origin/index.js`, 'utf8'),
        items: [
          {
            id: 1,
            name: 'Origins',
            children: [
              { id: 2, name: 'config.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/config.nix`, 'utf8') },
              { id: 2, name: 'default.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/default.nix`, 'utf8') },
              {
                id: 5,
                name: 'DNA',
                children: [
                  { id: 2, name: '.hcignore', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/.hcignore`, 'utf8') },
                  { id: 2, name: 'app.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/app.json`, 'utf8') },
                  {
                    id: 6,
                    name: 'Test',
                    children: [
                      { id: 8, name: 'index.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/test/index.js`, 'utf8') },
                      { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/test/package.json`, 'utf8') },
                      {
                        id: 4445,
                        name: 'Entry Types',
                        children: [
                          {
                            id: 7,
                            name: 'Origin',
                            children: [
                              { id: 9, name: 'index.js', file: 'js', code: '' }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: 10,
                    name: 'Zomes',
                    children: [
                      {
                        id: 11,
                        name: 'Origins',
                        index: 0,
                        children: [
                          { id: 12, name: 'zome.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/zome.json`, 'utf8').replace(new RegExp('ZomePlaceHolder', 'g'), 'origins') },
                          {
                            id: 11,
                            name: 'code',
                            children: [
                              { id: 12, name: '.hcbuild', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/.hcbuild`, 'utf8') },
                              { id: 12, name: 'Cargo.toml', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/Cargo.toml`, 'utf8') },
                              {
                                id: 11,
                                name: 'src',
                                children: [
                                  { id: 12, name: 'lib.rs', file: 'rs', code: '' },
                                  {
                                    id: 11,
                                    name: 'origin',
                                    children: [
                                      { id: 12, name: 'handlers.rs', file: 'rs', code: '' },
                                      { id: 13, name: 'mod.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/mod.rs`, 'utf8') },
                                      { id: 14, name: 'entry_permissions.rs', file: 'rs', code: '' },
                                      { id: 14, name: 'link_permissions.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/link_permissions.rs`, 'utf8') },
                                      { id: 14, name: 'validation.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/validation.rs`, 'utf8') }
                                    ]
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
              { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/package.json`, 'utf8') },
              { id: 4, name: 'Procfile', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/Procfile`, 'utf8') },
              { id: 3, name: 'README.md', file: 'md', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/README.md`, 'utf8') }
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
                tag: ' ',
                context: 'exclusive'
              }
            ],
            anchors: [
              {
                id: 'Qmlist_Qmhashorigin1',
                type: 'list_origins',
                text: 'Qmhashorigin1Id',
                links: [
                  {
                    entityId: 'QmOriginEntryTypeHash',
                    type: 'origin_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ]
              },
              {
                id: 'Qmlist_Qmhashorigin2',
                type: 'list_origins',
                text: 'Qmhashorigin2Id',
                links: [
                  {
                    entityId: 'QmOriginEntryTypeHash',
                    type: 'origin_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ]
              },
              {
                id: 'Qmlist_Qmhashorigin3',
                type: 'list_origins',
                text: 'Qmhashorigin3Id',
                links: [
                  {
                    entityId: 'QmOriginEntryTypeHash',
                    type: 'origin_link',
                    tag: ' ',
                    context: 'exclusive'
                  }
                ]
              }
            ]
          }
        ],
        entryTypes: [
          {
            id: 'QmOriginEntryTypeHash',
            name: 'origin',
            fields: [],
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
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/lib_entry_def.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/handlers.rs`, 'utf8'),
                permissionsCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/entry_permissions.rs`, 'utf8')
              },
              {
                name: 'create',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/lib_create.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/create.rs`, 'utf8'),
                explanation: '',
                permission: 'anyone',
                permissionsCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/permissions_rule_templates/validate_permissions_entry_create/anyone.rs`, 'utf8'),
                permissionsExplanation: 'Docs go here'
              },
              {
                name: 'read',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/lib_read.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/read.rs`, 'utf8'),
                explanation: 'Docs go here'
              },
              {
                name: 'update',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/lib_update.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/update.rs`, 'utf8'),
                explanation: 'Docs go here',
                permission: 'anyone',
                permissionsCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/permissions_rule_templates/validate_permissions_entry_update/anyone.rs`, 'utf8'),
                permissionsExplanation: 'Docs go here',
                testCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/test/origin/anyone-update-origin.js`, 'utf8')
              },
              {
                name: 'delete',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/lib_delete.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/delete.rs`, 'utf8'),
                explanation: 'Docs go here',
                permission: 'anyone',
                permissionsCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/permissions_rule_templates/validate_permissions_entry_delete/remove.rs`, 'utf8'),
                permissionsExplanation: 'Docs go here',
                testCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/test/origin/anyone-delete-origin.js`, 'utf8')
              },
              {
                name: 'list',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/lib_list.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/list.rs`, 'utf8'),
                explanation: 'Docs go here'
              },
              {
                name: 'rebase',
                libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/lib_rebase.rs`, 'utf8'),
                code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/rebase.rs`, 'utf8'),
                explanation: 'Docs go here'
              }
            ]
          }
        ]
      }
    ]
  },
  mutations: {
    updateZome (state, payload) {
      const zome = state.zomes.find(z => z.base === payload.base)
      const updatedEntryTypes = zome.entryTypes.map(e => {
        if (e.id === payload.entryType.id) {
          return Object.assign({}, e, payload.entryType)
        }
        return e
      })
      state.zomes.find(z => z.base === payload.base).entryTypes = updatedEntryTypes
    }
  },
  actions: {
    updateEntryType: ({ state, commit, rootState }, payload) => {
      // update Holochain here
      commit('updateZome', { base: payload.base, entryType: payload.entryType })
    }
  },
  getters: {
    allZomes: state => {
      return state.zomes
    },
    zomeByBaseId: (state) => (base) => {
      return state.zomes.find(z => z.base === base)
    },
    zomeByBaseIdFromTemplate: (state) => (zome) => {
      const zomeTemplate = state.zomeTemplates.find(t => t.name === zome.template)
      const template = JSON.parse(JSON.stringify(zomeTemplate))
      template.name = zome.name
      template.libCode = replacePlaceHolders(template.libCode, zome.template.toLowerCase(), zome.name.toLowerCase())
      template.items[0].name = zome.name
      template.entryTypes.forEach((e, index) => {
        const entryType = zome.entryTypes[index]
        template.testCode = replacePlaceHolders(template.testCode, zome.templateTypeName, entryType.name.toLowerCase())
        setTypeNameAndFieldsInTemplateFiles(template.items[0], zome.templateTypeName, entryType)
        e.id = entryType.id
        e.name = entryType.name
        e.fields = entryType.fields
      })
      template.anchorTypes = zome.anchorTypes
      return template
    }
  }
}
