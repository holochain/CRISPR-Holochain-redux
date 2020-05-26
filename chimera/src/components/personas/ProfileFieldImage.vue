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
        :label="profileFieldValue.name + this.selectedPersona"
        :hint="profileFieldValue.description"
        persistent-hint
        item-text="name"
        item-value="id"
        return-object>
        <template v-slot:selection="data">
          <v-list-item-avatar left>
            <img :src="data.item.value">
          </v-list-item-avatar>
        </template>
        <template v-slot:item="data">
          <template v-if="data.item.value !== ''">
            <v-list-item-avatar>
              <img :src="data.item.value">
            </v-list-item-avatar>
            <v-list-item-content>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-action>
              <v-list-item-subtitle v-html="`${data.item.title} - ${data.item.name}`" justify="end"></v-list-item-subtitle>
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
              <v-list-item-title v-html="'Upload a new ' + addThumbnailItem.name" justify="end"></v-list-item-title>
              <v-list-item-subtitle v-html="`${data.item.title} - ${data.item.name}`" justify="end"></v-list-item-subtitle>
            </v-list-item-action>
          </template>
        </template>
      </v-combobox>
    </v-col>
    <v-dialog v-model="addThumbnailDialog" persistent max-width="390">
      <v-card>
       <v-card-title class="headline">Add a new {{addThumbnailItem.name}}</v-card-title>
       <v-list-item class="d-flex justify-center">
         <v-image-input v-model="addThumbnailItem.value" :image-quality="0.85" clearable image-format="jpeg,png" :image-height="100" :image-width="100"/>
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
      addThumbnailItem: { title: this.profileName, name: this.profileFieldValue.name, value: '' },
      mapping: this.profileFieldValue.mapping
    }
  },
  created () {
    let personaThumbnails = this.personas.filter((persona) => persona.fields.some((field) => field.ui === this.fieldType))
      .map(persona => {
        persona.fields.map(field => {
          field.title = persona.title
        })
        return persona.fields
      })
    personaThumbnails = [].concat.apply([], personaThumbnails).filter(f => f.ui === this.fieldType)
    this.fieldTypeList = [].concat.apply([], personaThumbnails)
    this.fieldTypeList.push(this.addThumbnailItem)
    if (this.mapping !== undefined) {
      const title = this.mapping.persona
      const fieldsFieldId = this.mapping.fieldsFieldId
      const mappedPersona = this.personas.filter((persona) => persona.title === title)
        .map(persona => {
          persona.fields.map(field => {
            field.title = persona.title
          })
          return persona.fields
        })
      const foundPersona = [].concat.apply([], mappedPersona).find(f => f.fieldsFieldId === fieldsFieldId)
      if (foundPersona) {
        this.profileData = foundPersona
        this.selectedPersona = ' (' + this.profileData.title + '-' + this.profileData.name + ')'
      }
    }
  },
  methods: {
    change (field) {
      this.selectedPersona = ' (' + field.title + '-' + field.name + ')'
      if (field.value === '') {
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
