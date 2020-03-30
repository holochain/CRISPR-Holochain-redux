<template>
  <v-card width="100%" flat class="ma-0 pa-0">
    <v-col cols="12" class="ma-0 pa-0">
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
        :label="profileFieldValue.fieldName + this.selectedPersona"
        :hint="profileFieldValue.description"
        persistent-hint
        item-text="fieldName"
        item-value="anchor"
        return-object>
        <template v-slot:selection="data">
          <v-list-item-content>{{data.item.fieldValue}}</v-list-item-content>
        </template>
        <template v-slot:item="data">
          <v-list-item-title>{{data.item.fieldValue}}</v-list-item-title>
          <v-list-item-subtitle v-html="'Persona - ' + data.item.personaTitle"></v-list-item-subtitle>
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
  data () {
    return {
      fieldTypeList: [],
      selectedPersona: '',
      profileData: null,
      search: null,
      mapping: this.profileFieldValue.mapping
    }
  },
  mounted () {
    const personaTexts = this.personas.filter((persona) => persona.fields.some((field) => field.fieldType === this.fieldType))
      .map(persona => {
        const personaText = { ...persona }
        const textFields = []
        personaText.fields.filter((field) => field.fieldType === this.fieldType).forEach(function (field) {
          textFields.push({ anchor: field.anchor, personaTitle: personaText.title, fieldName: field.fieldName, fieldValue: field.fieldValue })
        })
        return textFields
      })
    this.fieldTypeList = [].concat.apply([], personaTexts)
    this.fieldTypeList.unshift({ header: 'Select an option or create one' })

    if (this.mapping !== undefined) {
      const anchor = this.mapping.tag
      const title = this.mapping.persona
      console.log(anchor)
      console.log(title)

      const mappedPersona = this.personas.filter((persona) => persona.id === title)
        .map(persona => {
          const mappedPersonaCopy = { ...persona }
          const mappedFields = []
          mappedPersonaCopy.fields.filter((field) => field.anchor === anchor).forEach(function (field) {
            mappedFields.push({ anchor: field.anchor, personaTitle: title, fieldName: field.fieldName, fieldValue: field.fieldValue })
          })
          return mappedFields
        })

      const foundPersona = [].concat.apply([], mappedPersona)[0]
      if (foundPersona) {
        this.profileData = [].concat.apply([], mappedPersona)[0]
        this.selectedPersona = ' (' + this.profileData.personaTitle + '-' + this.profileData.fieldName + ')'
      }
      console.log(foundPersona)
    }
  },
  methods: {
    onBlur (e) {
      if (this.search !== null) {
        this.onChange(this.search)
      }
    },
    onChange (field) {
      console.log('change')
      console.log(field)
      if (typeof field === 'string') {
        console.log('New ' + this.profileFieldValue.fieldName)
        field = { anchor: '', personaTitle: this.profileName, fieldName: this.profileFieldValue.fieldName, fieldValue: field }
        this.fieldTypeList.push(field)
      }
      this.selectedPersona = ' (' + field.personaTitle + '-' + field.fieldName + ')'
      this.profileData = field
      this.$emit('profile-field-changed', this.profileFieldValue, field)
      this.$refs.combobox.blur()
    },
    remove (item) {
      console.log('remove')
      this.$emit('profile-field-changed', this.selected)
      this.profileData = null
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(item.fieldValue)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    }
  },
  props: ['personas', 'fieldType', 'profileName', 'profileFieldValue']
}
</script>

<style lang="sass">
  //
</style>
