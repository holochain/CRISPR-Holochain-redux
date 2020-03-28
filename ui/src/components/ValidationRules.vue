<template>
  <v-card>
    <v-card-title class="headline">Create Entry Validation Rules</v-card-title>
    <v-list subheader flat>
      <v-list-item-group v-for="(group, groupIndex) in validationRules.validateEntryCreate" :key="group.group">
        <v-subheader inset>{{ group.group }}</v-subheader>
        <v-radio-group :mandatory="false">
          <template v-for="(rule, index) in group.rules">
            <v-list-item :key="index" @click="ruleSelected(rule)">
              <v-list-item-action>
                <v-radio :value="`${groupIndex}-${index}`"></v-radio>
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
      <v-list-item-group v-for="(group, groupIndex) in validationRules.validateEntryModify" :key="group.group">
        <v-subheader inset>{{ group.group }}</v-subheader>
        <v-radio-group :mandatory="false" value="0-0">
          <template v-for="(rule, index) in group.rules">
            <v-list-item :key="index" @click="ruleSelected(rule)">
              <v-list-item-action>
                <v-radio :value="`${groupIndex}-${index}`"></v-radio>
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
      <v-list-item-group v-for="(group) in validationRules.validateEntryDelete" :key="group.group">
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
      <v-list-item-group v-for="(group) in validationRules.validateLinkAdd" :key="group.group">
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
      <v-list-item-group v-for="(group) in validationRules.validateLinkRemove" :key="group.group">
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
  data () {
    return {
      createRuleGroup: []
    }
  },
  computed: {
    ...mapState('app', ['validationRules'])
  },
  methods: {
    ruleSelected (rule) {
      console.log(rule)
    }
  }
}
</script>
