<template>
  <v-tooltip bottom content-class="mt-n5">
  <template v-slot:activator="{ on }">
    <v-card width="100%" flat class="ma-0 pa-0" v-on="on">
      <profile-field-image :personas="personas" :profileName="profileName" :profileFieldValue="profileFieldValue" :fieldType="fieldType" v-if="fieldType === 'thumbnail' || fieldType === 'image'"/>
      <profile-field-text :personas="personas" :profileName="profileName" :profileFieldValue="profileFieldValue" :fieldType="fieldType" @profile-field-changed="fieldChanged" v-if="fieldType === 'singleLineText' || fieldType === 'multiLineText'"/>
    </v-card>
  </template>
  <span>{{this.profileFieldValue.description}}</span>
</v-tooltip>
</template>

<script>
import ProfileFieldImage from './ProfileFieldImage.vue'
import ProfileFieldText from './ProfileFieldText.vue'

export default {
  name: 'ProfileField',
  components: {
    ProfileFieldImage,
    ProfileFieldText
  },
  props: ['personas', 'fieldType', 'profileName', 'profileFieldValue'],
  methods: {
    fieldChanged: function (profileField, personafield) {
      this.$emit('profile-field-changed', profileField, personafield)
    }
  }
}
</script>
