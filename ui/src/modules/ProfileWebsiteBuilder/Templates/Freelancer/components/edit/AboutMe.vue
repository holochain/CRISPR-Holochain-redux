<template>
  <section id="about" class="hide-overflow">
    <v-row color="white" no-gutters>
      <v-col cols="12" :xs="12" :md="6" class="pa-5">
        <base-bubble-1 style="transform: translate(5%, -5%)" />
        <base-heading class="info--text">
          About Me
        </base-heading>
        <base-text class="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipi<br>
          scin elit. Etiam vulputate augue vel felis gravida<br>
          porta. Lorem ipsum dolor sit amet.
        </base-text>
        <base-subheading class="info--text">
          Skills
        </base-subheading>
        <base-text class="mb-5">
          Lorem ipsum dolor sit amet, consecte tur adipi scin e<br>
          lit. Etiam vulputate augu e vel felis gravida porta.
        </base-text>
        <v-alert outlined color="info">
          <v-row v-for="(skill, i) in skills" :key="i" style="color: #69A1BB;" wrap>
            <v-col cols="12" xs6 text-uppercase v-text="skill.name" />
            <v-col cols="12" xs6 text-xs-right v-text="`${skill.value}%`"/>
            <v-progress-linear :value="skill.value" color="info" height="8"/>
          </v-row>
        </v-alert>
      </v-col>
      <v-col cols="12" class="hidden-sm-and-down" :md="6">
        <v-img :src="require('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/assets/aboutme.png')" height="100%" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'AboutMeEdit',
  components: {
    BaseBubble1: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Bubble1'),
    BaseHeading: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Heading'),
    BaseSubheading: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Subheading'),
    BaseText: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Text')
  },
  data: () => ({
    skills: [
      {
        name: 'Web Design',
        value: 100
      },
      {
        name: 'Web Development',
        value: 75
      },
      {
        name: 'Web Support',
        value: 90
      }
    ]
  })
}
</script>
