<template>
  <div class="container">
    <message-card
      v-for="user in users"
      :key="user.id"
      :profile-picture="user.profile_picture"
      :username="user.username"
      :id="user.id"
      :is-owner="true"
    ></message-card>
  </div>
</template>

<script>
import MessageCard from '~/components/messages/MessageCard.vue'
export default {
  components: { MessageCard },
  data() {
    return {
      users: []
    }
  },
  async mounted() {
    const result = await this.$axios.get('/users')

    let { users } = result.data;

    users.forEach ((element, index) => {
      if(element.id === this.$store.state.user.id) {
        users.splice(index, 1)
      }
    })

    this.users = users
  }

}
</script>

<style>

</style>