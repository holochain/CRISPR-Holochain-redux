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

function replaceMod (modTemplate, fields) {
  const rustFields = []
  const constRustNewFields = []
  fields.forEach(field => {
    rustFields.push(`\n\t${field.fieldName}: ${field.fieldType}`)
    constRustNewFields.push(`\n\t\t\t${field.fieldName}: entry.${field.fieldName}`)
  })
  const modSplit = modTemplate.split('ReplaceFields')
  const modDone = [modSplit[0], ...rustFields, modSplit[1], ...rustFields, modSplit[2], ...constRustNewFields, modSplit[3], ...constRustNewFields, modSplit[4]]
  return modDone.join().replace(new RegExp('_comma,', 'g'), '')
}

function setZomeNameInTemplateFiles (item, templateName, zomeName) {
  zomeName = zomeName.toLowerCase()
  const replaceTemplateName = `${templateName}zome`.toLowerCase()
  if (item.children) {
    item.children.forEach(item => {
      if (item.file) {
        item.code = replacePlaceHolders(item.code, replaceTemplateName, zomeName)
      }
      item.name = replacePlaceHolders(item.name, replaceTemplateName, zomeName)
      setZomeNameInTemplateFiles(item, templateName, zomeName)
    })
  }
}

function setTypeNameAndFieldsInTemplateFiles (item, templateTypeName, entryType) {
  if (entryType.fields === undefined) return
  if (item.children) {
    item.children.forEach(item => {
      if (item.file) {
        item.code = replacePlaceHolders(item.code, templateTypeName, entryType.name)
      }
      item.name = replacePlaceHolders(item.name, templateTypeName, entryType.name)
      setTypeNameAndFieldsInTemplateFiles(item, templateTypeName, entryType)
    })
  }
}

function findItem (items, name) {
  function iter (a) {
    if (a.name.toLowerCase() === name.toLowerCase()) {
      result = a
      return true
    }
    return Array.isArray(a.children) && a.children.some(iter)
  }
  var result
  items.some(iter)
  return result
}

export default {
  namespaced: true,
  state: {
    zomeTemplates: [
      {
        template: 'Origins',
        zome:
        {
          id: 'QmZomeOrigin',
          name: 'Origins',
          libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/lib.rs`, 'utf8'),
          libZome: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/lib_zome.rs`, 'utf8'),
          libDeclarations: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/lib_declarations.rs`, 'utf8'),
          testCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/test/origin/index.js`, 'utf8'),
          items: [],
          anchorTypes: [],
          entryTypes: []
        }
      },
      {
        template: 'Tags',
        zome:
        {
          id: 'QmZomeTags',
          name: 'Tags',
          libCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/DNA/zomes/tags/code/src/lib.rs`, 'utf8'),
          libZome: '',
          items: [],
          anchorTypes: [],
          entryTypes: []
        }
      }
    ],
    entryTypeTemplates: [
      {
        template: 'list_anchor_types_1',
        entryType:
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
      }
    ],
    itemsTemplates: [
      {
        template: 'template1',
        items: [
          {
            name: 'Origins',
            children: [
              { name: 'config.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/config.nix`, 'utf8') },
              { name: 'default.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/default.nix`, 'utf8') },
              {
                name: 'DNA',
                children: [
                  { name: '.hcignore', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/.hcignore`, 'utf8') },
                  { name: 'app.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/app.json`, 'utf8') },
                  {
                    name: 'Test',
                    children: [
                      { name: 'index.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/test/index.js`, 'utf8') },
                      { name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/test/package.json`, 'utf8') },
                      {
                        name: 'Entry Types',
                        children: []
                      }
                    ]
                  },
                  {
                    name: 'Zomes',
                    children: [
                      {
                        name: 'Origins',
                        index: 0,
                        children: [
                          { name: 'zome.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/zome.json`, 'utf8') },
                          {
                            name: 'code',
                            children: [
                              { name: '.hcbuild', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/.hcbuild`, 'utf8') },
                              { name: 'Cargo.toml', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/Cargo.toml`, 'utf8') },
                              {
                                name: 'src',
                                children: [
                                  { name: 'lib.rs', file: 'rs', code: '' }
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
              { name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/package.json`, 'utf8') },
              { name: 'Procfile', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/Procfile`, 'utf8') },
              { name: 'README.md', file: 'md', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/README.md`, 'utf8') }
            ]
          }
        ]
      },
      {
        template: 'tags',
        items: [
          {
            name: 'Tags',
            children: [
              { name: 'config.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/config.nix`, 'utf8') },
              { name: 'default.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/default.nix`, 'utf8') },
              {
                name: 'DNA',
                children: [
                  { name: '.hcignore', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/DNA/.hcignore`, 'utf8') },
                  { name: 'app.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/DNA/app.json`, 'utf8') },
                  {
                    name: 'Zomes',
                    children: [
                      {
                        name: 'Tags',
                        index: 0,
                        children: [
                          { name: 'zome.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/DNA/zomes/tags/zome.json`, 'utf8') },
                          {
                            name: 'code',
                            children: [
                              { name: '.hcbuild', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/DNA/zomes/tags/code/.hcbuild`, 'utf8') },
                              { name: 'Cargo.toml', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/DNA/zomes/tags/code/Cargo.toml`, 'utf8') },
                              {
                                name: 'src',
                                children: [
                                  { name: 'lib.rs', file: 'rs', code: '' }
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
              { name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/package.json`, 'utf8') },
              { name: 'Procfile', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/Procfile`, 'utf8') },
              { name: 'README.md', file: 'md', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/Tags/README.md`, 'utf8') }
            ]
          }
        ]
      }
    ],
    profileSpecTemplates: [
      {
        template: 'identify',
        profileSpec:
        {
          id: 'QmOriginEntryTypeHash',
          name: 'origin',
          libZomeCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/profile/lib_zome_profile.rs`, 'utf8'),
          modCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/profile/mod_profile.rs`, 'utf8'),
          handlersCode: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/profile/handlers_profile.rs`, 'utf8'),
          fields: [
            {
              fields_field_id: 'QM234566777887',
              fieldName: 'agent_id',
              fieldType: 'String',
              reason: 'To associate the right person',
              contract: 'Store',
              required: true
            },
            {
              fields_field_id: 'QM234566777887',
              fieldName: 'avatar',
              fieldType: 'String',
              reason: 'Shows on each Freckle you write',
              contract: 'Store',
              required: true
            },
            {
              fields_field_id: 'QM234566777887',
              fieldName: 'handle',
              fieldType: 'String',
              reason: 'Shows on each Freckle you write',
              contract: 'Store',
              required: true
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
            }
          ]
        }
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
    zomeByBaseIdFromTemplate: (state) => (project) => {
      const zome = JSON.parse(project.zome)
      const zomeTemplate = state.zomeTemplates.find(t => t.template === zome.template)
      const zomeItems = state.itemsTemplates.find(t => t.template === zome.itemsTemplatesName)
      const template = JSON.parse(JSON.stringify(zomeTemplate.zome))
      const itemsTemplate = JSON.parse(JSON.stringify(zomeItems.items))
      template.name = zome.name
      template.items = itemsTemplate
      template.items[0].name = project.name
      template.anchorTypes = zome.anchorTypes
      template.libCode = replacePlaceHolders(template.libCode, zome.template.toLowerCase(), zome.name.toLowerCase())
      const testItem = findItem(template.items, 'Entry Types')
      const zomesItem = findItem(template.items, 'Zomes')
      const zomesItemSrc = findItem(zomesItem.children, 'src')
      zomesItem.children[0].name = zome.name
      setZomeNameInTemplateFiles(template.items[0], zome.template, zome.name)
      zome.entryTypes.forEach((entryType, index) => {
        let entryTypeTemplate = state.entryTypeTemplates.find(t => t.template === entryType.template)
        entryTypeTemplate = JSON.parse(JSON.stringify(entryTypeTemplate.entryType))
        entryTypeTemplate.testCode = replacePlaceHolders(template.testCode, zome.templateTypeName, entryType.name.toLowerCase())
        testItem.children.push(
          {
            name: entryType.name,
            children: [
              { name: 'index.js', file: 'js', code: '' }
            ]
          }
        )
        zomesItemSrc.children.push(
          {
            name: entryType.name,
            children: [
              { name: 'handlers.rs', file: 'rs', code: '' },
              { name: 'mod.rs', file: 'rs', code: replaceMod(fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/mod.rs`, 'utf8'), entryType.fields) },
              { name: 'entry_permissions.rs', file: 'rs', code: '' },
              { name: 'link_permissions.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/link_permissions.rs`, 'utf8') },
              { name: 'validation.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/zomes/origins/code/src/origin/validation.rs`, 'utf8') }
            ]
          }
        )
        template.libCode += replacePlaceHolders(template.libDeclarations, entryTypeTemplate.name, entryType.name)
        setTypeNameAndFieldsInTemplateFiles(template.items[0], zome.templateTypeName, entryType)
        entryTypeTemplate.id = entryType.id
        entryTypeTemplate.name = entryType.name
        entryTypeTemplate.fields = entryType.fields
        template.entryTypes.push(entryTypeTemplate)
      })
      let profileZomeCode = ''
      if (zome.profileSpec) {
        let profileSpecTemplate = state.profileSpecTemplates.find(t => t.template === zome.profileSpec.template)
        profileSpecTemplate = JSON.parse(JSON.stringify(profileSpecTemplate.profileSpec))
        template.profileSpec = profileSpecTemplate
        template.libCode += replacePlaceHolders(template.libDeclarations, template.profileSpec.name, 'profile')
        profileZomeCode = profileSpecTemplate.libZomeCode
        zomesItemSrc.children.push(
          {
            name: 'profile',
            children: [
              { name: 'handlers.rs', file: 'rs', code: fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/profile/handlers_profile.rs`, 'utf8') },
              { name: 'mod.rs', file: 'rs', code: replaceMod(fs.readFileSync(`${developer.folder}/templates/dna_templates/origins/DNA/profile/mod_profile.rs`, 'utf8'), profileSpecTemplate.fields) }
            ]
          }
        )
      }
      template.libCode += template.libZome
      template.libCode += profileZomeCode
      return template
    }
  }
}
