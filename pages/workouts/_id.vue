<template>
  <div class="container pt-5">
    <h2 class="title is-2">{{ date }}</h2>
    <div class="columns">
      <div class="column">
        <bar-chart></bar-chart>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <add-workout-table :data="exercisesInfo" :showDelete="false"></add-workout-table>
      </div>
      <div class="column">
        <top-weights-single-workout
          :highest-weight-lifted="highestWeight.weight"
          :highest-weight-exercise="highestWeight.exercise"
          :highest-muscle-group-volume="highestMuscleGroup.total_muscle_group_volume"
          :highest-muscle-group="highestMuscleGroup.name"
          :most-reps-done="mostRepsDone.reps"
          :reps-done-exercise="mostRepsDone.exercise"
        ></top-weights-single-workout>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/workouts/BarChart.vue'
import AddWorkoutTable from '@/components/add-workout/AddWorkoutTable.vue'
import TopWeightsSingleWorkout from '~/components/workouts/TopWeightsSingleWorkout.vue'

export default {
  components: {
    BarChart,
    AddWorkoutTable,
    TopWeightsSingleWorkout
  },
  data() {
    return {
      exercisesInfo: [],
      date: null,
      highestWeight: { amount: null, exercise: null },
      highestMuscleGroup: { amount: null, name: null },
      mostRepsDone: { amount: null, name: null },
    }
  },
  async mounted() {
    const { id } = this.$route.params
    try {
      const result = await this.$axios.get(`/workouts/${id}`)
      const { exercisesInfo, muscleGroupInfo } = result.data

      this.exercisesInfo = exercisesInfo;

      this.date = new Date(muscleGroupInfo[0].start_time).toDateString()

      this.highestWeight = exercisesInfo.reduce((e1, e2) => e1.weight > e2.weight ? e1 : e2)
      this.mostRepsDone = exercisesInfo.reduce((e1, e2) => e1.reps > e2.reps ? e1 : e2)
      this.highestMuscleGroup = muscleGroupInfo.reduce((e1, e2) => e1.total_muscle_group_volume > e2.total_muscle_group_volume ? e1 : e2)
    } catch {
      this.$buefy.snackbar.open({
        message: 'Cannot retrieve workout information',
        type: 'is-danger',
        position: 'bottom',
      })
    }
  },
}
</script>
