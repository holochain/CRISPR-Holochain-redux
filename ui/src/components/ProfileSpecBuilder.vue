<template>
  <v-card class="mx-auto">
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
       <v-text-field v-model="profileSpecName" class="ml-2" :disabled="!isEditing" label="Profile Spec Name" :hint="'Enter Profile Spec Name'" persistent-hint v-if="isEditing"></v-text-field>
       <v-list-item-title class="headline" v-if="!isEditing">Profile for - {{ profileSpecName }} zome</v-list-item-title>
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
            <v-card-title class="headline">Delete the Profile Spec</v-card-title>
            <v-card-text>This will remove {{profileSpecName}}.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" text @click="deleteSpec(profileSpec)">Proceed</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
     </v-list-item-action>
     <v-list-item-action>
       <v-btn text @click="addSpecField()">
         <v-icon>mdi-plus</v-icon>
         Add Field
       </v-btn>
     </v-list-item-action>
    </v-list-item>
    <v-container class="fill-height ma-0 pl-5" fluid>
      <v-col v-for="(field, index) in this.profileSpec.specFields" :key="index" cols="12">
        <profile-spec-field :index="index" :profileSpecField="field" :fieldNames="fieldNames" @save-profile-spec-field="saveField" @delete-profile-spec-field="deleteField"/>
      </v-col>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProfileSpecBuilder',
  components: {
    ProfileSpecField: () => import('../components/ProfileSpecField')
  },
  props: ['index', 'profileSpec'],
  data () {
    return {
      // currentProfileSpecFields: this.profileSpec.specFields,
      profileSpecName: this.profileSpec.name,
      profileName: '',
      isEditing: '',
      dialog: false,
      addProfileDialog: false
    }
  },
  methods: {
    addSpecField () {
      this.profileSpec.specFields.push({
        anchor: '',
        fieldName: '',
        linkContract: '',
        description: ''
      })
    },
    addProfileFromSpec (spec) {
      console.log('addProfileFromSpec')
      this.profileName = this.profileSpec.name.toString()
      this.addProfileDialog = false
    },
    saveField (fieldIndex, field) {
      console.log('saveField')
      console.log(field)
      this.profileSpec.specFields[fieldIndex] = field
      // this.profileSpec.specFields = this.profileSpec.specFields
      this.$emit('profile-spec-updated', this.index, this.profileSpec)
    },
    deleteField (field) {
      console.log('delete field')
      const fieldName = field.fieldName
      console.log(fieldName)
      this.profileSpec.specFields = this.profileSpec.specFields.filter(function (field) {
        return field.fieldName !== fieldName
      })
    },
    deleteSpec (spec) {
      this.$emit('delete-profile-spec', spec)
    }
  },
  computed: {
    ...mapState('app', ['fieldNames'])
  }
}
</script>
