<template>
  <v-row>
    <v-col cols="12">
      <v-card flat>
        <v-card-title>{{entryType.name}}</v-card-title>
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
                  <v-radio v-for="role in createEntryRoles" :key="`createEntryPermission${role.value}`" color="red" :value="role.value" class="pt-0 mt-0 mb-6" :disabled="role.value==='no-one' || role.value==='author-only'"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="3">
                <v-radio-group v-model="modifyEntryPermission" column class="ma-0 pa-0">
                  <v-radio v-for="role in roles" :key="`modifyEntryPermission${role.value}`" color="red" :value="role.value" class="pt-0 mt-0 mb-6"></v-radio>
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
    </v-col>
    <v-col cols="12">
      <v-card flat>
        <v-card-title>Link Type -</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row no-gutters>
              <v-col cols="3">
              </v-col>
              <v-col cols="3">
                <p class="title">Add</p>
              </v-col>
              <v-col cols="3">
                <p class="title">Remove</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                  <p class="title" v-for="role in roles" :key="`title${role.value}`" v-text="role.title"></p>
              </v-col>
              <v-col cols="3">
                <v-radio-group v-model="addLinkPermission" column class="ma-0 pa-0">
                  <v-radio v-for="role in createEntryRoles" :key="`addLinkPermission${role.value}`" color="red" :value="role.value" class="pt-0 mt-0 mb-6" :disabled="role.value==='no-one' || role.value==='author-only'"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="3">
                <v-radio-group v-model="removeLinkPermission" column class="ma-0 pa-0">
                  <v-radio v-for="role in roles" :key="`removeLinkPermission ${role.value}`" color="red" :value="role.value" class="pt-0 mt-0 mb-6"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'EntryTypeField',
  data () {
    return {
      createEntryPermission: '',
      modifyEntryPermission: '',
      deleteEntryPermission: '',
      addLinkPermission: '',
      removeLinkPermission: '',
      linkTypes: ['note_link'],
      linkPermissions: ['Add Link', 'Delete Link'],
      roles: [{ title: 'Cannot', value: 'no-one' }, { title: 'Author Only', value: 'author-only' }, { title: 'Anyone', value: 'anyone' }]
    }
  },
  props: ['entryType'],
  computed: {
    createEntryRoles () {
      return this.roles.filter(role => {
        return role.title !== ''
      })
    }
  },
  watch: {
    createEntryPermission (role) {
      this.$emit('permission-changed', 'entryCreate', role)
    },
    modifyEntryPermission (role) {
      this.$emit('permission-changed', 'entryModify', role)
    },
    deleteEntryPermission (role) {
      this.$emit('permission-changed', 'entryDelete', role)
    },
    addLinkPermission (role) {
      this.$emit('permission-changed', 'addLink', role)
    },
    removeLinkPermission (role) {
      this.$emit('permission-changed', 'removeLink', role)
    }
  }
}
</script>
