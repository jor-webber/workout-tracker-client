<template>
  <div class="container">
    <div class="card">
      <div class="container is-fluid">
        <p class="title has-text-centered black pt-4">Register to Workout Tracker</p>
        <form>
          <b-field 
            label="First Name:" 
            class="input-width" 
            :message="{ 'First name cannot be empty': firstNameError }" 
            :type="{ 'is-danger': firstNameError }"
          >
            <b-input v-model="firstName"></b-input>
          </b-field>
          <b-field 
            label="Last Name:" 
            class="input-width" 
            :message="{ 'Last name cannot be empty': lastNameError }" 
            :type="{ 'is-danger': lastNameError }"
          >
            <b-input v-model="lastName"></b-input>
          </b-field>
          <b-field 
            label="Username:" 
            class="input-width" 
            :message="{ 'Username cannot be empty': usernameError }" 
            :type="{ 'is-danger': usernameError }"
          >
            <b-input v-model="username"></b-input>
          </b-field>
          <b-field 
            label="Email:" 
            class="input-width" 
            :message="{ 'Email cannot be empty and must be a proper email': emailError }" 
            :type="{ 'is-danger': emailError }"
          >
            <b-input v-model="email"></b-input>
          </b-field>
          <b-field 
            label="Password:" 
            class="input-width"
            :message="{ 'Password cannot be empty and must be a minimum of 6 characters': passwordError }" 
            :type="{ 'is-danger': passwordError }"
          >
            <b-input
              v-model="password"
              type="password"
              password-reveal
            ></b-input>
          </b-field>
          <b-field 
            label="Confirm Password:" 
            class="input-width"
            :message="{ 'Confirm Password cannot be empty and must match password': confirmPasswordError }" 
            :type="{ 'is-danger': confirmPasswordError }"
          >
            <b-input
              v-model="confirmPassword"
              type="password"
              password-reveal
            ></b-input>
          </b-field>
          <div class="has-text-centered">
            <b-button type="is-primary mb-5 mr-5" @click="registerUser">Register</b-button>
            <b-button type="is-danger mb-5" @click="$router.push('/')">Back</b-button>
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
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstNameError: false,
      lastNameError: false,
      usernameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false
    }
  },
  methods: {
    async registerUser() {
      if (!this.firstName) {
        this.firstNameError = true;
      }
      if (!this.lastName) {
        this.lastNameError = true;
      }
      if(!this.username) {
        this.usernameError = true;
      }
      if(!this.email) {
        this.emailError = true;
      }
      if(!this.password) {
        this.passwordError = true;
      }
      if(!this.confirmPassword) {
        this.confirmPasswordError = true;
      }

      if(this.firstNameError || this.lastNameError || this.usernameError || this.emailError || this.passwordError || this.confirmPasswordError) {
        return;
      }

      try {
        await this.$axios.post('/auth/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password
        })

        this.$buefy.snackbar.open({
          message: 'Registered! Please login with given email and password',
          position: 'is-bottom',
          type: 'is-success'
        })

        this.$router.push('/')
      } catch (err) {
        this.$buefy.snackbar.open({
          message: 'Error during registration',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }

    }
  }
}
</script>

<style scoped>
.input-width {
  max-width: 88%;
  margin: auto;
}
</style>
