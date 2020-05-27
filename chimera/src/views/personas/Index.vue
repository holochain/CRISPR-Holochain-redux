<template>
  <section>
    <v-toolbar flat>
      <v-btn icon @click="$router.go(-1)">
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
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    PersonaCard: () => import('@/components/personas/PersonaCard')
  },
  methods: {
    deletePersona () {
      console.log('delete persona')
    },
    ...mapActions('personas', ['fetchPersonas'])
  },
  computed: {
    ...mapGetters('personalInformation', ['personas'])
  },
  created () {
    this.fetchPersonas()
    console.log(this.personas[0].fields[0].value)
  }
}
</script>
