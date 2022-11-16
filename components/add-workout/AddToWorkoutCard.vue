<template>
  <div class="card mt-4">
    <div class="card-content">
      <div class="columns is-centered">
        <div class="column is-half">
          <b-field
            label="Exercise:"
            :type="exerciseError ? 'is-danger' : ''"
            :message="exerciseError ? 'Please select an exercise' : ''"
          >
            <b-select
              placeholder="Select an exercise"
              v-model="exercise"
              expanded
              @input="() => exerciseError = false"
            >
              <option
                v-for="exercise in exercises"
                :value="exercise"
                :key="exercise.id"
              >
                {{ exercise.name }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field
            label="Sets:"
            :type="setsError ? 'is-danger' : ''"
            :message="
              setsError ? 'Please enter an amount of sets 1 or greater' : ''
            "
          >
            <b-input type="number" min="1" v-model.number="sets" @input="() => setsError = false"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field
            label="Reps:"
            :type="repsError ? 'is-danger' : ''"
            :message="
              repsError ? 'Please enter an amount of reps 1 or greater' : ''
            "
          >
            <b-input type="number" min="1" v-model.number="reps" @input="() => repsError = false"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field
            label="Weight:"
            :type="weightError ? 'is-danger' : ''"
            :message="
              weightError ? 'Please enter an amount of weight 1 or greater' : ''
            "
          >
            <b-input type="number" min="1" v-model.number="weight" @input="() => weightError = false"></b-input>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column has-text-centered">
          <b-button type="is-success" @click="addExercise"
            >Add to Workout</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  emits: ['addExercise'],
  data() {
    return {
      exercise: null,
      exerciseError: false,
      sets: null,
      setsError: false,
      reps: null,
      repsError: false,
      weight: null,
      weightError: false,
      exercises: [],
    }
  },
  methods: {
    addExercise() {

      this.exerciseError = !this.exercise ? true : false
      this.setsError = !this.sets ? true : false
      this.repsError = !this.reps ? true : false
      this.weightError = !this.weight ? true : false

      if (
        this.exerciseError ||
        this.setsError ||
        this.repsError ||
        this.weightError
      ) {
        return
      }

      

      this.$emit('addExercise', {
        rowId: uuidv4(),
        id: this.exercise.id,
        exercise: this.exercise.name,
        sets: this.sets,
        reps: this.reps,
        weight: this.weight,
      })

      this.exercise = null
      this.sets = null
      this.reps = null
      this.weight = null
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