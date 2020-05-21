<template>
  <v-card width="100%" flat>
    <v-row align="center" justify="start" class="pa-1">
      <v-col cols="4">
        <v-autocomplete label="Select a Field Name" :hint="!isEditing ? 'Click the icon to edit this field' : 'Click the tick to save this field'" :disabled="!isEditing" v-bind:items="autocompleteFieldNames" item-text="name" item-value="fieldsFieldId" :search-input.sync="searchInput" persistent-hint no-filter @change="change" v-model="selected" return-object></v-autocomplete>
      </v-col>
      <v-col cols="8" align="center">
        <v-text-field v-model="selectedData" :disabled="!isEditing" label="Enter Field Value" :hint="'Enter your ' + searchInput" persistent-hint v-if="showTextField"></v-text-field>
        <v-textarea v-model="selectedData" :disabled="!isEditing" label="Enter Field Value" :hint="'Enter your ' + searchInput" persistent-hint v-if="showTextArea"></v-textarea>
        <v-image-input v-model="selectedData" :disabled="!isEditing" :image-quality="0.85" clearable image-format="jpeg,png" v-if="showImage && isEditing" />
        <v-img :src="selectedData" v-if="showImage && !isEditing" />
        <v-image-input v-model="selectedData" :disabled="!isEditing" :image-quality="0.85" clearable image-format="jpeg,png" v-if="showThumbnail && isEditing" :image-height="100" :image-width="100" />
        <v-img :src="selectedData" height="100px" width="100px" v-if="showThumbnail && !isEditing" />
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text :color="isEditing ? 'success' : 'info'" @click="isEditing = !isEditing">{{isEditing ? 'save' : 'edit'}}
        <v-icon :key="`icon-${isEditing}`" :color="isEditing ? 'success' : 'info'" v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"></v-icon>
      </v-btn>
      <v-slide-x-reverse-transition mode="out-in" v-if="isEditing">
        <v-dialog key="delete" v-model="dialog" persistent max-width="290">
           <template v-slot:activator="{ on }">
             <v-btn color="red darken-1" dark text v-on="on">Delete
               <v-icon key="icon-delete" color="error">
                 mdi-delete
               </v-icon>
             </v-btn>
           </template>
           <v-card>
             <v-card-title class="headline">Delete the field</v-card-title>
             <v-card-text>This will remove the {{this.selected.name}} field from the  persona.</v-card-text>
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
               <v-btn color="red darken-1" text @click="deleteField()">Proceed</v-btn>
             </v-card-actions>
           </v-card>
         </v-dialog>
      </v-slide-x-reverse-transition>
      <v-slide-x-reverse-transition mode="out-in" v-if="isEditing">
        <v-dialog key="move" v-model="moveDialog" persistent max-width="290">
           <template v-slot:activator="{ on }">
             <v-btn color="red darken-1" dark text v-on="on">Move
               <v-icon key="icon-move" color="error">mdi-cursor-move
               </v-icon>
             </v-btn>
           </template>
           <v-card>
             <v-card-title class="headline">Move the field</v-card-title>
             <v-card-text>This will move the {{this.selected.name}} field.</v-card-text>
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="green darken-1" text @click="moveDialog = false">Cancel</v-btn>
               <v-btn color="red darken-1" text @click="moveField()">Proceed</v-btn>
             </v-card-actions>
           </v-card>
         </v-dialog>
      </v-slide-x-reverse-transition>
    </v-card-actions>
  </v-card>
</template>

<script>
import VImageInput from 'vuetify-image-input/a-la-carte'
import { mapGetters } from 'vuex'
export default {
  name: 'PersonaField',
  components: {
    VImageInput
  },
  data () {
    return {
      dialog: false,
      moveDialog: false,
      isEditing: this.newField,
      selected: [],
      searchInput: null,
      selectedData: '',
      showTextField: false,
      showTextArea: false,
      showImage: false,
      showThumbnail: false,
      selectedPersonaField: this.personaFieldValue
    }
  },
  methods: {
    change (field) {
      console.log('change')
      console.log(field)
      const that = this
      this.$nextTick(() => {
        console.log(that.autocompleteFieldNames)
      })
    },
    deleteField () {
      console.log('delete')
      console.log(this.selectedPersonaField)
      this.dialog = false
      this.$emit('delete-persona-field', this.selected)
    },
    moveField () {
      console.log('move')
      console.log(this.selectedPersonaField)
      this.moveDialog = false
      this.$emit('move-persona-field', this.selected)
    }
  },
  props: ['newField', 'personaFieldValue'],
  computed: {
    ...mapGetters('personalInformation', ['fields']),
    autocompleteFieldNames () {
      return this.fields
    }
  },
  watch: {
    selected (field) {
      if (field.id === undefined) {
        this.isEditing = true
      }
      this.showTextField = field.ui === 'text-field'
      this.showTextArea = field.ui === 'text-area'
      this.showImage = field.ui === 'image'
      this.showThumbnail = field.ui === 'thumbnail'
    },
    isEditing (save) {
      if (!save) {
        this.$emit('save-persona-field', this.selected, this.selectedData)
      }
    }
  },
  mounted () {
    if (this.personaFieldValue) {
      const fieldsFieldId = this.personaFieldValue.fieldsFieldId
      const name = this.personaFieldValue.name
      const ui = this.personaFieldValue.ui
      this.selected = { id: fieldsFieldId, name: name, ui: ui }
      this.selectedData = this.selectedPersonaField.value
    }
  }
}
</script>

<style lang="sass">
  //
</style>
