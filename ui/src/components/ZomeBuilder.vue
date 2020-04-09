<template>
  <v-card flat class="mx-auto" height="calc(100% - 200px)">
    <v-toolbar>
      <v-toolbar-title>{{this.entryType.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">
        <v-icon>mdi-view-dashboard</v-icon>
        Dashboard
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-row no-gutters align="start" justify="center">
        <v-col cols="12">
          <v-tabs v-model="tab" background-color="primary" dark>
            <v-tab key="entity">
              Entry Fields
            </v-tab>
            <v-tab key="permissions">
              Permissions
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item key="entity">
                <v-card flat class="mx-auto">
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
                    <v-list-item-title class="headline" v-if="!isEditing">Entry Type - {{ entryType.name }}</v-list-item-title>
                    <v-list-item-subtitle></v-list-item-subtitle>
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
                          <v-card-title class="headline">Delete the Entry Type</v-card-title>
                          <v-card-text>This will remove {{entryType.name}}.</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
                            <v-btn color="green darken-1" text @click="deleteEntryType(entryType)">Proceed</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn text @click="addEntryTypeField(entryType)">
                      <v-icon>mdi-plus</v-icon>
                      Add Field
                    </v-btn>
                  </v-list-item-action>
                  </v-list-item>
                  <v-content>
                    <v-row no-gutters align="start" justify="center">
                      <v-col v-for="(field, index) in configurableFields" :key="index" cols="12">
                        <entry-type-field :index="index" :field="field" @save-entry-type-field="saveField" @delete-entry-type-field="deleteField"/>
                      </v-col>
                    </v-row>
                  </v-content>
                </v-card>
            </v-tab-item>
            <v-tab-item key="permissions">
              <entry-type-permissions :entryType="entryType" @permission-changed="permissionChanged"/>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-content>
  </v-card>
</template>

<script>
export default {
  name: 'ZomeBuilder',
  components: {
    EntryTypeField: () => import('../components/EntryTypeField'),
    EntryTypePermissions: () => import('../components/EntryTypePermissions')
  },
  props: ['hApp', 'zome', 'entryType'],
  data () {
    return {
      tab: null,
      isEditing: '',
      dialog: false,
      generateEntryTypeDialog: false,
      patternDescription: this.entryType.pattern
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
    },
    deleteEntryType (spec) {
      this.$emit('delete-entry-type', spec)
    },
    permissionChanged (mutation, role) {
      this.$emit('permission-changed', this.entryType, mutation, role)
    }
  },
  computed: {
    configurableFields () {
      const fields = this.entryType.fields.filter(field => {
        return field.fieldName !== 'id' && field.fieldName !== 'created_at' && field.fieldName !== 'address' && field.fieldName !== 'updated_at'
      })
      console.log(fields)
      return fields
    }
  }
}
</script>
