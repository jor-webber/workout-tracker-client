<template>
  <div class="container">
    <div class="card">
      <div class="container is-fluid">
        <p class="title has-text-centered black pt-4">
          Welcome to Workout Tracker
        </p>
        <form>
          <b-field label="Email:" class="input-width">
            <b-input v-model="email"></b-input>
          </b-field>
          <b-field label="Password:" class="input-width">
            <b-input
              v-model="password"
              type="password"
              password-reveal
            ></b-input>
          </b-field>
          <div class="input-width">
            <nuxt-link to="/forgot-password">Forgot password?</nuxt-link>
          </div>
          <div class="has-text-centered mt-3">
            <b-button type="is-primary mb-5 mr-5" @click="login"
              >Login</b-button
            >
            <nuxt-link to="/register">
              <b-button type="is-success mb-5">Register</b-button>
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'webber5@email.com',
      password: 'password!!',
    }
  },
  methods: {
    async login() {
      if (!this.email) {
        return
      }
      if (!this.password) {
        return
      }

      try {
        const result = await this.$axios.$post('/auth/login', {
          email: this.email,
          password: this.password,
        })

        this.$store.dispatch('user/loginUser', result.data)
        this.$router.push('/dashboard')
      } catch {
        this.$buefy.snackbar.open({
          message: 'Incorrect username or password',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
  },
}
</script>

<style scoped>
.input-width {
  max-width: 88%;
  margin: auto;
}
</style>
