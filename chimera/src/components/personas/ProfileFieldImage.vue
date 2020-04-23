<template>
  <v-card width="100%" flat class="ma-0 pa-0">
    <v-col cols="12" class="ma-0 pa-0">
      <v-combobox
        v-model="profileData"
        :items="fieldTypeList"
        :search-input.sync="search"
        chips
        @change="change"
        color="blue-grey lighten-2"
        :label="profileFieldValue.fieldName + this.selectedPersona"
        :hint="profileFieldValue.description"
        persistent-hint
        item-text="fieldName"
        item-value="anchor"
        return-object>
        <template v-slot:selection="data">
          <v-list-item-avatar left>
            <img :src="data.item.fieldValue">
          </v-list-item-avatar>
        </template>
        <template v-slot:item="data">
          <template v-if="data.item.anchor !== ''">
            <v-list-item-avatar>
              <img :src="data.item.fieldValue">
            </v-list-item-avatar>
            <v-list-item-content>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-action>
              <v-list-item-title v-html="data.item.fieldName" justify="end"></v-list-item-title>
              <v-list-item-subtitle v-html="'Persona - ' +data.item.personaTitle" justify="end"></v-list-item-subtitle>
            </v-list-item-action>
          </template>
          <template v-else>
            <v-list-item-avatar>
              <v-icon>mdi-image-plus</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-action>
              <v-list-item-title v-html="'Upload a new ' + addThumbnailItem.fieldName" justify="end"></v-list-item-title>
              <v-list-item-subtitle v-html="'Persona - ' + data.item.personaTitle" justify="end"></v-list-item-subtitle>
            </v-list-item-action>
          </template>
        </template>
      </v-combobox>
    </v-col>
    <v-dialog v-model="addThumbnailDialog" persistent max-width="390">
      <v-card>
       <v-card-title class="headline">Add a new {{addThumbnailItem.fieldName}}</v-card-title>
       <v-list-item class="d-flex justify-center">
         <v-image-input v-model="addThumbnailItem.fieldValue" :image-quality="0.85" clearable image-format="jpeg,png" :image-height="100" :image-width="100"/>
       </v-list-item>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="green darken-1" text @click="addThumbnailDialog = false">Done</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
 </v-card>
</template>

<script>
import VImageInput from 'vuetify-image-input/a-la-carte'
export default {
  name: 'ProfileFieldImage',
  components: {
    VImageInput
  },
  data () {
    return {
      fieldTypeList: [],
      selectedPersona: '',
      profileData: null,
      search: null,
      addThumbnailDialog: false,
      addThumbnailItem: { anchor: '', personaTitle: this.profileName, fieldName: this.profileFieldValue.fieldName, fieldValue: '' },
      mapping: this.profileFieldValue.mapping
    }
  },
  mounted () {
    const personaThumbnails = this.personas.filter((persona) => persona.fields.some((field) => field.fieldType === this.fieldType))
      .map(persona => {
        const personaThumbnail = { ...persona }
        const thumbNailFields = []
        personaThumbnail.fields.filter((field) => field.fieldType === this.fieldType).forEach(function (field) {
          thumbNailFields.push({ anchor: field.anchor, personaTitle: personaThumbnail.title, fieldName: field.fieldName, fieldValue: field.fieldValue })
        })
        return thumbNailFields
      })
    this.fieldTypeList = [].concat.apply([], personaThumbnails)
    this.fieldTypeList.push(this.addThumbnailItem)
    if (this.mapping !== undefined) {
      const anchor = this.mapping.tag
      const id = this.mapping.persona
      const mappedPersona = this.personas.filter((persona) => persona.id === id)
        .map(persona => {
          const mappedPersonaCopy = { ...persona }
          const mappedFields = []
          mappedPersonaCopy.fields.filter((field) => field.anchor === anchor).forEach(function (field) {
            mappedFields.push({ anchor: field.anchor, personaTitle: persona.title, fieldName: field.fieldName, fieldValue: field.fieldValue })
          })
          return mappedFields
        })
      const foundPersona = [].concat.apply([], mappedPersona)[0]
      if (foundPersona) {
        this.profileData = [].concat.apply([], mappedPersona)[0]
        this.selectedPersona = ' (' + this.profileData.personaTitle + '-' + this.profileData.fieldName + ')'
      }
    }
  },
  methods: {
    change (field) {
      this.selectedPersona = ' (' + field.personaTitle + '-' + field.fieldName + ')'
      if (field.anchor === '') {
        this.addThumbnailDialog = true
      }
      const that = this
      this.$nextTick(() => {
        that.$emit('profile-field-changed', field)
      })
    },
    remove (item) {
      this.$emit('profile-field-changed', this.selected)
      this.profileData = null
    }
  },
  props: ['personas', 'fieldType', 'profileName', 'profileFieldValue'],
  watch: {
    selectedPersona (response) {
      console.log(response)
    }
  }
}
</script>

<style lang="sass">
  //
</style>
