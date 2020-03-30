<template>
  <section id="services" class="hide-overflow">
    <v-row color="accent" no-gutters>
      <v-col cols="12" class="hidden-sm-and-down" :md="6">
        <v-img :src="require('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/assets/services.png')" height="100%" />
      </v-col>
      <v-col cols="12" :xs="12" :md="6" class="pa-5">
        <v-row align="center" justify="center" >
          <v-col cols="12" :xs="12">
            <base-bubble-2 style="transform: translateX(55%)" />
            <base-heading class="info--text">
              Services
            </base-heading>
            <base-text class="mb-5">
              Curabitur venenatis tortor erat, quis laoreet nis<br>
              lobortis eget. Fusce tempor aucto.
            </base-text>
          </v-col>
          <v-col cols="6" v-for="(service, i) in services" :key="i" class="mb-3" >
            <v-avatar class="elevation-6 mb-2" color="#69A1BB" size="64" tile>
              <v-icon dark size="52" v-text="service.icon" />
            </v-avatar>
            <base-text>
              <div class="mb-2" v-text="service.name" />
              <div v-html="service.blurb" />
            </base-text>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'services',
  components: {
    BaseBubble2: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Bubble2'),
    BaseText: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Text'),
    BaseHeading: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Heading')
  },
  data: () => ({
    services: [
      {
        name: 'Research',
        icon: 'mdi-clipboard-text-outline',
        blurb: 'Curabitur et nisi semper,<br> pellent e sque '
      },
      {
        name: 'Design',
        icon: 'mdi-pencil-outline',
        blurb: 'Curabitur et nisi semper, <br>pellent.'
      },
      {
        name: 'Development',
        icon: 'mdi-settings-outline',
        blurb: 'Curabitur et nisi semper, <br>pellent.'
      },
      {
        name: 'Support',
        icon: 'mdi-account',
        blurb: 'Curabitur et nisi semper, <br>pellent.'
      }
    ]
  })
}
</script>
