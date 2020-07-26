<template>
  <v-card class="mx-auto" dark>
    <v-system-bar color="indigo darken-2" dark>
      <span class="subtitle">{{title}}</span>
      <v-spacer></v-spacer>
      <!-- <v-icon v-if="!isEditing" @click="isEditing = true">mdi-note-text-outline</v-icon>
      <v-icon v-if="isEditing && contentInstance.entry.id === 'new'" @click="createEntry(payload); isEditing=false">mdi-content-save</v-icon>
      <v-icon v-if="isEditing && contentInstance.entry.id !== 'new'" @click="updateEntry(payload); isEditing=false">mdi-content-save</v-icon>
      <v-icon @click="deleteEntry(payload)">mdi-delete-outline</v-icon> -->
      <v-icon @click="add">mdi-plus</v-icon>
      <part-manager :base="contentInstance.partBase" @add-part="addPart" @accept-invite="acceptInvite" @reject-invite="rejectInvite"/>
      <v-icon @click="help=!help">mdi-help</v-icon>
    </v-system-bar>
    <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
      <div v-if="chimera">
        Hover over the <v-icon>mdi-dna</v-icon> to see which parts can be added to the Kanban board.
        <v-divider class="my-4 info" style="opacity: 0.22" />
      </div>
      Click the <v-icon @click="add">mdi-plus</v-icon> to start a new Bubble.
    </v-alert>
    <v-alert v-if="errors" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="resetErrors({ instance: contentInstance, base: contentBase })">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <draggable v-if="isDraggable" v-model="entries" :id="`${contentInstance.instanceId}${contentBase}`" :animation="200" ghost-class="ghost-card" group="notes" class="pa-1" :move="move">
      <component :is="contentInstance.type" v-for="entry in entries" :id="entry.id" :key="entry.id" :instance="contentInstance" :base="contentBase" :entry="entry" />
    </draggable>
    <component v-else :is="contentInstance.type" v-for="entry in entries" :id="entry.id" :key="entry.id" :instance="contentInstance" :base="contentBase" :entry="entry" />
    <slot></slot>
  </v-card>
</template>
<script>
import draggable from 'vuedraggable'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Column',
  components: {
    PartManager: () => import('@/components/chimera/PartManager'),
    draggable
  },
  props: ['contentInstance', 'contentBase', 'partBase', 'title', 'hasProfile', 'isDraggable', 'sortKey'],
  data () {
    return {
      isEditing: false,
      help: false
    }
  },
  methods: {
    add () {
      this.contentInstance.entry.id = 'new'
      this.contentInstance.entry.order = 0
      this.entries.splice(0, 0, this.contentInstance.entry)
    },
    move (evt) {
      if (evt.from.id !== evt.to.id) {
        console.log(this.contentInstance)
        this.rebase({ instance: this.contentInstance, from: evt.from.id, to: evt.to.id, id: evt.draggedContext.element.id, createdAt: evt.draggedContext.element.createdAt })
      }
    },
    ...mapActions('root', ['fetchEntries', 'rebase', 'resetErrors', 'agentAddress', 'fetchProfiles']),
    ...mapActions('parts', ['addPart', 'acceptInvite', 'rejectInvite']),
    ...mapMutations('friends', ['setGroup'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState({
      errors (state) {
        return state.root.errors[`${this.contentInstance.instanceId}${this.contentBase}`]
      }
    }),
    entries: {
      get () {
        return this.$store.state.root.entries[`${this.contentInstance.instanceId}${this.contentBase}`]
      },
      set (val) {
        const newOrder = val.map((entry, index) => ({
          ...entry,
          order: index
        }))
        this.$store.dispatch('root/order', { instance: this.contentInstance, base: this.contentBase, entries: newOrder })
      }
    }
  },
  created () {
    if (this.hasProfile) {
      this.setGroup(this.contentInstance)
      this.agentAddress(this.contentInstance)
      this.fetchProfiles(this.contentInstance)
    }
    this.fetchEntries({ instance: this.contentInstance, base: this.contentBase, sortKey: 'order' })
  }
}
</script>
