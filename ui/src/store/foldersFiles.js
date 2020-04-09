export const items = [
  {
    id: 1,
    name: 'Notes App',
    children: [
      { id: 2, name: 'config.nix' },
      { id: 2, name: 'default.nix' },
      {
        id: 5,
        name: 'dna',
        children: [
          { id: 2, name: 'app.json' },
          {
            id: 6,
            name: 'test',
            children: [
              { id: 8, name: 'index.js' },
              { id: 2, name: 'package.json' },
              {
                id: 7,
                name: 'notes',
                children: [
                  { id: 9, name: 'index.js' }
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
                  { id: 12, name: 'zome.json' },
                  {
                    id: 11,
                    name: 'code',
                    children: [
                      { id: 12, name: 'Cargo.toml' },
                      {
                        id: 11,
                        name: 'src',
                        children: [
                          { id: 12, name: 'lib.rs' },
                          {
                            id: 11,
                            name: 'note',
                            children: [
                              { id: 12, name: 'handlers.rs' },
                              { id: 13, name: 'mod.rs' },
                              { id: 14, name: 'permissions.rs' },
                              { id: 14, name: 'validation.rs' }
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
      { id: 2, name: 'package.json' },
      { id: 3, name: 'README.md' },
      { id: 4, name: 'Procfile' },
      {
        id: 15,
        name: 'ui',
        children: [
          { id: 16, name: 'index.html' },
          { id: 17, name: 'package.json' },
          { id: 18, name: 'polymer.json' },
          { id: 19, name: 'webpack.config.js' },
          {
            id: 20,
            name: 'src',
            children: [
              { id: 16, name: 'index.js' },
              {
                id: 17,
                name: 'notes',
                children: [
                  { id: 16, name: 'graphql' },
                  { id: 17, name: 'index.js' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
