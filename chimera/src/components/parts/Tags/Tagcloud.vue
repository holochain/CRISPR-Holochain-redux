<template>
  <vue-word-cloud style="height: 100vh; width: 100%;" :words="words" :color="([, weight]) => weight > 10 ? `${this.$vuetify.theme.themes.dark.entry}` : weight > 5 ? `${this.$vuetify.theme.themes.dark.portTarget}` : `${this.$vuetify.theme.themes.dark.fillFunction}`" font-family="Roboto">
    <template slot-scope="{text, weight, word}">
      <div :title="weight" style="cursor: pointer;" @click="tag(word)">
        {{ text }}
      </div>
    </template>
  </vue-word-cloud>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VueWordCloud from 'vuewordcloud'
export default {
  name: 'Tagcloud',
  components: {
    [VueWordCloud.name]: VueWordCloud
  },
  props: ['instance', 'base', 'title'],
  data () {
    return {
      words: []
    }
  },
  methods: {
    ...mapActions('tags', ['fetchTags', 'saveTag']),
    tag (word) {
      alert(word)
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
