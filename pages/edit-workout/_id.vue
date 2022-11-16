<template>
  <div class="container pt-5">
    <div class="card">
      <div class="card-content">
        <div class="columns is-vcentered">
          <div class="column">
            <b-field
              label="Start Time:"
              :type="startTimeError ? 'is-danger' : ''"
              :message="startTimeError ? 'Please enter a start time' : ''"
            >
              <client-only>
                <b-datetimepicker
                  v-model="startTime"
                  placeholder="Click to select"
                  locale="en-CA"
                  @input="() => (startTimeError = false)"
                ></b-datetimepicker>
              </client-only>
            </b-field>
          </div>
          <div class="column">
            <b-field
              label="End Time:"
              :type="endTimeError ? 'is-danger' : ''"
              :message="endTimeError ? 'Please enter a end time' : ''"
            >
              <client-only>
                <b-datetimepicker
                  v-model="endTime"
                  placeholder="Click to select"
                  locale="en-CA"
                  @input="() => (endTimeError = false)"
                ></b-datetimepicker>
              </client-only>
            </b-field>
          </div>
        </div>
      </div>
    </div>
    <div>
      <add-to-workout-card @addExercise="addExercise"></add-to-workout-card>
    </div>
    <div class="columns is-centered pt-5">
      <div class="column">
        <add-workout-table
          :data="submittedExercises"
          :showDelete="true"
          @removeExercise="deleteExercise"
        ></add-workout-table>
      </div>
    </div>
    <div class="columns is-vcentered">
      <div class="column has-text-centered">
        <b-button @click="submitWorkout" type="is-primary"
          >Submit Workout</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import AddToWorkoutCard from '~/components/add-workout/AddToWorkoutCard.vue'
import AddWorkoutTable from '~/components/add-workout/AddWorkoutTable.vue'
export default {
  components: { AddWorkoutTable, AddToWorkoutCard },
  data() {
    return {
      startTime: null,
      startTimeError: false,
      endTime: null,
      endTimeError: false,
      submittedExercises: [],
    }
  },
  methods: {
    addExercise(payload) {
      console.log(payload)
      this.submittedExercises.push(payload)
    },
    async submitWorkout() {
      this.startTimeError = !this.startTime ? true : false
      this.endTimeError = !this.endTime ? true : false

      if (this.startTimeError || this.endTimeError) {
        return
      }

      if (this.startTime > this.endTime) {
        this.$buefy.snackbar.open({
          message: 'End time cannot be before start time',
          type: 'is-danger',
          position: 'is-bottom',
        })

        return
      }

      const workoutId = this.$route.params.id

      const result = await this.$axios.put('/workouts/', {
        workoutId: workoutId,
        userId: this.$store.state.user.id,
        startTime: this.startTime.toString(),
        endTime: this.endTime.toString(),
        submittedExercises: this.submittedExercises,
      })

      console.log(result)

      if (result.status === 204) {
        this.$buefy.snackbar.open({
          message: 'Workout has been successfully added!',
          type: 'is-success',
          position: 'is-bottom',
        })

        this.$router.push('/dashboard')
      }
    },
    async deleteExercise(submissionId) {
      if(!submissionId) {
        return;
      }
      try {
        await this.$axios.delete(`/workouts/exercise-submission/${submissionId}`)
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error deleting exercise',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
  },
  async mounted() {
    const { id } = this.$route.params
    try {
      const exercisesResponse = await this.$axios.get('/exercises')
      if (exercisesResponse.data.exercises)
        this.exercises = exercisesResponse.data.exercises

      const workoutResponse = await this.$axios.get(`/workouts/${id}`)
      const { exercisesInfo, muscleGroupInfo } = workoutResponse.data

      this.submittedExercises = exercisesInfo
      this.startTime = new Date(muscleGroupInfo[0].start_time)
      this.endTime = new Date(muscleGroupInfo[0].end_time)
    } catch {
      this.$buefy.snackbar.open({
        message: 'Error retrieving exercises',
        type: 'is-danger',
        position: 'is-bottom',
      })
    }
  },
}
</script>

<style></style>
