<template>
  <div class="card p-5">
    <b-field>
      <b-tag type="is-success" size="is-large" class="tag-width"
        >Highest Weight Lifted: {{ highestWeightLifted }} on {{ highestWeightExercise }}</b-tag
      >
    </b-field>
    <b-field>
      <b-tag type="is-success" size="is-large" class="tag-width"
        >Highest Muscle Group Volume: {{ highestMuscleGroup }} at {{ highestMuscleGroupVolume }}</b-tag
      >
    </b-field>
    <b-field>
      <b-tag type="is-success" size="is-large" class="tag-width"
        >Most Reps Done: {{ mostRepsDone }} on {{ repsDoneExercise }}</b-tag
      >
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    highestWeightLifted: Number,
    highestWeightExercise: String,
    highestMuscleGroupVolume: String,
    highestMuscleGroup: String,
    mostRepsDone: Number,
    repsDoneExercise: String
  },
}
</script>

<style scoped>
.tag-width {
  width: 100%;
}
</style>