<template>
  <v-card>
    <v-img class="white--text align-end" height="420" :src="require(`@/modules/vue-beautiful-chat.gif`)">
      <v-card-title>Holochain Chat</v-card-title>
    </v-img>
     <v-card-text>
      <div class="text--primary">
        Adds a popup chat window to your app.
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" text>
        Add to Project
      </v-btn>
      <v-btn color="orange" text >
        Demo
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'Chat'
}
</script>
