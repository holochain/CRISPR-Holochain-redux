<template>
  <base-widget :title="title">
    <v-list
      class="transparent"
      three-line
    >
      <v-list-item
        v-for="({ name, text }, i) in emails"
        :key="i"
      >
        <v-list-item-avatar
          color="grey"
          tile
        />

        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ text }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-row
            class="ma-0 pa-2"
          >
            <v-icon @click="reply(i)">
              mdi-reply
            </v-icon>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </base-widget>
</template>

<script>
export default {
  name: 'WidgetsInbox',

  data: () => ({
    emails: [
      {
        name: 'Isaac D.',
        text: 'Did you see the new episode of Game of Thrones?'
      },
      {
        name: 'Declan L.',
        text: 'Hey man! Where is the next place we are playing at?'
      },
      {
        name: 'Noah B.',
        text: 'I\'ll call you later, there is a new episode on'
      },
      {
        name: 'Carmelo S.',
        text: 'Thanks for the pizza, everyone enjoyed it'
      }
    ]
  }),

  computed: {
    title () {
      return `Inbox (${this.emails.length})`
    }
  },

  methods: {
    reply () {
      //
    }
  }
}
</script>
