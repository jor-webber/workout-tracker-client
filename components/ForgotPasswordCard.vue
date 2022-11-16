<template>
  <div class="container">
    <div class="card">
      <div class="container is-fluid">
        <p class="title has-text-centered black pt-4">Forgot Password</p>
        <form>
          <b-field label="Email:" class="input-width">
            <b-input v-model="email"></b-input>
          </b-field>
          <b-field label="Confirm Email:" class="input-width">
            <b-input v-model="confirmEmail"></b-input>
          </b-field>
          <b-message v-if="errorActive" type="is-danger" class="error-message">
            {{ errorMessage }}
          </b-message>
          <div class="has-text-centered mt-3">
            <b-button type="is-primary mb-5 mr-5" @click="handleSubmit"
              >Submit</b-button
            >
            <b-button type="is-danger mb-5" @click="$router.push('/')"
              >Back</b-button
            >
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
      email: '',
      confirmEmail: '',
      errorMessage: '',
      errorActive: false,
    }
  },
  methods: {
    handleSubmit() {
      if (this.email !== this.confirmEmail) {
        this.errorMessage = 'Email must match'
        this.errorActive = true
        return
      }
      this.$axios.$post('/auth/forgot-password', {
        email: this.email,
      })
    },
  },
}
</script>

<style scoped>
.input-width {
  max-width: 88%;
  margin: auto;
}
.error-message {
  max-width: 88%;
  margin: auto;
  margin-top: 1rem;
}
</style>
