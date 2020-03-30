<template>
  <section id="welcome" class="hide-overflow" >
    <v-row no-gutters>
      <v-col cols="12" class="hidden-sm-and-down" :md="6">
        <v-img :src="require('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/assets/welcome.png')" height="100vh" />
      </v-col>
      <v-col cols="12" :xs="12" :md="6" class="pa-5">
        <base-bubble-1 style="transform: rotate(180deg) translateY(25%)" />
        <v-row align="center" justify="center">
          <v-col cols="12" :xs="10" :md="6">
            <base-heading>Welcome!</base-heading>
            <base-text>
              Lorem ipsum dolor sit amet, consectetur ad
              ipiscin elit. Etiam vulputate augue vel felis gra
              vida porta. Lorem ipsum dolor sit amet, cons
              ectetur adipiscing elit.<br>
              Lorem ipsum dolor sit amet, consectetur ad
              ipiscin elit. Etiam vulputate augue vel felis gra
              vida porta. Lorem ipsum dolor sit amet, cons
              ectetur adipiscing elit.
            </base-text>
            <base-btn class="mt-4">
              Learn More!
            </base-btn>
          </v-col>
        </v-row>
        <base-bubble-2 style="transform: rotate(180deg) translate(-200px, -15%)" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'WelcomeEdit',
  components: {
    BaseBubble1: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Bubble1'),
    BaseBubble2: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Bubble2'),
    BaseHeading: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Heading'),
    BaseText: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Text'),
    BaseBtn: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Btn')
  }
}
</script>
