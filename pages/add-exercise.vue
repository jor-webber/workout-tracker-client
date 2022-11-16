<template>
  <div class="container pt-5">
    <add-exercise-card @exerciseAdded="updateExerciseTable"></add-exercise-card>
    <div class="columns">
      <div class="column">
        <h3 class="title is-3 has-text-centered mt-5">
          Already Existing Exercises
        </h3>
        <b-table :data="currentExercises" class="mt-5">
          <b-table-column
            field="id"
            label="ID"
            width="40"
            :visible="false"
            v-slot="props"
          >
            {{ props.row.id }}
          </b-table-column>
          <b-table-column field="name" label="Exercise" centered v-slot="props">
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            field="muscleGroups"
            label="Muscle Groups"
            sortable
            centered
            v-slot="props"
          >
            {{ props.row.muscleGroups }}
          </b-table-column>
          <b-table-column
            field="actions"
            label="Actions"
            sortable
            centered
            v-slot="props"
          >
          <b-tooltip label="Delete">
            <b-button
              type="is-danger"
              icon-left="delete"
              @click="() => deleteExercise(props.row.id)"
            ></b-button>
          </b-tooltip>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import AddExerciseCard from '~/components/AddExerciseCard'

export default {
  components: {
    AddExerciseCard,
  },
  data() {
    return {
      currentExercises: [],
      columns: [
        {
          label: 'Exercise',
          field: 'name',
          centered: true,
        },
        {
          label: 'Muscle Groups',
          field: 'muscleGroups',
          centered: true,
        },
      ],
    }
  },
  async mounted() {
    if(this.$store.state.user.role !== 'Admin') {
      this.$router.push('/dashboard')
      return;
    }
    const { exercises } = await this.$axios.$get('/exercises/')

    const { muscleGroupSubmissions } = await this.$axios.$get(
      '/muscle-groups/submissions'
    )

    console.log(muscleGroupSubmissions)

    exercises.forEach((exercise) => {
      exercise.muscleGroups = ''
      muscleGroupSubmissions.forEach((submission) => {
        if (submission.exercise_id == exercise.id) {
          if (!exercise.muscleGroups) {
            exercise.muscleGroups = submission.name + ', '
          } else {
            exercise.muscleGroups =
              exercise.muscleGroups + submission.name + ', '
          }
        }
      })
      exercise.muscleGroups = exercise.muscleGroups.slice(0, -2)
    })

    this.currentExercises = exercises
  },
  methods: {
    async updateExerciseTable() {
      const { exercises } = await this.$axios.$get('/exercises/')
      const { muscleGroupSubmissions } = await this.$axios.$get(
        '/muscle-groups/submissions'
      )
      exercises.forEach((exercise) => {
        exercise.muscleGroups = ''
        muscleGroupSubmissions.forEach((submission) => {
          if (submission.exercise_id == exercise.id) {
            if (!exercise.muscleGroups) {
              exercise.muscleGroups = submission.name + ', '
            } else {
              exercise.muscleGroups =
                exercise.muscleGroups + submission.name + ', '
            }
          }
        })
        exercise.muscleGroups = exercise.muscleGroups.slice(0, -2)
      })

      this.currentExercises = exercises
    },
    async deleteExercise(id) {
      try {
        await this.$axios.delete(`/exercises/${id}`)
        this.updateExerciseTable();
      } catch {
        this.$buefy.snackbar.open({
          message: 'Unable to delete exercise',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    }
  },
}
</script>

<style>
.top-margin {
  margin-top: 2rem;
}
</style>
