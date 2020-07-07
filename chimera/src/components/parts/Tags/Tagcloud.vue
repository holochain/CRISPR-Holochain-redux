<template>
  <section>
    <vue-word-cloud style="height: 50vh; width: 100%;" :words="words" :color="([, weight]) => weight > 15 ? `${this.$vuetify.theme.themes.dark.entry}` : weight > 10 ? `${this.$vuetify.theme.themes.dark.portTarget}` : `${this.$vuetify.theme.themes.dark.fillFunction}`" font-family="Roboto">
      <template slot-scope="{text, weight, word}">
        <div :title="weight" style="cursor: pointer;" @click="listEntries(word)" :style="{ backgroundImage: 'url(' + require(`@/assets/images/bubbles${weight % 2}.png`) + ')', opacity: 0.8, backgroundRepeat: 'no-repeat', backgroundSize: `${weight * 20}px`}">
          {{ text }}
        </div>
      </template>
    </vue-word-cloud>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
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
  props: ['instance', 'base', 'title'],
  data () {
    return {
      words: [],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159
        },
        {
          name: 'Ice cream sandwich',
          calories: 237
        },
        {
          name: 'Eclair',
          calories: 262
        },
        {
          name: 'Cupcake',
          calories: 305
        },
        {
          name: 'Gingerbread',
          calories: 356
        },
        {
          name: 'Jelly bean',
          calories: 375
        },
        {
          name: 'Lollipop',
          calories: 392
        }
      ]
    }
  },
  methods: {
    ...mapActions('tags', ['fetchTags', 'saveTag']),
    listEntries (evt) {
      console.log(evt)
      this.$emit('list-entries', evt)
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
