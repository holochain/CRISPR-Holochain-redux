// import { profiles } from './profiles.js'
// import { personas } from './personas.js'
// import { fieldNames } from './fieldNames.js'
// import { items } from './foldersFiles.js'

export const projects = [
  {
    id: 'QmHolochainIDE',
    name: 'Holochain-IDE',
    folder: '/Users/philipbeadle/holochain/hApps',
    url: '/happ-store/Holochain-IDE',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'IDE for building Holochain hApps from models and templates. Uses Holochain anchors as a git like source control with branching, permission control and traceability of changes.',
    zomes: [],
    modules: []
  },
  {
    id: 'Qmmorebighashes333',
    name: 'Notes',
    folder: '/Users/philipbeadle/holochain/CRISPR2/dna',
    url: '/happ-store/Notes',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'A Holochain hApp that demonstrates how to build a CRUD hApp with Holochain-IDE.\nSelecting permissions and roles generates the code for the Zome based on Entry Type fields and links.',
    zomes: [],
    modules: []
  },
  {
    name: 'personas-profiles',
    folder: '/Users/philipbeadle/holochain/hApps/personas-profiles',
    url: '/entry-types',
    contact: 'Philip Beadle',
    mobile: '+61 999 999 999',
    description: 'Manage personal information.\nEasily add profiles to your hApp to integrate the information requested from the players personal my-info hApp. Players manage their own information.',
    zomes: []
  }
]
