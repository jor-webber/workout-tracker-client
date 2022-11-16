<template>
  <div class="card">
    <div class="card-content">
      <line-chart
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :height="700"
      ></line-chart>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartData: {
        labels: null,
        datasets: [],
      },
      chartId: 'test-1',
    }
  },
  async mounted() {
    const userId = this.$store.state.user.id
    try {
      const result = await this.$axios.get(`/statistics/daily-volume/${userId}`)
      const { workouts } = result.data
      const labels = []
      const data = []

      workouts.forEach((workout) => {
        labels.push(new Date(workout.start_time).toDateString())
        data.push(workout.total_volume)
      })

      this.chartData.labels = labels
      this.chartData.datasets.push({
        label: 'Total Volume',
        backgroundColor: 'purple',
        borderColor: 'purple',
        data: data,
      })
    } catch {
      this.$buefy.snackbar.open({
        message: 'Error retrieving workout data',
        type: 'is-danger',
        position: 'is-bottom',
      })
    }
  },
}
</script>

<style>
.chart {
  max-height: 600px;
}
</style>
