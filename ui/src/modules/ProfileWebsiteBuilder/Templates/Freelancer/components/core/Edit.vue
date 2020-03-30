<template>
  <div>
    <welcome-edit :personas="personas" profileName="'Freelancer Demo Website'" :profileFieldValue="welcomeField" />
    <recent-projects-edit />
    <services-edit />
    <about-me-edit />
  </div>
</template>

<script>
export default {
  components: {
    AboutMeEdit: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/edit/AboutMe'),
    RecentProjectsEdit: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/edit/RecentProjects'),
    ServicesEdit: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/edit/Services'),
    WelcomeEdit: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/edit/Welcome')
  },
  props: ['module'],
  computed: {
    profile () {
      const siteProfiles = this.module.data.profiles.filter(function (profile) {
        return profile.name === 'Freelancer Demo Website'
      })
      return siteProfiles[0]
    },
    personas () {
      return this.module.data.personas
    },
    welcomeField () {
      const fields = this.profile.fields.filter(function (field) {
        console.log(field.anchor)
        return field.anchor === 'welcome'
      })
      return fields[0]
    },
    welcomeFieldName () {
      return this.welcomeField.fieldName
    },
    welcomeFieldType () {
      return this.welcomeField.type
    }
  }
}
</script>
