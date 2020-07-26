<template>
  <section>
    <vue-word-cloud style="height: 50vh; width: 100%;" :words="words" :color="([, weight]) => weight > 15 ? `${this.$vuetify.theme.themes.dark.entry}` : weight > 10 ? `${this.$vuetify.theme.themes.dark.portTarget}` : `${this.$vuetify.theme.themes.dark.fillFunction}`" font-family="Roboto">
      <template slot-scope="{text, weight, word}">
        <div :title="weight" style="cursor: pointer;" @click="listEntries(word)" :style="{ backgroundImage: 'url(' + require(`@/assets/images/bubbles${weight % 2}.png`) + ')', opacity: 0.8, backgroundRepeat: 'no-repeat', backgroundSize: `${weight * 20}px`}">
          {{ text }}
        </div>
      </template>
    </vue-word-cloud>
    <v-simple-table v-if="showEntries">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Bubble</th>
          <th class="text-left">Created By</th>
          <th class="text-right">Preview</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in taggedEntries" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.createdBy }}</td>
          <td class="text-right">
            <v-btn icon @click="loadFile(item)">
              <v-icon>
                mdi-eye-outline
              </v-icon>
            </v-btn>
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </section>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VueWordCloud from 'vuewordcloud'
export default {
  name: 'Tagcloud',
  components: {
    [VueWordCloud.name]: VueWordCloud
  },
  props: ['instance', 'base', 'title', 'showEntries'],
  data () {
    return {
      words: [],
      taggedEntries: [
        {
          name: 'Getting Started',
          createdBy: 'Phil'
        },
        {
          name: 'My Applications/Bubbles',
          createdBy: 'Phil'
        }
      ]
    }
  },
  methods: {
    ...mapActions('tags', ['fetchTags', 'saveTag']),
    listEntries (evt) {
      console.log(evt)
      this.showEntries = true
      this.$emit('list-entries', evt)
    },
    loadFile (item) {
      console.log(item)
      if (item.id === 'tag-cloud') {
        this.cloud = true
        this.showEntries = false
      } else {
        this.cloud = false
        this.isEditing = false
        this.entry.id = item.id
        this.bubble = item.bubble
      }
    }
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('tags', ['listTags'])
  },
  created () {
    this.fetchTags(this.instance)
    const tagWeights = []
    this.listTags(this.instance.instanceId).forEach((tag, index) => {
      if (!tag.header) {
        tagWeights.push([tag.text, (tag.taggedEntries.length + 1) * 5])
      }
    })
    this.words = tagWeights
  }
}
</script>
