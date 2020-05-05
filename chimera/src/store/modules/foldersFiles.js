import * as fs from 'fs'

// function changeFileName (item, zomeName) {
//   if (item.children) {
//     item.children.forEach(item => {
//       item.name = item.name.replace(new RegExp('Notes', 'g'), zomeName)
//       changeFileName(item, zomeName)
//     })
//   }
// }

export const developer = {
  folder: '/Users/philipbeadle/holochain/CRISPR'
}
export default {
  namespaced: true,
  state: {
    items: [
      {
        id: 1,
        name: 'Notes',
        base: 'Qmmorebighashes333',
        children: [
          { id: 2, name: 'config.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/config.nix`, 'utf8') },
          { id: 2, name: 'default.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/default.nix`, 'utf8') },
          {
            id: 5,
            name: 'DNA',
            children: [
              { id: 2, name: '.hcignore', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/.hcignore`, 'utf8') },
              { id: 2, name: 'app.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/app.json`, 'utf8') },
              {
                id: 6,
                name: 'Test',
                children: [
                  { id: 8, name: 'config-copy.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/test/config-copy.js`, 'utf8') },
                  { id: 8, name: 'config-generate.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/test/config-generate.js`, 'utf8') },
                  { id: 8, name: 'index.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/test/index.js`, 'utf8') },
                  { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/DNA/test/package.json`, 'utf8') },
                  {
                    id: 4445,
                    name: 'Entry Types',
                    children: []
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
                    children: []
                  }
                ]
              }
            ]
          },
          { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/package.json`, 'utf8') },
          { id: 4, name: 'Procfile', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/Procfile`, 'utf8') },
          { id: 3, name: 'README.md', file: 'md', code: fs.readFileSync(`${developer.folder}/templates/parts/notes/README.md`, 'utf8') }
        ]
      },
      {
        id: 1,
        name: 'Tasks',
        base: 'QmmorehashyTasks',
        children: [
          { id: 2, name: 'config.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/config.nix`, 'utf8') },
          { id: 2, name: 'default.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/default.nix`, 'utf8') },
          {
            id: 5,
            name: 'DNA',
            children: [
              { id: 2, name: '.hcignore', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/.hcignore`, 'utf8') },
              { id: 2, name: 'app.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/app.json`, 'utf8') },
              {
                id: 6,
                name: 'Test',
                children: [
                  { id: 8, name: 'config-copy.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/test/config-copy.js`, 'utf8') },
                  { id: 8, name: 'config-generate.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/test/config-generate.js`, 'utf8') },
                  { id: 8, name: 'index.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/test/index.js`, 'utf8') },
                  { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/DNA/test/package.json`, 'utf8') },
                  {
                    id: 4445,
                    name: 'Entry Types',
                    children: []
                  }
                ]
              },
              {
                id: 10,
                name: 'Zomes',
                children: [
                  {
                    id: 11,
                    name: 'Tasks',
                    index: 0,
                    children: []
                  }
                ]
              }
            ]
          },
          { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/package.json`, 'utf8') },
          { id: 4, name: 'Procfile', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/Procfile`, 'utf8') },
          { id: 3, name: 'README.md', file: 'md', code: fs.readFileSync(`${developer.folder}/templates/parts/tasks/README.md`, 'utf8') }
        ]
      },
      {
        id: 1,
        name: 'Kanban',
        base: 'QmHashyKanban',
        children: [
          { id: 2, name: 'config.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/config.nix`, 'utf8') },
          { id: 2, name: 'default.nix', file: 'nix', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/default.nix`, 'utf8') },
          {
            id: 5,
            name: 'DNA',
            children: [
              { id: 2, name: '.hcignore', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/DNA/.hcignore`, 'utf8') },
              { id: 2, name: 'app.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/DNA/app.json`, 'utf8') },
              {
                id: 6,
                name: 'Test',
                children: [
                  { id: 8, name: 'config-copy.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/DNA/test/config-copy.js`, 'utf8') },
                  { id: 8, name: 'config-generate.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/DNA/test/config-generate.js`, 'utf8') },
                  { id: 8, name: 'index.js', file: 'js', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/DNA/test/index.js`, 'utf8') },
                  { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/DNA/test/package.json`, 'utf8') },
                  {
                    id: 4445,
                    name: 'Entry Types',
                    children: []
                  }
                ]
              },
              {
                id: 10,
                name: 'Zomes',
                children: [
                  {
                    id: 11,
                    name: 'Columns',
                    index: 0,
                    children: []
                  }
                ]
              }
            ]
          },
          { id: 2, name: 'package.json', file: 'json', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/package.json`, 'utf8') },
          { id: 4, name: 'Procfile', file: 'code', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/Procfile`, 'utf8') },
          { id: 3, name: 'README.md', file: 'md', code: fs.readFileSync(`${developer.folder}/templates/parts/kanban/README.md`, 'utf8') }
        ]
      }
    ]
  },
  getters: {
    items: (state) => (base) => {
      console.log('base', base, state.items)
      return state.items.filter(i => i.name === base)
    }
  }
}
