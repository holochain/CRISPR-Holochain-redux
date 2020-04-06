<template>
  <zome-editor :hApp="hApp" :zome="hApp.zomes[0]" />
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Model',
  components: {
    ZomeEditor: () => import('../components/ZomeEditor')
  },
  computed: {
    ...mapState('app', ['hApps']),
    hApp () {
      const filtered = this.hApps.filter(hApp => {
        return hApp.id === this.$route.params.hAppId
      })
      console.log(filtered[0].name)
      return filtered[0]
    }
  }
}
</script>
