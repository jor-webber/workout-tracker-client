<template>
  <div class="card">
    <client-only>
      <bar-chart
        :chart-options="chartOptions"
        dataset-id-key="label"
        :chart-data="chartData"
        chart-id="barChart"
        :height="800"
      ></bar-chart>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      muscleGroups: [],
      muscleGroupsVolume: [],
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  async mounted() {
    const { id } = this.$route.params
    try {
      const result = await this.$axios.get(`/workouts/${id}`)
      const { muscleGroupInfo } = result.data
      for (let i = 0; i < muscleGroupInfo.length; i++) {
        this.muscleGroups.push(muscleGroupInfo[i].name)
        this.muscleGroupsVolume.push(
          muscleGroupInfo[i].total_muscle_group_volume
        )
      }

      this.chartData.labels = this.muscleGroups
      this.chartData.datasets.push({
        label: 'Volume',
        data: this.muscleGroupsVolume,
        backgroundColor: 'rgba(173, 124, 220, 1)',
        borderColor: 'rgba(173, 124, 220, 1)',
      })
    } catch {
      this.$buefy.snackbar.open({
        message: 'Unable to obtain muscle group information',
        type: 'is-danger',
        position: 'bottom',
      })
    }
  },
}
</script>

<style scoped></style>
