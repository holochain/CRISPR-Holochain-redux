<template>
  <v-card>
    <v-simple-table>
        <table>
            <thead>
                <tr>
                    <th />
                    <th v-for="permission in permissions" :key="permission" v-text="permission"/>
                </tr>
            </thead>
            <tbody>
                <tr v-for="role in roles" :key="role">
                    <td v-text="role" />
                    <td v-for="permission in permissions" :key="permission">
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
      permissions: ['Read', 'Create', 'Update', 'Delete'],
      roles: ['Administrators', 'Agents']
    }
  }
}
</script>
