<template>
  <section>
    <v-toolbar flat>
      <v-btn icon to="/library/true">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Personas</span>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-divider />
      <v-row>
        <v-col v-for="(persona) in personas" :key="persona.id" cols="12" md="6" class="pl-10 pr-10">
          <persona-card :persona="persona" @delete-persona="deletePersona"/>
        </v-col>
      </v-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
    PersonaCard: () => import('@/components/personas/PersonaCard')
  },
  methods: {
    deletePersona () {
      console.log('delete persona')
    }
  },
  computed: {
    ...mapGetters('personalInformation', ['profiles', 'personas'])
  }
}
</script>
