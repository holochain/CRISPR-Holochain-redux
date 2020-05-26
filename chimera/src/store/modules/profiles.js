export default {
  namespaced: true,

  state: {
    profiles: [
      {
        id: 'QmhashProfileChimera',
        name: 'Chimera',
        dna: 'QmHashyChimera',
        fields: [
          {
            fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M',
            id: '35635645u46746uirykfgjkmryuo',
            name: 'Handle',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M' }
          },
          {
            fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP' }
          }
        ]
      },
      {
        id: 'QmhashProfileCRISPR',
        name: 'CRISPR',
        dna: 'QmHashyCRISPR',
        fields: [
          {
            fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M',
            name: 'Nick Name',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M' }
          },
          {
            fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP' }
          }
        ]
      },
      {
        id: 'QmhashProfileHolopunkRecords',
        name: 'Holopunk Records',
        dna: 'QmHashyholopunk-records',
        fields: [
          {
            fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M',
            name: 'Nick Name',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'Music', fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M' }
          },
          {
            fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Music', fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP' }
          },
          {
            fieldsFieldId: 'QmQUddVtQcmFHiS7dNAs5GbGEU6JVnWfL6EkZAR7o766AW',
            name: 'URL',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your browsable website, eg http://philt3r.rocks',
            mapping: { persona: 'Music', fieldsFieldId: 'QmQUddVtQcmFHiS7dNAs5GbGEU6JVnWfL6EkZAR7o766AW' }
          }
        ]
      },
      {
        id: 'QmhashProfileKanban',
        name: 'Kanban',
        dna: 'QmHashykanban',
        fields: [
          {
            fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M',
            name: 'handle',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Kanban and projects you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M' }
          },
          {
            fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP' }
          }
        ]
      },
      {
        id: 'QmhashProfileSiteBuilder',
        name: 'Site Builder',
        dna: 'QmHashySiteBuilder',
        fields: [
          {
            fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M',
            name: 'Nick Name',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M' }
          },
          {
            fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP' }
          }
        ]
      },
      {
        id: 'QmhashProfileFreckles',
        name: 'Freckles',
        dna: 'QmHashyFreckles',
        fields: [
          {
            fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M',
            name: 'Nick Name',
            ui: 'text-field',
            linkContract: 'persist',
            description: 'Your nick name or handle that will show on Notes and projects you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmRdJ8dF5hEZWJWBHveV7YkrcZauSPELWB24HQZebeSS5M' }
          },
          {
            fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP',
            name: 'Avatar',
            ui: 'thumbnail',
            linkContract: 'persist',
            description: 'Your avatar will show in the friends list and on some things you edit.',
            mapping: { persona: 'Personal', fieldsFieldId: 'QmT7wV7k13wLWPganJKktjYmmauxbEymEQsuMRNNKh5SnP' }
          }
        ]
      }
    ]
  },
  getters: {
    allProfiles: state => {
      return state.profiles
    },
    profileById: (state) => (profileId) => {
      return state.profiles.find(p => p.id === profileId)
    },
    profileByDna: (state) => (dna) => {
      return state.profiles.find(p => p.dna === dna)
    }
  }
}
