<template>
  <v-progress-circular :color="friend.online ? 'green' : 'red'" size="48" :value="friend.value" :rotate="friend.start">
    <v-badge overlap :content="friend.notifications" :value="friend.notifications" color="green" offset-x="23" offset-y="23">
        <v-list-item-avatar v-if="friend.info">
          <v-img :src="require(`@/assets/${friend.info.avatar}`)" />
        </v-list-item-avatar>
    </v-badge>
  </v-progress-circular>
</template>

<script>
export default {
  data: () => ({
    rating: 0
  })
}
</script>
