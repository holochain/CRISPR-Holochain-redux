<template>
  <v-hover v-model="hover">
    <v-sheet :color="hover || menu ? 'secondary' : 'transparent'" class="transition-swing launch-action" tile height="64">
      <v-row align="center" class="fill-height ma-0">
        <div class="text-uppercase fill-height d-flex align-center ml-4 grow" @click="lauchMenu = true">
          {{ hoverInner || menu ? 'Settings' : '💻 Open' }}
        </div>
        <v-menu v-model="lauchMenu" :close-on-content-click="false" attach bottom offset-y class="fill-height" min-width="100%" transition="slide-y-transition">
          <v-list light>
            <v-list-item v-for="instance in instances" :key="instance.id" :to="`${value.launch}/${instance.instanceId}`">
              <v-list-item-title>{{instance.instanceName}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu v-model="menu" :close-on-content-click="false" attach bottom class="fill-height" left min-width="100%" offset-y transition="slide-y-transition">
          <template v-slot:activator="{ attrs, on }">
            <v-hover v-model="hoverInner">
              <v-sheet :color="!hoverInner ? 'transparent' : 'secondary darken-2'" class="d-flex justify-center align-center transition-swing v-sheet--settings" height="64" width="64" v-bind="attrs" v-on="on">
                <v-icon>
                  {{ `mdi-${menu ? 'close' : 'cog'}` }}
                </v-icon>
              </v-sheet>
            </v-hover>
          </template>
          <v-list light>
            <v-list-item :disabled="verifying && verifying !== value.id" @click="verify">
              <v-list-item-title><v-icon>mdi-certificate-outline</v-icon> Verify Holochain Application "{{value.name}}"</v-list-item-title>
            </v-list-item>
            <v-list-item @click="newGroupDialog = true">
              <v-list-item-title><v-icon>mdi-account-multiple-plus-outline</v-icon> Create a new "{{value.name}}" group</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-img :src="require(`@/assets/${value.bg}`)" height="200">
              <v-row align="center" class="fill-height mx-0" justify="center">
                <v-progress-circular indeterminate size="64" color="white" />
              </v-row>
            </v-img>
          </v-card>
        </v-dialog>
        <v-dialog v-model="newGroupDialog" max-width="400">
          <v-card>
            <v-card-title>{{value.name}}</v-card-title>
            <v-img :src="require(`@/assets/${value.bg}`)" height="200" class="align-end" :opacity="0.5">
              <v-row align="center" class="fill-height ma-0 transition-swing" justify="center">
                <v-img :src="require(`@/assets/${value.logo}`)" contain max-width="180" style="z-index: -1;" />
              </v-row>
            </v-img>
            <v-text-field class="ml-2 white--text" v-model="payload.data.instanceName" label="Title of new group" />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="action darken-1" text @click="newGroupDialog = false">
                Cancel
              </v-btn>
              <v-btn color="action darken-1" text @click="createInstance(payload); newGroupDialog = false">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-sheet>
  </v-hover>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'LibraryLaunchAction',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    autoUpdate: true,
    dialog: false,
    newGroupDialog: false,
    hover: false,
    hoverInner: false,
    menu: false,
    lauchMenu: false,
    payload: {
      base: '',
      data: {
        id: 'QmOkb1',
        zome: 'kanban',
        type: 'column',
        instanceId: uuidv4(),
        instanceName: '',
        entry: {
          title: '',
          order: 0
        }
      }
    }
  }),
  computed: {
    ...mapState('library', ['installed']),
    ...mapState('verify', ['verifying']),
    ...mapGetters('instancemanager', ['listInstances']),
    instances () {
      return this.listInstances(this.value.name)
    }
  },
  watch: {
    dialog (val) {
      setTimeout(() => (this.dialog = false), 4000)
    }
  },
  methods: {
    ...mapMutations('instancemanager', ['createInstance']),
    ...mapActions('verify', ['verifyInstall']),
    ...mapMutations('snackbar', [
      'setSnackbar',
      'setValue'
    ]),
    ...mapMutations('library', ['setInstalled']),
    createShortcut () {
      this.menu = false
      this.setSnackbar({
        msg: `Created new ${this.value.name} group`
      })
      this.setValue(true)
    },
    launch () {
      this.$router.push({ path: this.value.launch })
    },
    async verify () {
      this.menu = false
      this.hover = false

      await this.$nextTick()

      this.verifyInstall(this.value.id)
    },
    uninstall () {
      this.menu = false
      this.hover = false
      const installed = this.installed
      this.setInstalled(installed.filter(id => id !== this.value.id))
    }
  }
}
</script>

<style lang="scss">
.launch-action .v-input--selection-controls__input {
  margin-right: 0;
}
.v-sheet--settings {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
