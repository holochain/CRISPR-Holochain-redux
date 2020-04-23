<template>
  <div>
    <v-navigation-drawer v-model="friendsDrawer" app class="black overflow-visible" right width="325" static style="overflow: visible">
      <v-row class="mx-0 flex-column fill-height" justify="center">
        <v-col>
          <v-list class="py-0" color="transparent" two-line>
            <auth />
            <template>
              <v-divider />
              <v-list-item>
                <v-list-item-title class="subheading font-weight-light pl-4">
                  Friends Online {{ online }}
                </v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-menu v-for="(friend, i) in friends" :key="i" :offset-x="$vuetify.breakpoint.mdAndUp" :offset-y="$vuetify.breakpoint.smAndDown" :left="$vuetify.breakpoint.mdAndUp" :min-width="$vuetify.breakpoint.smAndDown ? '100%' : undefined" attach :max-width="$vuetify.breakpoint.mdAndUp ? 200 : undefined" style="max-height: 0; max-width: 0;">
                <template v-slot:activator="{ attrs, on }">
                  <v-list-item link v-bind="attrs" class="mx-n3" v-on="on">
                    <v-list-item-action class="justify-center">
                      <v-avatar :color="friend.online ? 'green' : 'red'" size="14" />
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="friend.name" />
                      <v-list-item-subtitle v-if="friend.info">
                        {{ friend.info.name }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-else>
                        {{ friend.online ? 'Online' : 'Offline' }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-badge overlap :content="friend.notifications" :value="friend.notifications" color="green" offset-x="30" offset-y="30">
                      <v-list-item-avatar v-if="friend.info">
                        <v-img :src="require(`@/assets/${friend.info.avatar}`)" />
                      </v-list-item-avatar>
                    </v-badge>
                  </v-list-item>
                </template>
                <v-list :color="$vuetify.breakpoint.mdAndUp ? 'black' : 'grey darken-4'">
                  <v-list-item @click="whisperFriend">
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon>mdi-chat</v-icon>
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Chat</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="inviteFriend">
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon>mdi-chat</v-icon>
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Chat</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="removeFriend">
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon>mdi-account-remove</v-icon>
                      </v-btn>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>Remove</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-list>
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <core-fab />
  </div>
</template>

<script>
// Utilities
import {
  mapGetters,
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'CoreFriends',
  components: {
    Auth: () => import('@/components/friends/Auth'),
    CoreFab: () => import('./Fab')
  },
  computed: {
    ...mapGetters('friends', ['online']),
    ...mapState('auth', ['loggedIn']),
    ...mapState('friends', [
      'drawer',
      'friends'
    ]),
    friendsDrawer: {
      get () {
        return this.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },
  methods: {
    ...mapMutations('friends', ['setDrawer']),
    menu (event) {
      //
    },
    removeFriend () {
      //
    },
    whisperFriend () {
      //
    },
    inviteFriend () {
      //
    }
  }
}
</script>
