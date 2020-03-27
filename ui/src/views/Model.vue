<template>
  <zome-editor :hApp="hApps[0]" />
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Model',
  components: {
    ZomeEditor: () => import('../components/ZomeEditor')
  },
  computed: {
    ...mapState('app', ['hApps'])
  }
}
</script>
