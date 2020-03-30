<template>
  <section id="recent-projects" class="hide-overflow" color="secondary">
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" :xs="12" :md="6" class="pa-5">
        <base-bubble-1 style="transform: rotate(180deg) translateX(25%)" />
        <base-heading>
          Recent Projects
        </base-heading>
        <base-text class="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipi<br>
          scin elit. Etiam vulputate augue vel felis gravida<br>
          porta. Lorem ipsum dolor sit amet.
        </base-text>
        <v-card>
          <v-container fill-height fluid class="pa-2">
            <v-row>
              <v-col cols="12" v-for="project in projects" :key="project" :xs="12" :md="6">
                <a href="#">
                  <v-img :src="require(`@/modules/ProfileWebsiteBuilder/Templates/Freelancer/assets/${project}.jpeg`)" max-height="300" />
                </a>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" class="hidden-sm-and-down red" :md="6">
        <v-img :src="require('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/assets/recentprojects.png')" height="100%" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: 'RecentProjectsEdit',
  components: {
    BaseBubble1: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Bubble1'),
    BaseHeading: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Heading'),
    BaseText: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/base/Text')
  },
  data: () => ({
    projects: [
      'project1',
      'project2',
      'project3',
      'project4'
    ]
  })
}
</script>
