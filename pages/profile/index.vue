<template>
  <div class="container pt-5">
    <div class="card profile-card-width">
      <div class="avatar-container">
        <avatar
          :username="$store.state.user.username"
          :src="imageUrl"
          :size="200"
          class="mt-2"
        ></avatar>
      </div>
      <div class="card-content columns">
        <div class="column">
          <h3 class="title is-3 has-text-centered">
            {{ $store.state.user.firstName }} {{ $store.state.user.lastName }}
          </h3>
          <p class="has-text-centered">
            {{ $store.state.user.profileCaption }}
          </p>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column has-text-centered">
          <b-tooltip label="Delete" type="is-dark" class="mr-3">
            <b-button
              icon-left="delete"
              size="is-large"
              type="is-danger"
              @click="deleteUser"
            ></b-button>
          </b-tooltip>
          <b-tooltip label="Edit" type="is-dark">
            <b-button
              icon-left="pencil"
              size="is-large"
              type="is-warning"
              @click="$router.push('/edit-profile')"
            ></b-button>
          </b-tooltip>
        </div>
      </div>
    </div>
    <div class="columns mt-5">
      <div class="column">
        <div class="card">
          <workout-table></workout-table>
        </div>
      </div>

      <div class="column">
        <top-weights-card
          :user-id="$store.state.user.id"
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
      imageUrl:null
    }
  },
  methods: {
    async deleteUser() {
      const id = this.$store.state.user.id
      try {
        this.$buefy.dialog.confirm({
          message: 'Are you sure you wish to delete your account?',
          onConfirm: async () => {
            const result = await this.$axios.delete(`/users/${id}`)

            if (result.status === 204) {
              this.$buefy.snackbar.open({
                message: 'Account deleted successfully',
                type: 'is-success',
                position: 'is-bottom',
              })
              this.$store.dispatch('user/logoutUser')
              this.$cookies.removeAll()
              this.$router.push('/')
              return
            }
            this.$buefy.snackbar.open({
              message: 'Unable to account',
              type: 'is-danger',
              position: 'is-bottom',
            })
          },
        })
      } catch {
        this.$buefy.snackbar.open({
          message: 'Unable to account',
          type: 'is-danger',
          position: 'is-bottom',
        })
      }
    },
  },
  async mounted() {
    const userId = this.$store.state.user.id
    this.imageUrl = `https://workout-tracker-mohawk2.herokuapp.com/uploads/${this.$store.state.user.profilePicture}`

    try {
      const result = await this.$axios.get(`/statistics/${userId}`, {
        userId,
      })

      result.data.exercises.forEach((exercise) => {
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
    } catch (e) {
      console.log(e)
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
