<template>
  <v-card class="mx-auto" max-width="520" color="secondary" dark>
    <v-system-bar color="indigo darken-2" dark>
      <v-icon>mdi-freckle-multiple-outline</v-icon>
      <span class="subtitle">{{title}}</span>
      <v-spacer></v-spacer>
      <v-icon @click="add">mdi-freckle-plus-outline</v-icon>
      <!-- <v-icon>mdi-folder-edit-outline</v-icon> -->
    </v-system-bar>
    <v-alert v-if="errors.length" type="error">
      <v-row no-gutters>
        <v-col cols="11">
          {{errors}}
        </v-col>
        <v-col cols="1">
          <v-icon @click="acknowledgeErrors(base)">mdi-close-box-outline</v-icon>
        </v-col>
      </v-row>
    </v-alert>
    <v-col cols="12" v-for="freckle in freckles" :key="freckle.id">
      <freckle :key="freckle.id" :instance="instance" :base="base" :partBase="base" :freckle="freckle">
      </freckle>
    </v-col>
    <slot></slot>
  </v-card>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'Freckles',
  components: {
    Freckle: () => import('./Freckle')
  },
  props: ['instance', 'base', 'title'],
  methods: {
    add () {
      this.freckles.splice(0, 0, {
        title: '',
        content: ''
      })
    },
    ...mapActions('freckles', ['fetchFreckles', 'acknowledgeErrors'])
  },
  computed: {
    ...mapState('auth', ['chimera']),
    ...mapState('freckles', ['errors']),
    ...mapGetters('freckles', ['listFreckles', 'listErrors']),
    freckles () {
      return this.listFreckles(this.base)
    },
    errors () {
      return this.listErrors(this.base)
    }
  },
  created () {
    this.fetchFreckles(this.base)
  }
}
</script>
