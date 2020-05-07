<template>
  <section>
    <v-toolbar flat>
      <v-btn icon @click="$router.go(-1)">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Settings</span>
    </v-toolbar>
    <v-divider />
    <div class="pa-3">
      <div class="mb-3">
        Language
      </div>
      <v-form class="mb-3">
        <v-select v-model="language" :items="items" label="Language" flat solo style="max-width: 400px" />
        <v-checkbox label="Minimize To System Tray" />
        <v-checkbox label="Run Holochain when my computer starts" />
        <v-checkbox v-model="chimeraOn" label="Enable Chimera mode" />
        <v-checkbox label="Hide Purchased Products" />
        <v-divider />
        <v-checkbox label="Show my friends when I'm online" />
      </v-form>
      <v-divider class="mb-5" />
      <div class="text-center subheading">
        <v-img width="450" :src="require('@/assets/icons/powered-by-holochain.png')" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data: () => ({
    items: [{
      value: 'en',
      text: '🇦🇺 English'
    },
    {
      value: 'es',
      text: '🇪🇸 Spanish'
    }],
    language: 'en',
    checkboxChimera: false
  }),
  methods: {
    ...mapActions('auth', ['turnChimeraOn', 'turnChimeraOff', ''])
  },
  watch: {
    checkboxChimera (newVal, oldVal) {
      this.chimera = newVal
    }
  },
  computed: {
    ...mapState('auth', ['chimera']),
    chimeraOn: {
      set (value) {
        if (value) this.turnChimeraOn()
        if (!value) this.turnChimeraOff()
      },
      get () {
        return this.chimera
      }
    }
  }
}
</script>
