<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row no-gutters>
          <v-col cols="3">
          </v-col>
          <v-col cols="3">
            <p class="title">Create</p>
          </v-col>
          <v-col cols="3">
            <p class="title">Update</p>
          </v-col>
          <v-col cols="3">
            <p class="title">Delete</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
              <p class="title" v-for="role in roles" :key="`title${role.value}`" v-text="role.title"></p>
          </v-col>
          <v-col cols="3">
            <v-radio-group v-model="createEntryPermission" column class="ma-0 pa-0">
              <v-radio v-for="role in roles" :key="`createEntryPermission${role.value}`" color="red" :value="role.value" class="pt-0 mt-0 mb-6" :disabled="role.value==='remove' || role.value==='author-only'"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="3">
            <v-radio-group v-model="updateEntryPermission" column class="ma-0 pa-0">
              <v-radio v-for="role in roles" :key="`updateEntryPermission${role.value}`" color="red" :value="role.value" class="pt-0 mt-0 mb-6"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="3">
            <v-radio-group v-model="deleteEntryPermission" column class="ma-0 pa-0">
              <v-radio v-for="role in roles" :key="`deleteEntryPermission${role.value}`" color="red" :value="role.value" class="pt-0 mt-0 mb-6"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'EntryTypeField',
  props: ['permissions'],
  data () {
    return {
      createEntryPermission: this.permissions.create,
      updateEntryPermission: this.permissions.update,
      deleteEntryPermission: this.permissions.delete,
      addLinkPermission: '',
      removeLinkPermission: '',
      roles: [{ title: 'No-one', value: 'remove' }, { title: 'Author Only', value: 'author-only' }, { title: 'Anyone', value: 'anyone' }, { title: 'Founder', value: 'founder' }]
    }
  },
  watch: {
    createEntryPermission (role) {
      this.$emit('permission-changed', 'create', role)
    },
    updateEntryPermission (role) {
      this.$emit('permission-changed', 'update', role)
    },
    deleteEntryPermission (role) {
      this.$emit('permission-changed', 'delete', role)
    }
  }
}
</script>
