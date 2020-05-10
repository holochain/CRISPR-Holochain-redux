<template>
  <div class="ma-0">
      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-avatar left v-if="chimera">
            <v-icon small v-on="on">mdi-dna</v-icon>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item v-for="(part, index) in parts" :key="index" @click="addPart(part.name)">
            <v-list-item-title>{{ part.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item v-for="(part, index) in parts" :key="index" @click="addPart(part.name)">
            <v-chip v-if="chimera && showChip" class="ma-2" close color="teal" text-color="white" close-icon="mdi-biohazard">
              <v-avatar left>
                <v-icon small @click="addPart('tasks')">mdi-dna</v-icon>
              </v-avatar>
              Tasks - Art Brock
            </v-chip>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'PartManager',
  components: {
  },
  data () {
    return {
      showChip: true
    }
  },
  props: ['base'],
  methods: {
    close () {
      alert('Chip close clicked')
    },
    acceptInvite () {
      alert('Accept the invite')
    },
    addPart (name) {
      this.$emit('add-part', name)
    }
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('parts', ['allParts']),
    parts () {
      return this.allParts
    }
  }
}
</script>
