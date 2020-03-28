<template>
  <v-card>
    <v-card-title class="headline">Create Entry Validation Rules</v-card-title>
    <v-list subheader flat>
      <v-list-item-group v-for="(group) in validationRules.validate_entry_create" :key="group.group">
        <v-subheader inset>{{ group.group }}</v-subheader>
        <v-radio-group :mandatory="false">
          <template v-for="(rule, index) in group.rules">
            <v-list-item :key="index" @click="ruleSelected(rule)">
              <v-list-item-action>
                <v-radio :value="rule.template"></v-radio>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ rule.rule }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-divider></v-divider>
        </v-radio-group>
      </v-list-item-group>
    </v-list>
    <v-card-title inset class="headline">Update Entry Validation Rules</v-card-title>
    <v-list subheader flat>
      <v-list-item-group v-for="(group) in validationRules.validate_entry_modify" :key="group.group">
        <v-subheader inset>{{ group.group }}</v-subheader>
        <v-radio-group :mandatory="false">
          <template v-for="(rule, index) in group.rules">
            <v-list-item :key="index" @click="ruleSelected(rule)">
              <v-list-item-action>
                <v-radio :value="rule.template"></v-radio>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ rule.rule }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-divider></v-divider>
        </v-radio-group>
      </v-list-item-group>
    </v-list>
    <v-card-title class="headline">Delete Entry Validation Rules</v-card-title>
    <v-list subheader flat>
      <v-list-item-group v-for="(group) in validationRules.validate_entry_delete" :key="group.group">
        <v-subheader inset>{{ group.group }}</v-subheader>
        <v-radio-group :mandatory="false">
          <template v-for="(rule, index) in group.rules">
            <v-list-item :key="index" @click="ruleSelected(rule)">
              <v-list-item-action>
                <v-radio :value="rule.template"></v-radio>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ rule.rule }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-divider></v-divider>
        </v-radio-group>
      </v-list-item-group>
    </v-list>
    <v-card-title class="headline">Add Link Validation Rules</v-card-title>
    <v-list subheader flat>
      <v-list-item-group v-for="(group) in validationRules.validate_link_add" :key="group.group">
        <v-subheader inset>{{ group.group }}</v-subheader>
        <v-radio-group :mandatory="false">
          <template v-for="(rule, index) in group.rules">
            <v-list-item :key="index" @click="ruleSelected(rule)">
              <v-list-item-action>
                <v-radio :value="rule.template"></v-radio>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ rule.rule }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-divider></v-divider>
        </v-radio-group>
      </v-list-item-group>
    </v-list>
    <v-card-title class="headline">Remove Link Validation Rules</v-card-title>
    <v-list subheader flat>
      <v-list-item-group v-for="(group) in validationRules.validate_link_remove" :key="group.group">
        <v-subheader inset>{{ group.group }}</v-subheader>
        <v-radio-group :mandatory="false">
          <template v-for="(rule, index) in group.rules">
            <v-list-item :key="index" @click="ruleSelected(rule)">
              <v-list-item-action>
                <v-radio :value="rule.template"></v-radio>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ rule.rule }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-divider></v-divider>
        </v-radio-group>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ValidationRules',
  computed: {
    ...mapState('app', ['validationRules'])
  },
  methods: {
    ruleSelected (rule) {

    }
  }
}
</script>
