import * as fs from 'fs'
export const items = [
  {
    id: 1,
    name: 'Notes App',
    children: [
      { id: 2, name: 'config.nix', file: 'nix', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/all_apps/config.nix', 'utf8') },
      { id: 2, name: 'default.nix', file: 'nix', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/all_apps/default.nix', 'utf8') },
      {
        id: 5,
        name: 'DNA',
        children: [
          { id: 2, name: 'app.json', file: 'json', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/all_apps/DNA/app.json', 'utf8').replace(new RegExp('AppNamePlaceHolder', 'g'), 'Notes') },
          {
            id: 6,
            name: 'Test',
            children: [
              { id: 8, name: 'index.js', file: 'js', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/all_apps/DNA/test/index.js', 'utf8').replace(new RegExp('ZomePlaceHolder', 'g'), 'notes') },
              { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/all_apps/DNA/test/package.json', 'utf8') },
              {
                id: 7,
                name: 'notes',
                children: [
                  { id: 9, name: 'index.js', file: 'js', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/dna_templates/anchor_link_to_initial/test/notes/index.js', 'utf8') }
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
                name: 'Notes',
                index: 0,
                children: [
                  { id: 12, name: 'zome.json', file: 'json', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/dna_templates/anchor_link_to_initial/zomes/notes/zome.json', 'utf8').replace(new RegExp('ZomePlaceHolder', 'g'), 'notes') },
                  {
                    id: 11,
                    name: 'code',
                    children: [
                      { id: 12, name: 'Cargo.toml', file: 'rs', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/Cargo.toml', 'utf8') },
                      {
                        id: 11,
                        name: 'src',
                        children: [
                          { id: 12, name: 'lib.rs', file: 'rs', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/lib.rs', 'utf8') },
                          {
                            id: 11,
                            name: 'note',
                            children: [
                              { id: 12, name: 'handlers.rs', file: 'rs', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/handlers.rs', 'utf8') },
                              { id: 13, name: 'mod.rs', file: 'rs', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/mod.rs', 'utf8') },
                              { id: 14, name: 'permissions.rs', file: 'rs', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/permissions.rs', 'utf8') },
                              { id: 14, name: 'validation.rs', file: 'rs', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/dna_templates/anchor_link_to_initial/zomes/notes/code/src/note/validation.rs', 'utf8') }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: 11,
                name: 'Notes Workflow',
                index: 1,
                children: [
                  { id: 12, name: 'zome.json', file: 'json' },
                  {
                    id: 11,
                    name: 'code',
                    children: [
                      { id: 12, name: 'Cargo.toml', file: 'rs' },
                      {
                        id: 11,
                        name: 'src',
                        children: [
                          { id: 12, name: 'lib.rs', file: 'rs' },
                          {
                            id: 11,
                            name: 'note',
                            children: [
                              { id: 12, name: 'handlers.rs', file: 'rs' },
                              { id: 13, name: 'mod.rs', file: 'rs' },
                              { id: 14, name: 'permissions.rs', file: 'rs' },
                              { id: 14, name: 'validation.rs', file: 'rs' }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                id: 11,
                name: 'Agent Notes',
                index: 2,
                children: [
                  { id: 12, name: 'Cargo.toml', file: 'rs' },
                  {
                    id: 11,
                    name: 'src',
                    children: [
                      { id: 12, name: 'lib.rs', file: 'rs' },
                      {
                        id: 11,
                        name: 'note',
                        children: [
                          { id: 12, name: 'handlers.rs', file: 'rs' },
                          { id: 13, name: 'mod.rs', file: 'rs' },
                          { id: 14, name: 'permissions.rs', file: 'rs' },
                          { id: 14, name: 'validation.rs', file: 'rs' }
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
      { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/all_apps/package.json', 'utf8') },
      { id: 4, name: 'Procfile', file: 'code', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/all_apps/Procfile', 'utf8') },
      { id: 3, name: 'README.md', file: 'md', code: fs.readFileSync('/Users/philipbeadle/holochain/holochain-ide/templates/all_apps/README.md', 'utf8') },
      {
        id: 15,
        name: 'UI',
        children: [
          { id: 16, name: 'index.html', file: 'html' },
          { id: 17, name: 'package.json', file: 'json' },
          { id: 18, name: 'polymer.json', file: 'json' },
          { id: 19, name: 'webpack.config.js', file: 'js' },
          {
            id: 20,
            name: 'src',
            children: [
              { id: 16, name: 'index.js', file: 'js' },
              {
                id: 17,
                name: 'Notes',
                children: [
                  {
                    id: 16,
                    name: 'graphql',
                    children: [
                      { id: 16, name: 'create.js', file: 'js' },
                      { id: 17, name: 'list.js', file: 'js' },
                      { id: 18, name: 'remove.js', file: 'js' },
                      { id: 19, name: 'resolvers.js', file: 'js' },
                      { id: 19, name: 'schema.js', file: 'js' },
                      { id: 19, name: 'update.js', file: 'js' }
                    ]
                  },
                  { id: 17, name: 'index.js', file: 'js' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
