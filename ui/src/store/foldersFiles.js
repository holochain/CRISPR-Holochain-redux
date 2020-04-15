export const items = [
  {
    id: 1,
    name: 'Notes App',
    children: [
      { id: 2, name: 'config.nix', file: 'nix' },
      { id: 2, name: 'default.nix', file: 'nix' },
      {
        id: 5,
        name: 'dna',
        children: [
          { id: 2, name: 'app.json', file: 'json' },
          {
            id: 6,
            name: 'test',
            children: [
              { id: 8, name: 'index.js', file: 'js' },
              { id: 2, name: 'package.json', file: 'json' },
              {
                id: 7,
                name: 'notes',
                children: [
                  { id: 9, name: 'index.js', file: 'js' }
                ]
              }
            ]
          },
          {
            id: 10,
            name: 'zomes',
            children: [
              {
                id: 11,
                name: 'notes',
                children: [
                  { id: 12, name: 'model', file: 'model', index: 0 },
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
                name: 'notes2',
                children: [
                  { id: 12, name: 'model', file: 'model', index: 1 },
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
                name: 'agent_notes',
                children: [
                  { id: 12, name: 'model', file: 'model', index: 2 },
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
              }
            ]
          }
        ]
      },
      { id: 2, name: 'package.json', file: 'json' },
      { id: 3, name: 'README.md', file: 'md' },
      { id: 4, name: 'Procfile', file: 'code' },
      {
        id: 15,
        name: 'ui',
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
                name: 'notes',
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
