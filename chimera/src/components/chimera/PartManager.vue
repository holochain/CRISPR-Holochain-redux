<template>
  <div class="ma-0">
      <v-menu open-on-hover bottom nudge-top="-20">
        <template v-slot:activator="{ on }">
          <v-avatar left v-if="chimera">
            <v-icon small v-on="on">mdi-dna</v-icon>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item v-for="(part, index) in parts" :key="index" @click="addPartPart({ base: base, part: part})">
            <v-list-item-title>{{ part.name }}</v-list-item-title>
          </v-list-item>
          <v-list-item v-for="(invite, i) in partInvites" :key="i + invite.part.title">
            <v-chip v-if="chimera && showChip" class="ma-2" close color="teal" text-color="white" close-icon="mdi-biohazard" @click:close="rejectInvite(invite)">
              <v-avatar left>
                <v-icon small @click="acceptPartInvite({ base: base, invite: invite})">mdi-dna</v-icon>
              </v-avatar>
              {{invite.part.name}} - {{invite.from}}
            </v-chip>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
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
    ...mapMutations('root', ['addPartPart', 'acceptPartInvite']),
    acceptInvite (invite) {
      this.$emit('accept-invite', invite)
    },
    rejectInvite (invite) {
      this.$emit('reject-invite', invite)
    }
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState({
      partInvites (state) {
        console.log(this.base)
        return state.root.partInvites[this.base]
      }
    }),
    ...mapGetters('library', ['partInstances']),
    parts () {
      return this.partInstances
    }
  }
}
</script>
