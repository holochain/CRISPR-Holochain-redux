<template>
  <v-row>
    <v-col cols="12" md="4">
      <notes key="To do" :notes="listNotes[0].notes" title="To do"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes key="In progress" :notes="listNotes[1].notes" title="In progress"/>
    </v-col>
    <v-col cols="12" md="4">
      <notes key="Done" :notes="listNotes[2].notes" title="Done"/>
    </v-col>
  </v-row>
</template>
<script>
import { connect } from '@holochain/hc-web-client'
import { mapGetters } from 'vuex'

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
      holochainConnection: {}
    }
  },
  created () {
    console.log('mounted')
    this.holochainConnection = connect({ url: 'ws://localhost:33000' })
    makeHolochainCall(this.holochainConnection, 'notes/notes/list_notes', { }, (result) => {
      const allNotes = result.Ok.sort((a, b) => {
        if (a.updatedAt < b.updatedAt) return -1
        if (a.updatedAt > b.updatedAt) return 1
        return 0
      })

      this.listNotes[0].notes = allNotes.splice(0, 2)
      this.listNotes[1].notes = allNotes.splice(0, 6)
      this.listNotes[2].notes = allNotes.splice(0, 8)
    })
  },
  computed: {
    ...mapGetters('notes', ['listNotes'])
  }
}
</script>
