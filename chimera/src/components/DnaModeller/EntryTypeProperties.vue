<template>
  <v-card flat class="mx-auto" height="calc(100% - 200px)">
    <v-toolbar>
      <v-toolbar-title>Properties of Entry Type - {{this.entryType.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn color="action" icon @click="help=!help">
          <v-icon>mdi-help</v-icon>
        </v-btn>
      </v-toolbar>
      <v-alert v-model="help" dismissible border="left" colored-border color="deep-purple accent-4" elevation="2">
        Click <v-icon color="info">mdi-circle-edit-outline</v-icon> (Edit) to change the type or field name.
        <v-divider class="my-4 info" style="opacity: 0.22" />
        Click <v-icon>mdi-plus</v-icon> (Add Field) to add a new field
        <v-divider class="my-4 info" style="opacity: 0.22" />
        Enter the field name and select its type from the drop down.
        <v-divider class="my-4 info" style="opacity: 0.22" />
        Click <v-icon color="success">mdi-check-outline</v-icon> (Save) to save the type or field name.
        <v-divider class="my-4 info" style="opacity: 0.22" />
        Click <v-icon color="error">mdi-delete</v-icon> (Delete) to delete the field.
      </v-alert>
    <v-list-item>
      <v-list-item-avatar>
        <v-slide-x-reverse-transition mode="out-in">
            <v-icon
            large
            class="ml-1"
            :key="`icon-${isEditing}`"
            :color="isEditing ? 'success' : 'info'"
            @click="isEditing = !isEditing"
            v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'">
            </v-icon>
        </v-slide-x-reverse-transition>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-text-field v-model="entryType.name" class="ml-2" :disabled="!isEditing" label="Entry Type Name" :hint="'Enter Entry Type Name'" persistent-hint v-if="isEditing"></v-text-field>
        <v-list-item-title class="headline" v-if="!isEditing">{{ entryType.name }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn text @click="addEntryTypeField(entryType)">
          <v-icon>mdi-plus</v-icon>
            Add Field
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-row no-gutters align="start" justify="center">
      <v-col v-for="(field, index) in entryType.fields" :key="index" cols="12">
        <entry-type-field :index="index" :field="field" @save-entry-type-field="saveField" @delete-entry-type-field="deleteField"/>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'EntryTypeProperties',
  components: {
    EntryTypeField: () => import('@/components/DnaModeller/EntryTypeField')
  },
  props: ['entryType'],
  data () {
    return {
      isEditing: '',
      dialog: false,
      help: false
    }
  },
  methods: {
    addEntryTypeField (entryType) {
      this.entryType.fields.push(
        {
          id: '',
          fieldName: '',
          fieldType: ''
        })
    },
    saveField (fieldIndex, field) {
      console.log('Save Field')
      this.entryType.fields[fieldIndex] = field
      this.$emit('entry-type-updated', this.entryType)
    },
    deleteField (fieldIndex, field) {
      console.log('Delete field')
      this.entryType.fields.splice(fieldIndex, 1)
      this.$emit('entry-type-updated', this.entryType)
    }
  }
}
</script>
