<template>
  <v-card class="mx-auto pb-3 pt-2">
    <v-list-item-title class="headline ml-2 mb-2">Profile - {{ profile.name }}</v-list-item-title>
    <v-col v-for="(field) in profileFields" :key="field.fieldName" cols="12" class="ma-0 pt-0 pb-1">
      <profile-field :profileName="profile.name" :profileFieldValue="field" :fieldType="field.ui" :edit="edit" @profile-field-changed="fieldChanged"/>
    </v-col>
    <v-card-actions>
      <slot></slot>
      <v-spacer></v-spacer>
      <v-btn v-if="edit !== true" color="action" icon @click="edit = true">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn v-if="edit === true" color="action" icon @click="saveProfile; edit = false">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn color="action" icon v-if="profileFields.find(f => f.fieldsFieldId === 'QmbgMNs8vJ8g3zUQKJvWZkidLMcGnyoF6dHYn6qbxZD7r9')" :to="`/profile-site/${profile.id}`">
        <v-icon>mdi-web</v-icon>
      </v-btn>
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
  props: ['profile'],
  data () {
    return {
      profileFields: this.profile.fields,
      edit: false
    }
  },
  methods: {
    saveProfile: function () {
      console.log(this.profile.fields)
    },
    fieldChanged: function (profileField, personafield) {
      profileField.mapping = personafield
    }
  }
}
</script>
