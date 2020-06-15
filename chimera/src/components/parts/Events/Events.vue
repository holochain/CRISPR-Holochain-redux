<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-event-multiple-outline</v-icon>
      <span class="subtitle">{{title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-event-plus-outline</v-icon>
      <!-- <v-icon>mdi-folder-edit-outline</v-icon> -->
    </v-system-bar>
    <v-alert v-if="errors.length" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="acknowledgeErrors(base)">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-col cols="12" v-for="event in events" :key="event.id">
      <event :key="event.id" :instanceId="instanceId" :base="base" :partBase="base" :event="event">
      </event>
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Events',
  components: {
    Event: () => import('./Event')
  },
  props: ['instanceId', 'base', 'title'],
  methods: {
    add () {
      this.events.splice(0, 0, {
        title: '',
        content: ''
      })
    },
    ...mapActions('events', ['fetchEvents', 'acknowledgeErrors'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('events', ['errors']),
    ...mapGetters('events', ['listEvents', 'listErrors']),
    events () {
      return this.listEvents(this.base)
    },
    errors () {
      return this.listErrors(this.base)
    }
  },
  created () {
    this.fetchEvents({ instanceId: this.instanceId, base: this.base })
  }
}
</script>
