<template>
  <div class="container">
    <div class="card" v-if="tokenVerified">
      <div class="container is-fluid">
        <p class="title has-text-centered black pt-4">Reset Password</p>
        <form>
          <b-field label="New Password:" class="input-width">
            <b-input
              v-model="newPassword"
              type="password"
              password-reveal
            ></b-input>
          </b-field>
          <b-field label="Confirm New Password:" class="input-width">
            <b-input
              v-model="confirmNewPassword"
              type="password"
              password-reveal
            ></b-input>
          </b-field>
          <div class="has-text-centered mt-3">
            <b-button type="is-primary mb-5 mr-5" @click="submitNewPassword"
              >Submit</b-button
            >
          </div>
        </form>
      </div>
    </div>
    <div class="card" v-else>
      <div class="card-content">
        <b-message title="Link Expired" type="is-danger" :closable="false">
          This link has expired. Please request a new link
          <nuxt-link to="/forgot-password">here.</nuxt-link>
        </b-message>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: '',
      confirmNewPassword: '',
      tokenVerified: true,
    }
  },
  methods: {
    async submitNewPassword() {
      const { userId, token } = this.$route.query
      console.log(userId, token)
      try {
        const result = await this.$axios.post('/auth/reset-password', {
          newPassword: this.newPassword,
          confirmNewPassword: this.confirmNewPassword,
          userId,
          token,
        })

        if (result.status === 200) {
          this.$buefy.snackbar.open({
            message:
              'Password updated successfully. Please sign in with new password',
            type: 'is-success',
            position: 'is-bottom',
          })

          this.$router.push('/')
        }
      } catch (e) {
        this.$buefy.snackbar.open({
          message: 'Unable to submit new password. Please try again.',
          type: 'is-danger',
          position: 'is-bottom',
        })
      }
    },
  },
  async mounted() {
    const { token, userId } = this.$route.query

    try {
      const result = await this.$axios.post('/auth/verify-token', {
        token,
        userId,
      })

      if (!result.status === 200) {
        this.tokenVerified = false
      }
    } catch {
      this.tokenVerified  = false;
    }
  },
}
</script>

<style scoped></style>
