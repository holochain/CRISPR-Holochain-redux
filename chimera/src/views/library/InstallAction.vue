<template>
  <v-dialog v-model="dialog" :disabled="isLoading" max-width="600">
    <template v-slot:activator="{ attrs, on }">
      <v-hover v-model="hover">
        <v-sheet
          :color="hover && !isLoading ? 'secondary' : 'transparent'"
          class="transition-swing"
          height="64"
          style="border-radius: 0 0 6px 6px;"
          v-bind="attrs"
          v-on="on"
        >
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <div class="text-uppercase pa-3">
              <span v-if="!isLoading">
                🧬 Install
              </span>
              <v-progress-circular
                v-else
                width="2"
                indeterminate
              />
            </div>
          </v-row>
        </v-sheet>
      </v-hover>
    </template>

    <v-card light>
      <v-card-title>
        Download and Install
      </v-card-title>
      <v-card-subtitle>
        (Coming soon)
      </v-card-subtitle>
      <v-card-text>
        This will make the part available in Chimera mode for you to add it to any other part.
      </v-card-text>

      <v-card-actions class="justify-space-between grey darken-4">
        <v-btn
          :disabled="isLoading"
          color="grey lighten-4"
          dark
          text
          @click="dialog = false"
        >
          Cancel
        </v-btn>

        <v-btn
          :loading="isLoading"
          color="success"
          dark
          depressed
          @click="isLoading = true"
        >
          🧬 Install
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'LibraryInstallAction',

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    dialog: false,
    folder: 'C:/',
    hover: false,
    isLoading: false
  }),

  computed: {
    ...mapState('downloads', ['downloading']),
    ...mapState('library', ['installedHapps']),
    path () {
      return `${this.folder}Game`
    }
  },

  watch: {
    isLoading (val) {
      const downloading = this.downloading.slice()
      downloading.push(this.value.id)
      this.setDownloading(downloading)
      this.dialog = false
      val && setTimeout(() => {
        this.isLoading = false
        const installed = this.installedHapps
        installed.push(this.value.id)
        this.setInstalled(installed)
        this.setDownloading(
          this.downloading.filter(id => id !== this.value.id)
        )
      }, 3000)
    }
  },
  methods: {
    ...mapMutations('downloads', ['setDownloading']),
    ...mapMutations('library', ['setInstalledHapps'])
  }
}
</script>
