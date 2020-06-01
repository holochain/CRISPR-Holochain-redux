<template>
  <v-card width="100%" flat class="ma-0 pa-0">
    <v-col v-show="!edit" cols="12" class="ma-0 pa-0">
      {{profileData.value}}
    </v-col>
    <v-col v-show="edit" cols="12" class="ma-0 pa-0">
      <v-combobox
        ref="combobox"
        v-model="profileData"
        :items="fieldTypeList"
        :filter="filter"
        :search-input.sync="search"
        hide-no-data
        @change="onChange"
        @blur="onBlur"
        color="blue-grey lighten-2"
        :label="profileFieldValue.name + this.selectedPersona"
        :hint="profileFieldValue.description"
        persistent-hint
        item-text="name"
        item-value="id"
        return-object>
        <template v-slot:selection="data">
          <v-list-item-content>{{data.item.value}}</v-list-item-content>
        </template>
        <template v-slot:item="data">
          <v-list-item-title>{{data.item.value}}</v-list-item-title>
          <v-list-item-subtitle v-html="`${data.item.title} - ${data.item.name}`"></v-list-item-subtitle>
        </template>
      </v-combobox>
    </v-col>
 </v-card>
</template>

<script>
export default {
  name: 'ProfileFieldText',
  components: {
  },
  props: ['personas', 'fieldType', 'profileName', 'profileFieldValue', 'edit'],
  data () {
    return {
      fieldTypeList: [],
      selectedPersona: '',
      profileData: null,
      search: null,
      mapping: this.profileFieldValue.mapping
    }
  },
  created () {
    let personaTexts = this.personas.filter((persona) => persona.fields.some((field) => field.ui === this.fieldType))
      .map(persona => {
        persona.fields.map(field => {
          field.title = persona.title
        })
        return persona.fields
      })
    personaTexts = [].concat.apply([], personaTexts).filter(f => f.ui === this.fieldType)
    this.fieldTypeList = [].concat.apply([], personaTexts)
    this.fieldTypeList.unshift({ header: 'Select an option or enter a new one' })

    if (this.mapping !== undefined) {
      const title = this.mapping.persona
      const fieldsFieldId = this.mapping.fieldsFieldId
      const mappedPersona = this.personas.filter((persona) => persona.title === title)
        .map(persona => {
          persona.fields.map(field => {
            field.title = persona.title
          })
          return persona.fields
        })
      const foundPersona = [].concat.apply([], mappedPersona).find(f => f.fieldsFieldId === fieldsFieldId)
      if (foundPersona) {
        this.profileData = foundPersona
        this.selectedPersona = ' (' + this.profileData.title + '-' + this.profileData.name + ')'
      }
    }
  },
  methods: {
    onBlur (e) {
      if (this.search !== null) {
        this.onChange(this.search)
      }
    },
    onChange (field) {
      if (typeof field === 'string') {
        field = { title: this.profileName, name: this.profileFieldValue.name, value: field }
        this.fieldTypeList.push(field)
      }
      this.selectedPersona = ' (' + field.title + '-' + field.name + ')'
      this.profileData = field
      this.$emit('profile-field-changed', this.profileFieldValue, field)
      this.$refs.combobox.blur()
    },
    remove (item) {
      this.$emit('profile-field-changed', this.selected)
      this.profileData = null
    },
    filter (item, queryText, itemText) {
      if (item.header) return false
      const hasValue = val => val != null ? val : ''
      const text = hasValue(item.value)
      const query = hasValue(queryText)
      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    }
  }
}
</script>
