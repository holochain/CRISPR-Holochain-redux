<template>
  <div>
    <welcome />
    <recent-projects />
    <services />
    <about-me />
  </div>
</template>

<script>
export default {
  components: {
    AboutMe: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/AboutMe'),
    RecentProjects: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/RecentProjects'),
    Services: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/Services'),
    Welcome: () => import('@/modules/ProfileWebsiteBuilder/Templates/Freelancer/components/Welcome')
  }
}
</script>
