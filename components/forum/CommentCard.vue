<template>
  <div class="card">
    <div class="card-content columns is-vcentered is-centered">
      <div class="column is-one-fifth avatar-container">
        <Avatar
            :username="username"
            :src="`https://workout-tracker-server-4tiok.ondigitalocean.app/uploads/${profilePicture}`"
            :size="100"
          />
      </div>
      <div class="column">
        <p>{{ comment }}</p>
        <p><strong>Created at:</strong> {{ new Date(creationTime).toDateString() }} by <nuxt-link :to="`/profile/${userId}`">{{ username }}</nuxt-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  components: {
    Avatar
  },
  props: {
    username: String,
    profilePicture: String,
    comment: String,
    userId: String,
    creationTime: String
  },
}
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
}
.card {
  max-width: 98%;
  margin-left: 10px;
}
</style>
