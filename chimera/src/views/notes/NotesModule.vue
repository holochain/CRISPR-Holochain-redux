<template>
  <v-row>
    <v-col cols="12" md="4">
      <notes :notes="projectNotes[0].notes" title="To do"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes :notes="projectNotes[1].notes" title="In progress"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes :notes="projectNotes[2].notes" title="Done"/>
    </v-col>
  </v-row>
</template>
<script>
import { connect } from '@holochain/hc-web-client'

function makeHolochainCall (holochainConnection, callString, params, callback) {
  const [instanceId, zome, func] = callString.split('/')
  holochainConnection.then(({ callZome }) => {
    callZome(instanceId, zome, func)(params).then((result) => callback(JSON.parse(result)))
  })
}

export default {
  name: 'NotesModule',
  components: {
    Notes: () => import('@/components/modules/Notes/Notes')
  },
  data () {
    return {
      projectNotes: [
        {
          anchorText: 'To do',
          notes: [
            {
              id: 'QmhashTodo1',
              title: 'Note with no tasks',
              content: 'A simple note card - phase 1 of Hoplochain IDE project',
              tasks: []
            },
            {
              id: 'Qmhash2',
              title: 'Note with tasks',
              content: 'Just like github projects but better😎Check out the cool system bar for edit, save, delete and archive.',
              tasks: [
                {
                  done: false,
                  title: 'Click <-- to see progress.'
                },
                {
                  done: false,
                  title: 'Generate DNA from model'
                },
                {
                  done: false,
                  title: 'Hook up this Note component to DNA.'
                }
              ]
            }
          ]
        },
        {
          anchorText: 'In Progress',
          notes: [
            {
              id: 'QmhashProgress1',
              title: 'In Progress Note with no tasks',
              content: 'A simple note card - phase 1 of Hoplochain IDE project',
              tasks: []
            },
            {
              id: 'QmhashProgress2',
              title: 'In Progress Note with tasks',
              content: 'Just like github projects but better😎Check out the cool system bar for edit, save, delete and archive.',
              tasks: [
                {
                  done: false,
                  title: 'Pick a name for the project.'
                },
                {
                  done: false,
                  title: 'Generate DNA from model'
                }
              ]
            }
          ]
        },
        {
          anchorText: 'Done',
          notes: [
            {
              id: 'QmhashDone1',
              title: 'Done Note with no tasks',
              content: 'A simple note card - phase 1 of Hoplochain IDE project',
              tasks: []
            },
            {
              id: 'QmhashDone2',
              title: 'Done Note with tasks',
              content: 'Just like github projects but better😎Check out the cool system bar for edit, save, delete and archive.',
              tasks: [
                {
                  done: false,
                  title: 'Show Profile on the app card.'
                }
              ]
            }
          ]
        }
      ],
      holochainConnection: {}
    }
  },
  created () {
    console.log('mounted')
    this.holochainConnection = connect({ url: 'ws://localhost:33000' })
    makeHolochainCall(this.holochainConnection, 'notes/notes/list_notes', { }, (result) => {
      console.log('retrieved notes', result)
      this.projectNotes[0].notes = result.Ok.filter(n => n.title.startsWith('Alice'))
      this.projectNotes[1].notes = result.Ok.filter(n => n.title.startsWith('Lucy'))
      this.projectNotes[2].notes = result.Ok.filter(n => n.title.startsWith('Phil'))
    })
  }
}
</script>
