<template>
  <div class="container pt-5">
    <div class="card profile-card-width">
      <div class="avatar-container">
        <avatar
          :username="username"
          :src="`https://workout-tracker-server-4tiok.ondigitalocean.app/uploads/${profilePicture}`"
          :size="200"
          class="mt-2"
        ></avatar>
      </div>
      <div class="card-content columns">
        <div class="column">
          <h3 class="title is-3 has-text-centered">
            {{ firstName }} {{ lastName }}
          </h3>
          <p class="has-text-centered">
            {{ profileCaption }}
          </p>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column has-text-centered">
          <b-tooltip label="Message" type="is-dark" class="mr-3">
            <b-button
              icon-left="message"
              size="is-large"
              type="is-info"
              @click="$router.push(`/messages/${$route.params.id}`)"
            ></b-button>
          </b-tooltip>
        </div>
      </div>
    </div>
    <div class="columns mt-5">
      <div class="column">
        <top-weights-card
          :user-id="$route.params.id"
        ></top-weights-card>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
import WorkoutTable from '@/components/shared/WorkoutTable'
import TopWeightsCard from '~/components/shared/TopWeightsCard.vue'

export default {
  components: {
    Avatar,
    WorkoutTable,
    TopWeightsCard,
  },
  data() {
    return {
      highestSquat: 0,
      highestBenchPress: 0,
      highestDeadlift: 0,
      username: '',
      profileCaption: '',
      profilePicture: '',
      firstName: '',
      lastName: '',
    }
  },
  async mounted() {
    const { id } = this.$route.params

    if (id === this.$store.state.user.id) {
      this.$router.push('/profile')
      return
    }

    try {
      const result = await this.$axios.get(`/users/${id}`)
      const statsResult = await this.$axios.get(`/statistics/${id}`)

      const { user } = result.data

      this.username = user.username
      this.firstName = user.first_name
      this.lastName = user.last_name
      this.profileCaption = user.profile_caption
      this.profilePicture = user.profile_picture


      statsResult.data.exercises.forEach((exercise) => {
        if (exercise.name === 'Squat') {
          this.highestSquat = exercise.max
        }
        if (exercise.name === 'Bench Press') {
          this.highestBenchPress = exercise.max
        }
        if (exercise.name === 'Deadlift') {
          this.highestDeadlift = exercise.max
        }
      })
    } catch {
      this.$router.go(-1)
      this.$buefy.snackbar.open({
        message: 'Unable to obtain user data',
        position: 'is-bottom',
        type: 'is-danger',
      })
    }
  },
}
</script>

<style>
.avatar-container {
  display: flex;
  justify-content: center;
}
.profile-card-width {
  width: 60%;
  margin: auto;
}
</style>
