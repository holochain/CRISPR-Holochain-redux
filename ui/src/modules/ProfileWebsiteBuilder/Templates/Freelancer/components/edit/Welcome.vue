<template>
  <section id="welcome" class="hide-overflow" >
    <v-row no-gutters>
      <v-col cols="12" class="hidden-sm-and-down" :md="6">
        <!-- <profile-field-image :personas="personas" :profileName="profileName" :profileFieldValue="profileFieldValue" :fieldType="fieldType" @profile-field-changed="fieldChanged"/> -->
      </v-col>
      <v-col cols="12" :xs="12" :md="6" class="pa-5">
        <base-bubble-1 style="transform: rotate(180deg) translateY(25%)" />
        <v-row align="center" justify="center">
          <v-col cols="12" :xs="10" :md="6">
            <base-heading>Welcome!</base-heading>
            <base-text>
              <profile-field-text :personas="personas" :profileName="profileName" :profileFieldValue="profileFieldValue" fieldType="multiLineText" @profile-field-changed="fieldChanged"/>
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
  name: 'Welcome',
  components: {
    BaseBubble1: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Bubble1'),
    BaseBubble2: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Bubble2'),
    BaseHeading: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Heading'),
    BaseText: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Text'),
    BaseBtn: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Btn'),
    // ProfileFieldImage: () => import('@/modules/ProfileWebsiteBuilder/components/ProfileFieldImage'),
    ProfileFieldText: () => import('@/modules/ProfileWebsiteBuilder/components/ProfileFieldText')
  },
  props: ['personas', 'fieldType', 'profileName', 'profileFieldValue'],
  methods: {
    fieldChanged: function (profileField, personafield) {
      this.$emit('profile-field-changed', profileField, personafield)
    }
  }
}
</script>
