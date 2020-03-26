export default {
  namespaced: true,
  state: {
      hApps: [
        {
          id: 'Qmmorebighashes',
          name: 'eat-sleep-code-repeat',
          folder: '/Users/philipbeadle/eat-sleep-code-repeat/dashboard',
          url: '/zomes',
          contact: 'Philip Beadle',
          mobile: '+61 999 999 999',
          zomes: [
            {
              id: 'Qmmorehasshes',
              name: 'Websites',
              entryTypes: [
                {
                  name: 'Site',
                  fields: [
                    {
                      id: 'Qm1',
                      fieldName: 'domain',
                      fieldType: 'String',
                      createTest: 'philt3r.rocks',
                      updateTest: 'updated'
                    },
                    {
                      id: 'Qm2',
                      fieldName: 'player',
                      fieldType: 'String',
                      createTest: 'Philip Beadle',
                      updateTest: 'Updated'
                    },
                    {
                      id: 'Qm3',
                      fieldName: 'mobile',
                      fieldType: 'String',
                      createTest: '0000000000',
                      updateTest: '1111111111'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'my-info',
          folder: '/Users/philipbeadle/holochain/hApps/my-info',
          url: '/entry-types',
          contact: 'Philip Beadle',
          mobile: '+61 999 999 999',
          zomnes: []
        },
        {
          name: 'holochain-developer',
          folder: '/Users/philipbeadle/holochain/holochain-developer',
          url: '/entry-types',
          contact: 'Philip Beadle',
          mobile: '+61 999 999 999',
          zomnes: []
        }
      ]
    }
  }
}
