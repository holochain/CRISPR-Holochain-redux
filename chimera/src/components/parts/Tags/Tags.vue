<template>
  <v-container fluid>
    <v-combobox :disabled="disabled" v-model="tags" :filter="filter" :hide-no-data="!search" :items="allTags" :search-input.sync="search" hide-selected label="Search for an option" multiple small-chips solo>
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
            {{ search }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${colors[nonce - 1]}} lighten-3`" :input-value="selected" label small>
          <span class="pr-2">
            {{ item.text }}
          </span>
          <v-icon small @click="parent.selectItem(item)">mdi-close</v-icon>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <v-text-field v-if="editing === item" v-model="editing.text" autofocus flat background-color="transparent" hide-details solo @keyup.enter="edit(index, item)"></v-text-field>
        <v-chip v-else :color="`${colors[nonce - 1]}} lighten-3`" dark label small>
          {{ item.text }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="edit(index, item)">
            <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Tags',
  props: ['instance', 'base', 'title', 'disabled'],
  data: () => ({
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    index: -1,
    nonce: 1,
    menu: false,
    tags: [],
    x: 0,
    search: null,
    y: 0
  }),
  watch: {
    tags (val, prev) {
      if (val.length === prev.length) return
      this.tags = val.map(tag => {
        if (typeof tag === 'string') {
          tag = { id: 'new', text: tag }
          this.saveTag({ base: this.base, tag: tag })
          this.nonce++
        }
        return tag
      })
    }
  },
  methods: {
    ...mapActions('tags', ['fetchTags', 'saveTag']),
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.index = index
      } else {
        console.log({ base: this.base, tag: this.editing })
        this.saveTag({ base: this.base, tag: this.editing })
        this.editing = null
        this.index = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false
      const hasValue = val => val != null ? val : ''
      const text = hasValue(itemText)
      const query = hasValue(queryText)
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    }
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('tags', ['listTags', 'entryTags']),
    allTags () {
      const tags = this.listTags(this.instance.instanceId)
      tags.splice(0, 0, { header: 'Select an option or create one' })
      return tags
    },
    color () {
      const rnd = Math.floor(Math.random() * 6)
      return this.colors[rnd]
    }
  },
  created () {
    this.fetchTags(this.instance)
    this.tags = this.entryTags(this.instance.instanceId, this.base)
  }
}
</script>
