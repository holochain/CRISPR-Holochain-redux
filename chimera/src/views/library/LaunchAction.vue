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
              <v-list-item-title><v-icon>mdi-certificate-outline</v-icon> Verify this Holochain Application</v-list-item-title>
            </v-list-item>
            <v-list-item @click="createShortcut">
              <v-list-item-title><v-icon>mdi-account-multiple-plus-outline</v-icon> Start a new {{value.name}} group</v-list-item-title>
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
      </v-row>
    </v-sheet>
  </v-hover>
</template>

<script>
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
    hover: false,
    hoverInner: false,
    menu: false,
    lauchMenu: false
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
    ...mapActions('verify', ['verifyInstall']),
    ...mapMutations('snackbar', [
      'setSnackbar',
      'setValue'
    ]),
    ...mapMutations('library', ['setInstalled']),
    createShortcut () {
      this.menu = false
      this.setSnackbar({
        msg: 'Shortcut created'
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
