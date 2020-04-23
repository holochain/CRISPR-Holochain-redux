<template>
  <v-hover v-model="hover">
    <v-card
      class="v-card--game"
      elevation="6"
    >
      <router-link :to="`/store/games/${value.id}`">
        <v-img
          v-bind="$attrs"
          :height="height"
          :src="require(`@/assets/${value.bg}`)"
          style="border-radius: inherit;"
        >
          <v-row
            :style="styles"
            align="center"
            class="fill-height ma-0 transition-swing"
            justify="center"
          >
            <v-img
              :src="require(`@/assets/${value.logo}`)"
              contain
              max-width="180"
              style="z-index: -1;"
            />
          </v-row>
        </v-img>
      </router-link>
      <profile-card v-if="getAction(value) === 'LaunchAction'" :profile="profile" :personas="personas"/>
      <v-fade-transition mode="out-in">
        <component
          :is="getAction(value)"
          v-if="showAction"
          :key="getAction(value)"
          :value="value"
        />
      </v-fade-transition>
    </v-card>
  </v-hover>
</template>

<script>
import {
  mapGetters,
  mapState
} from 'vuex'
export default {
  name: 'Game',

  components: {
    InstallAction: () => import('@/views/library/InstallAction'),
    LaunchAction: () => import('@/views/library/LaunchAction'),
    VerifyAction: () => import('@/views/library/VerifyAction'),
    ProfileCard: () => import('@/components/personas/ProfileCard')
  },

  inheritAttrs: false,

  props: {
    dense: {
      type: Boolean,
      default: false
    },
    prominent: {
      type: Boolean,
      default: false
    },
    showAction: {
      type: Boolean,
      default: false
    },
    profileId: {
      type: String,
      default: ''
    },
    static: {
      type: Boolean,
      default: false
    },
    tall: {
      type: Boolean,
      default: false
    },
    understate: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    hover: false
  }),

  computed: {
    ...mapState('verify', ['verifying']),
    ...mapGetters('personalInformation', ['profiles', 'personas']),
    profile () {
      return this.profiles[0]
    },
    height () {
      if (this.tall) return 524
      if (this.dense) return 150
      if (this.prominent) return 600
      return 250
    },
    styles () {
      let backgroundColor

      if (this.understate) {
        backgroundColor = 'rgba(117, 117, 117, .72)'
      } else if (!this.static && this.hover) {
        backgroundColor = 'rgba(255, 255, 255, .16)'
      }

      return {
        backgroundColor
      }
    }
  },

  methods: {
    getAction (game) {
      let action = 'Launch'
      if (this.verifying === game.id) action = 'Verify'
      if (!game.installed) action = 'Install'
      return `${action}Action`
    }
  }
}
</script>
