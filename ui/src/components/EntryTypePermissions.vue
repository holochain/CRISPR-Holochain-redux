<template>
  <v-card>
    <v-simple-table>
        <table>
            <thead>
                <tr>
                    <th>Note Entry</th>
                    <th v-for="permission in entryPermissions" :key="permission" v-text="permission"/>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles" :key="role">
                    <td v-text="role" />
                    <td v-for="permission in entryPermissions" :key="permission">
                        <v-checkbox></v-checkbox>
                    </td>
                </tr>
            </tbody>
        </table>
    </v-simple-table>
    <v-divider />
  <v-simple-table>
        <table>
            <thead>
                <tr>
                    <th>note_link</th>
                    <th v-for="permission in linkPermissions" :key="permission" v-text="permission"/>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles" :key="role">
                    <td v-text="role" />
                    <td v-for="permission in linkPermissions" :key="permission">
                        <v-checkbox></v-checkbox>
                    </td>
                </tr>
            </tbody>
        </table>
    </v-simple-table>
    <v-card-actions>
    <v-btn >
        Add Role
      </v-btn>
      <v-btn >
        Set Permissions
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'EntryTypeField',
  data () {
    return {
      entryPermissions: ['Create', 'Update', 'Delete'],
      linkTypes: ['note_link'],
      linkPermissions: ['Add Link', 'Delete Link'],
      roles: ['Author', 'Anyone', 'Administrators', 'Editors']
    }
  }
}
</script>
