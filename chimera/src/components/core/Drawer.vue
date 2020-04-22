<template>
  <v-navigation-drawer v-model="drawer" app class="grey darken-4" :mini-variant.sync="mini" mini-variant-width="70" permanent>
    <v-list dense color="transparent">
      <v-list-item class="mb-4">
        <v-list-item-avatar>
          <v-img :src="require('@/assets/dna-replication.svg')" />
        </v-list-item-avatar>
        <v-list-item-title>Chimera</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <template v-for="(item, i) in items">
        <v-list-item v-if="!item.spacer" :key="`tile-${i}`" :to="item.to" :value="item.value" color="grey" exact v-on="item.click && { 'click': item.click }">
          <v-list-item-avatar>
            <v-icon style="color: inherit" v-text="item.icon" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
        <div v-else :key="`divider-${i}`" class="my-auto" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'CoreDrawer',
  data () {
    return {
      mini: true
    }
  },
  computed: {
    ...mapState('downloads', {
      downloadDrawer: 'drawer'
    }),
    drawer: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return [
        {
          icon: 'mdi-view-grid',
          text: 'Apps',
          to: '/library'
        },
        {
          icon: 'mdi-newspaper',
          text: 'News',
          to: '/'
        },
        {
          icon: 'mdi-fire',
          text: 'Store',
          to: '/store'
        },
        { spacer: true },
        {
          icon: 'mdi-source-pull',
          text: 'CRISPR',
          to: '/projects'
        },
        {
          icon: 'mdi-head-cog-outline',
          text: 'Settings',
          to: '/settings'
        }
      ]
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer']),
    ...mapMutations('downloads', {
      toggleDownloadDrawer: 'toggleDrawer'
    })
  }
}
</script>
