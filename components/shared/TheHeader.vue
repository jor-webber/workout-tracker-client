<template>
  <b-navbar type="is-dark">
    <template #brand>
      <b-navbar-item tag="div">
        <h2>Workout Tracker</h2>
      </b-navbar-item>
      <b-navbar-item tag="div">
        Welcome, {{ $store.state.user.username }}
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="nuxt-link" to="/dashboard">
        Dashboard
      </b-navbar-item>
      <b-navbar-item v-if="$store.state.user.role === 'Admin'" tag="nuxt-link" to="/add-exercise">
        Add Exercises
      </b-navbar-item>
      <b-navbar-item tag="nuxt-link" to="/add-workout">
        Add Workout
      </b-navbar-item>
      <b-navbar-item href="#" tag="nuxt-link" to="/forum">
        Forums
      </b-navbar-item>
      <b-navbar-item href="#" tag="nuxt-link" to="/messages">
        Messages
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="nuxt-link" to="/profile">
        Profile
      </b-navbar-item>
      <b-navbar-item tag="div" href="#">
        <b-button type="is-danger" outlined @click="logout">
          Logout
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('user/logoutUser')
      this.$cookies.removeAll();
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>