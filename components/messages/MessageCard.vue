<template>
  <div class="pt-5">
    <div class="card">
      <div class="card-content">
        <div class="columns is-vcentered is-narrow">
          <div class="avatar-container column has-text-centered is-one-fifth">
            <avatar
              :username="username"
              :src="`https://workout-tracker-mohawk2.herokuapp.com/uploads/${profilePicture}`"
              :size="120"
            ></avatar>
          </div>
          <div class="column">
            <div>
              <strong><nuxt-link :to="profileLink">{{ username }}</nuxt-link></strong>
            </div>
          </div>
          <div class="column is-one-fifth">
            <b-button type="is-primary mr-4" @click="$router.push(`/messages/${id}`)">View</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
  props: {
    id: String,
    username: String,
    profilePicture: String
  },
  components: {
    Avatar,
  },
  computed: {
    profileLink() {
      return `/profile/${this.id}`
    }
  },
  mounted() {
    console.log(this.profilePicture)
  }
}
</script>

<style>
</style>