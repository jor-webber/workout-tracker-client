<template>
  <div class="container pt-5">
    <h2 class="title is-2 has-text-centered">Add Workout</h2>
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
                  @input="() => startTimeError = false"
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
                  @input="() => endTimeError = false"
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
        <add-workout-table :data="submittedExercises" :showDelete="true"></add-workout-table>
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
      title: '',
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
      if(this.submittedExercises.length < 1) {
        this.$buefy.dialog.alert({
          title: 'ERROR',
          message: 'Please add at least one exercise before submitting'
        });
        return;
      }

      this.startTimeError = !this.startTime ? true : false
      this.endTimeError = !this.endTime ? true : false

      if (this.startTimeError || this.endTimeError) {
        return
      }

      if(this.startTime > this.endTime) {
        this.$buefy.snackbar.open({
          message: 'End time cannot be before start time',
          type: 'is-danger',
          position: 'is-bottom',
        })

        return;
      }

      const result = await this.$axios.post('/workouts/', {
        userId: this.$store.state.user.id,
        title: this.title,
        startTime: this.startTime.toString(),
        endTime: this.endTime.toString(),
        submittedExercises: this.submittedExercises,
      })

      if (result.status === 204) {
        this.$buefy.snackbar.open({
          message: 'Workout has been successfully added!',
          type: 'is-success',
          position: 'is-bottom',
        })

        this.$router.push('/dashboard')
      }
    },
  },
  async mounted() {
    const response = await this.$axios.get('/exercises')
    if (response.data.exercises) this.exercises = response.data.exercises
  },
}
</script>

<style>
</style>