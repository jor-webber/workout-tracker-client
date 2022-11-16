<template>
  <div class="container pt-5">
    <div class="columns">
      <div class="column">
        <volume-chart></volume-chart>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <workout-table></workout-table>
      </div>
      <div class="column">
        <top-weights-card :user-id="$store.state.user.id"></top-weights-card>
      </div>
    </div>
  </div>
</template>

<script>
import TopWeightsCard from '~/components/shared/TopWeightsCard.vue'
import VolumeChart from '~/components/dashboard/VolumeChart.vue'
import WorkoutTable from '../components/shared/WorkoutTable.vue'


export default {
  components: { WorkoutTable, VolumeChart, TopWeightsCard },
}
</script>

<style></style>
