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
          <v-list-item v-for="(invite) in invites" :key="invite.id">
            <v-chip v-if="chimera && showChip" class="ma-2" close color="teal" text-color="white" close-icon="mdi-biohazard" @click:close="rejectInvite(invite)">
              <v-avatar left>
                <v-icon small @click="acceptInvite(invite)">mdi-dna</v-icon>
              </v-avatar>
              {{invite.part.title}} - {{invite.from}}
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
    acceptInvite (invite) {
      this.$emit('accept-invite', invite)
    },
    rejectInvite (invite) {
      this.$emit('reject-invite', invite)
    },
    addPart (name) {
      this.$emit('add-part', { base: this.base, part: { title: name } })
    }
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapGetters('parts', ['allParts', 'partInvites']),
    parts () {
      return this.allParts
    },
    invites () {
      return this.partInvites(this.base)
    }
  }
}
</script>
