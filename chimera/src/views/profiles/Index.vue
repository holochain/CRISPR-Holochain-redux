<template>
  <section>
    <v-toolbar flat>
      <v-btn icon to="/">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-divider class="mx-3" inset vertical />
      <span class="title">Profiles</span>
      <v-spacer></v-spacer>
      <v-btn text to="modules">
        <v-icon>mdi-account</v-icon>
        Personas
      </v-btn>
    </v-toolbar>
    <v-divider />
      <v-row>
        <v-col v-for="(profile) in profiles" :key="profile.id" cols="12" md="6" class="pl-10 pr-10">
          <profile-card :profile="profile" :personas="personas"/>
        </v-col>
      </v-row>
  </section>
</template>

<script>
import { profiles } from '../../store/profiles.js'
import { personas } from '../../store/personas.js'

export default {
  components: {
    ProfileCard: () => import('@/components/personas/ProfileCard')
  },
  data () {
    return {
      personas: personas,
      profiles: profiles
    }
  }
}
</script>
