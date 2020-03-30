<template>
  <v-card class="mx-auto pb-3 pt-2">
    <v-list-item-title class="headline ml-2 mb-2">Profile - {{ profile.name }}</v-list-item-title>
    <v-col v-for="(field) in profileFields" :key="field.fieldName" cols="12" class="ma-0 pt-0 pb-1">
      <profile-field :profileName="profile.name" :profileFieldValue="field" :fieldType="field.fieldType" :personas="personas" @profile-field-changed="fieldChanged"/>
    </v-col>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" text @click="saveProfile">Done</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProfileField from './ProfileField'
export default {
  name: 'ProfileCard',
  components: {
    ProfileField
  },
  props: ['personas', 'profile'],
  data () {
    return {
      profileFields: this.profile.fields
    }
  },
  methods: {
    saveProfile: function () {
      console.log(this.profile.fields)
    },
    fieldChanged: function (profileField, personafield) {
      profileField.mapping = personafield
      console.log(profileField)
    }
  }
}
</script>
