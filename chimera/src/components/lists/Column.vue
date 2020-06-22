<template>
  <v-card class="mx-auto" max-width="520" dark>
    <v-system-bar color="indigo darken-2" dark>
      <span class="subtitle">{{title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-plus</v-icon>
      <part-manager :base="instance.partBase" @add-part="addPart" @accept-invite="acceptInvite" @reject-invite="rejectInvite"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to the Kanban board.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Click the <v-icon @click="add">mdi-plus</v-icon> to start a new Freckle.
    </v-alert>
    <v-alert v-if="errors" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="resetErrors({ instance: instance, base: base })">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <component :is="instance.type" v-for="entry in entries" :id="entry.id" :key="entry.id" :instance="instance" :base="base" :entry="entry" />
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Column',
  components: {
    PartManager: () => import('@/components/chimera/PartManager')
  },
  props: ['instance', 'base', 'title'],
  data () {
    return {
      help: false
    }
  },
  methods: {
    add () {
      this.instance.entry.id = 'new'
      this.instance.entry.order = 0
      this.entries.splice(0, 0, this.instance.entry)
    },
    move (evt) {
      // if (evt.from.id !== evt.to.id) {
      //   console.log(evt.draggedContext.element.id)
      //   console.log(evt.draggedContext.element.createdAt)
      //   console.log(evt.from.id)
      //   console.log(evt.to.id)
      //   // this.rebase({ from: evt.from.id, to: evt.to.id, id: evt.draggedContext.element.id, createdAt: evt.draggedContext.element.createdAt })
      // }
    },
    ...mapActions('origins', ['fetchEntries', 'resetErrors', 'agentAddress', 'fetchProfiles']),
    ...mapActions('parts', ['addPart', 'acceptInvite', 'rejectInvite']),
    ...mapMutations('friends', ['setGroup'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState({
      entries (state) {
        return this.$store.state.origins.entries[`${this.instance.instanceId}${this.base}`]
      },
      errors (state) {
        return state.origins.errors[`${this.instance.instanceId}${this.base}`]
      }
    })
  },
  created () {
    this.setGroup(this.instance)
    this.agentAddress(this.instance)
    this.fetchProfiles(this.instance)
    this.fetchEntries({ instance: this.instance, base: this.base })
  }
}
</script>
