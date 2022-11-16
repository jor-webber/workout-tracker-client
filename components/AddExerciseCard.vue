<template>
  <div class="card">
    <div class="card-header-title title is-4">Add Exercise</div>
    <div class="card-content">
      <div class="content">
        <div class="columns">
          <div class="column">
            <b-field label="Exercise Name">
              <b-input v-model="exerciseName" maxlength="100"></b-input>
            </b-field>
            <b-field label="Description">
              <b-input type="textarea" v-model="description" maxlength="200"></b-input>
            </b-field>
          </div>
          <div class="column">
            <multiselect
              class="top-margin mb-2"
              v-model="selectedMuscleGroups"
              label="name"
              track-by="name"
              :options="muscleGroups"
              :multiple="true"
              :taggable="true"
              :clear-on-select="false"
              :close-on-select="false"
            >
              <template slot="selection" slot-scope="{ values, isOpen }"
                ><span
                  class="multiselect__single"
                  v-if="values.length && !isOpen"
                  >{{ values.length }} options selected</span
                >
              </template>
            </multiselect>
            <b-field label="Selected Muscle Groups">
              <b-input
                type="textarea"
                v-model="selectedMuscleGroupsNames"
                disabled
              ></b-input>
            </b-field>
          </div>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <div class="card-footer-item">
        <b-button type="is-primary" @click="addExercises">
          Add Exercise
        </b-button>
      </div>
    </footer>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  emits: ['exerciseAdded'],
  components: {
    Multiselect,
  },
  data() {
    return {
      exerciseName: '',
      description: '',
      selectedMuscleGroups: [],
      muscleGroups: [],
      currentExercises: [],
    }
  },
  async mounted() {
    const { muscleGroups } = await this.$axios.$get('/muscle-groups/')
    this.muscleGroups = muscleGroups
  },
  methods: {
    addExercises() {
      try {
        this.$axios.post('/exercises/', {
          exerciseName: this.exerciseName,
          description: this.description,
          muscleGroups: this.selectedMuscleGroups,
        })
        this.exerciseName = ''
        this.description = ''
        this.selectedMuscleGroups = []
      } catch {
        this.$buefy.snackbar.open({
          message: 'Could not add exercise',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
      this.$emit('exerciseAdded')
    },
  },
  computed: {
    selectedMuscleGroupsNames() {
      let muscleGroupsNames = ''
      this.selectedMuscleGroups.forEach((element) => {
        muscleGroupsNames += element.name + ' '
      })
      return muscleGroupsNames
    },
  },
}
</script>
