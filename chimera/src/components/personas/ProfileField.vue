<template>
  <v-tooltip bottom content-class="mt-n5">
  <template v-slot:activator="{ on }">
    <v-card width="100%" flat class="ma-0 pa-0" v-on="on">
      <profile-field-image :personas="personas" :profileName="profileName" :profileFieldValue="profileFieldValue" :fieldType="profileFieldValue.ui" :edit="edit" v-if="showThumbnail || showImage"/>
      <profile-field-text :personas="personas" :profileName="profileName" :profileFieldValue="profileFieldValue" :fieldType="profileFieldValue.ui" :edit="edit" @profile-field-changed="fieldChanged" v-if="showTextField || showTextArea"/>
    </v-card>
  </template>
  <span>{{this.profileFieldValue.description}}</span>
</v-tooltip>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileFieldImage from './ProfileFieldImage.vue'
import ProfileFieldText from './ProfileFieldText.vue'
export default {
  name: 'ProfileField',
  components: {
    ProfileFieldImage,
    ProfileFieldText
  },
  props: ['profileName', 'profileFieldValue', 'edit'],
  data () {
    return {
      showTextField: false,
      showTextArea: false,
      showImage: false,
      showThumbnail: false
    }
  },
  methods: {
    fieldChanged: function (profileField, personafield) {
      this.$emit('profile-field-changed', profileField, personafield)
    }
  },
  computed: {
    ...mapGetters('personalInformation', ['personas'])
  },
  created () {
    this.showTextField = this.profileFieldValue.ui === 'text-field'
    this.showTextArea = this.profileFieldValue.ui === 'text-area'
    this.showImage = this.profileFieldValue.ui === 'image'
    this.showThumbnail = this.profileFieldValue.ui === 'thumbnail'
  }
}
</script>
