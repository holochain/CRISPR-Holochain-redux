<template>
  <v-card width="100%" class="fill-height" flat>
    <v-row align="center" justify="start" class="pa-1">
      <v-col cols="4">
        <v-text-field v-model="fieldName" :disabled="!isEditing" label="Field Name" hint="eg. full_name" persistent-hint ></v-text-field>
      </v-col>
      <v-col cols="8" align="center">
        <v-text-field v-model="fieldType" :disabled="!isEditing" label="Field Type" hint="singleLineText" persistent-hint ></v-text-field>
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
               <v-btn color="red darken-1" text @click="deleteField()">Proceed</v-btn>
             </v-card-actions>
           </v-card>
         </v-dialog>
      </v-slide-x-reverse-transition>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'EntryTypeField',
  data () {
    return {
      dialog: false,
      fieldTypes: ['singleLineText'],
      fieldName: this.field.fieldName,
      fieldType: this.field.fieldType,
      isEditing: false,
      selected: []
    }
  },
  methods: {
    change (field) {
      console.log('change')
      console.log(field)
      const that = this
      this.$nextTick(() => {
        console.log(that.fieldTypes)
      })
    },
    deleteField () {
      console.log('delete')
      this.dialog = false
      this.$emit('delete-entry-type-field', this.fieldName)
    }
  },
  props: ['newField', 'field'],
  watch: {
    selected (field) {
      if (field.fieldName === undefined) {
        this.isEditing = true
      }
    },
    isEditing (save) {
      if (!save) {
        // console.log('Saving ')
        // console.log(this.selected)
        // console.log(' data ')
        // console.log(this.selectedData)
        // this.$emit('save-profile-spec-field', this.selected, this.selectedData)
      }
    }
  },
  mounted () {
    if (this.fieldName) {
      this.isEditing = false
      // this.selected = { fieldType: this.fieldType }
    }
  }
}
</script>
