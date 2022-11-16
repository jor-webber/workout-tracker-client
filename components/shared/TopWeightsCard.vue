<template>
  <div class="card p-5">
    <b-field>
      <b-tag type="is-success" size="is-large" class="tag-width"
        >Highest Squat: {{ highestSquat }}</b-tag
      >
    </b-field>
    <b-field>
      <b-tag type="is-success" size="is-large" class="tag-width"
        >Highest Bench Press: {{ highestBenchPress }}</b-tag
      >
    </b-field>
    <b-field>
      <b-tag type="is-success" size="is-large" class="tag-width"
        >Highest Deadlift: {{ highestDeadlift }}</b-tag
      >
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    userId: String,
  },
  data() {
    return {
      highestSquat: 0,
      highestBenchPress: 0,
      highestDeadlift: 0, 
    }
  },
  async mounted() {
    console.log("USERID")
    console.log(this.userId) 
    try {
      const result = await this.$axios.get(`/statistics/${this.userId}`)

      console.log(result.data)

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

<style scoped>
.tag-width {
  width: 100%;
}
</style>
