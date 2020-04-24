<template>
  <v-card class="mx-auto">
    <v-list-item>
     <v-list-item-avatar>
       <v-img :src="avatarData"></v-img>
     </v-list-item-avatar>
     <v-list-item-avatar class="ml-n5 mr-1">
       <v-slide-x-reverse-transition mode="out-in">
         <v-icon
           large
           :key="`icon-${isEditing}`"
           :color="isEditing ? 'success' : 'info'"
           @click="isEditing = !isEditing"
           v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'">
         </v-icon>
       </v-slide-x-reverse-transition>
     </v-list-item-avatar>
     <v-list-item-content>
        <v-text-field v-model="persona.title" :disabled="!isEditing" label="Enter Field Value" :hint="'Enter your Persona Title'" persistent-hint v-if="isEditing"></v-text-field>
        <v-list-item-title class="headline" v-if="!isEditing">Persona - {{ persona.title }}</v-list-item-title>
     </v-list-item-content>
     <v-list-item-action v-if="isEditing">
       <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-icon
              key="icon-delete"
              color="error"
              v-on="on">mdi-delete
            </v-icon>
          </template>
          <v-card>
            <v-card-title class="headline">Delete the persona</v-card-title>
            <v-card-text>This will remove {{persona.title}}.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" text @click="deletePersona(persona)">Proceed</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
     </v-list-item-action>
     <v-list-item-action>
       <v-btn icon @click="addPersonaField(persona)">
         <v-icon>mdi-plus</v-icon>
       </v-btn>
     </v-list-item-action>
     <v-list-item-action>
       <v-btn icon :to="{name: 'image-manager'}">
         <v-icon>mdi-image-album</v-icon>
       </v-btn>
     </v-list-item-action>
     <v-list-item-action>
       <v-btn icon :to="{name: 'video-manager'}">
         <v-icon>mdi-library-video</v-icon>
       </v-btn>
     </v-list-item-action>
     <v-list-item-action>
       <v-btn icon :to="{name: 'music-manager'}">
         <v-icon>mdi-library-music</v-icon>
       </v-btn>
     </v-list-item-action>
   </v-list-item>
    <!-- <v-img
      class="white--text align-end"
      height="200px"
      src="/img/holochain-circle.png">
    </v-img> -->
    <v-container class="fill-height ma-0 pl-5" fluid>
      <v-col v-for="(field) in personaFields" :key="field.fieldName" cols="12">
        <persona-field :personaFieldValue="field" @save-persona-field="saveField" @delete-persona-field="deleteField"/>
      </v-col>
    </v-container>
  </v-card>
</template>

<script>
import PersonaField from './PersonaField'
export default {
  name: 'PersonaCard',
  components: {
    PersonaField
  },
  props: ['persona'],
  data () {
    return {
      personaFields: this.persona.fields,
      isEditing: '',
      avatarData: this.persona.fields[0].fieldValue,
      dialog: false
    }
  },
  methods: {
    addPersonaField (persona) {
      console.log(persona)
      this.persona.fields.push({})
    },
    saveField (field, fieldData) {
      field.personaId = this.persona.id
      console.log(field.fieldName)
      if (field.fieldName === 'Avatar') {
        this.avatarData = fieldData
      }
      // fields for Holochain entry
      // console.log(this.persona)
      // console.log(field)
      console.log(fieldData)
    },
    deleteField (field) {
      console.log('delete field')
      const fieldName = field.fieldName
      console.log(fieldName)
      this.personaFields = this.personaFields.filter(function (field) {
        return field.fieldName !== fieldName
      })
    },
    deletePersona (persona) {
      this.$emit('delete-persona', persona)
    }
  }
}
</script>
