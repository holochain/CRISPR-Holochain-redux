<template>
  <logged-in />
</template>

<script>
export default {
  name: 'FriendsAuth',

  components: {
    LoggedIn: () => import('./LoggedIn')
  }
}
</script>
