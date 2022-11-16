<template>
  <div class="card">
    <div class="container is-fluid">
      <p class="title has-text-centered black pt-4">Edit Profile</p>
      <div class="card-content">
        <div class="avatar-container">
          <Avatar
            :username="$store.state.user.username"
            :src="`https://workout-tracker-mohawk2.herokuapp.com/uploads/${imageUrl}`"
            :size="100"
            class="mt-2"
          />
        </div>
        <div>
          <b-field class="has-text-centered mt-3">
            <b-upload
              v-model="profilePicture"
              @input="onFileChange"
              name="profilePicture"
            >
              <a class="button is-primary is-fullwidth">
                <b-icon icon="upload"></b-icon>
                <span>{{ profilePicture.name || 'Click to upload' }}</span>
              </a>
            </b-upload>
          </b-field>
          <b-field
            label="Username:"
            :type="this.username ? '' : 'is-danger'"
            required
          >
            <b-input v-model="username"></b-input>
          </b-field>
          <b-field
            label="First Name:"
            :type="this.firstName ? '' : 'is-danger'"
            required
          >
            <b-input v-model="firstName"></b-input>
          </b-field>
          <b-field
            label="Last Name:"
            :type="this.lastName ? '' : 'is-danger'"
            required
          >
            <b-input v-model="lastName"></b-input>
          </b-field>
          <b-field
            label="Email:"
            :type="this.email ? '' : 'is-danger'"
            required
          >
            <b-input v-model="email" type="email"></b-input>
          </b-field>
          <b-field label="Profile Caption:">
            <b-input v-model="profileCaption"></b-input>
          </b-field>
        </div>
        <div class="avatar-container mt-3">
          <b-button type="is-primary" @click="onSubmit">Submit</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  components: {
    Avatar,
  },
  data() {
    return {
      profilePicture: {},
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      profileCaption: '',
      imageUrl: null,
    }
  },
  methods: {
    onFileChange() {
      this.imageUrl = URL.createObjectURL(this.profilePicture)
    },
    async onSubmit() {
      const userId = this.$store.state.user.id
      let imageName;

      if (!this.username || !this.firstName || !this.lastName || !this.email) {
        this.$buefy.snackbar.open({
          message: 'Please fill in required fields',
          position: 'is-bottom',
          type: 'is-danger',
        })
      }

      if (this.profilePicture.name) {
        const formData = new FormData()
        formData.append(
          'profilePicture',
          this.profilePicture,
          this.profilePicture.name
        )

        const uploadImage = await this.$axios.post(`/auth/upload-photo/${userId}`, formData)
        imageName = uploadImage.data.profilePicture
      }

      await this.$axios.post(`/auth/update-user`, {
        id: userId,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        profileCaption: this.profileCaption,
      })

      console.log(this.profileCaption)

      this.$store.dispatch('user/updateUser', {
        id: userId,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        profileCaption: this.profileCaption,
        profilePicture: imageName
      })

      this.$buefy.snackbar.open({
        message: 'Account successfully updated',
        position: 'is-bottom',
        type: 'is-success',
      })

      this.$router.push('/profile')
    },
  },
  mounted() {
    this.imageUrl = this.profileImage?.imageUrl
      ? this.profileImage?.imageUrl
      : ''
    this.username = this.$store.state.user.username
    this.firstName = this.$store.state.user.firstName
    this.lastName = this.$store.state.user.lastName
    this.email = this.$store.state.user.email
    this.profileCaption = this.$store.state.user.profileCaption
  },
}
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
}
</style>
