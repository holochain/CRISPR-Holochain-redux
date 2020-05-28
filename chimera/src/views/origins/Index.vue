<template>
  <origins base="" title="All the origins"/>
</template>

<script>
export default {
  name: 'OriginsView',
  components: {
    Origins: () => import('@/components/parts/Origin/Origins')
  }
}
</script>
