<template>
  <v-card width="100%" flat class="pl-5">
    <v-row align="center" justify="start" no-gutters>
      <v-col cols="3">
        <v-text-field v-model="fieldName" :disabled="!isEditing" label="Field Name" hint="eg. full_name" persistent-hint ></v-text-field>
      </v-col>
      <v-col cols="2" align="center">
        <v-select :items="fieldTypes" v-model="fieldType" :disabled="!isEditing" label="Field Type" hint="singleLineText" persistent-hint></v-select>
      </v-col>
      <v-col cols="5" align="center">
        <v-text-field label="Field description" v-model="fieldDescription" :disabled="!isEditing" hint="Description used in tooltip" persistent-hint></v-text-field>
      </v-col>
      <v-col cols="2" align="center">
        <v-checkbox v-model="required" :disabled="!isEditing" label="Required"></v-checkbox>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-slide-x-reverse-transition mode="out-in">
        <v-btn text :color="isEditing ? 'success' : 'info'" @click="isEditing = !isEditing">{{isEditing ? 'save' : 'edit'}}
          <v-icon
            :key="`icon-${isEditing}`"
            :color="isEditing ? 'success' : 'info'"
            v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'">
          </v-icon>
        </v-btn>
      </v-slide-x-reverse-transition>
      <v-slide-x-reverse-transition mode="out-in" v-if="isEditing">
        <v-dialog key="delete" v-model="dialog" persistent max-width="290">
           <template v-slot:activator="{ on }">
             <v-btn color="red darken-1" dark text v-on="on">Delete
               <v-icon key="icon-delete" color="error">mdi-delete
               </v-icon>
             </v-btn>
           </template>
           <v-card>
             <v-card-title class="headline">Delete the field</v-card-title>
             <v-card-text>This will remove the {{this.fieldName}} field from the Entry Type.</v-card-text>
             <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
               <v-btn color="red darken-1" text @click="deleteField(field)">Proceed</v-btn>
             </v-card-actions>
           </v-card>
         </v-dialog>
      </v-slide-x-reverse-transition>
    </v-card-actions>
  </v-card>
</template>

<script>
import { snakeCase } from 'snake-case'
export default {
  name: 'EntryTypeField',
  props: ['index', 'field'],
  data () {
    return {
      dialog: false,
      fieldTypes: ['String', 'bool', 'u16', 'u32'],
      fieldName: this.field.fieldName,
      fieldType: this.field.fieldType,
      fieldDescription: this.field.fieldDescription,
      required: this.field.required,
      isEditing: false,
      selected: []
    }
  },
  methods: {
    deleteField () {
      console.log('delete')
      this.dialog = false
      this.$emit('delete-entry-type-field', this.index, this.field)
    }
  },
  watch: {
    isEditing (save) {
      if (!save) {
        this.field.fieldName = snakeCase(this.fieldName)
        this.field.fieldType = this.fieldType
        this.field.fieldDescription = this.fieldDescription
        this.field.required = this.required
        this.$emit('save-entry-type-field', this.index, this.field)
      }
    },
    fieldName (newVal) {
      this.fieldName = snakeCase(newVal)
    },
    fieldType (newVal) {
      this.fieldType = newVal
    },
    fieldDescription (newVal) {
      this.fieldDescription = newVal
    },
    required (newVal) {
      this.required = newVal
    }
  },
  mounted () {
    if (this.field.fieldName === '') {
      this.isEditing = true
    }
  }
}
</script>
