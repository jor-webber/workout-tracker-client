<template>
  <div class="container pt-5">
    <h3 class="title is-3 has-text-centered">Health Metrics</h3>
    <div class="card">
      <div class="card-content">
        <div class="columns">
          <div class="column">
            <b-field
              label="Health Metric:"
              :type="healthMetricError ? 'is-danger' : ''"
              :message="
                healthMetricError ? 'Please select a health metric' : ''
              "
            >
              <b-select
                placeholder="Select a health metric"
                v-model="selectedHealthMetric"
                expanded
              >
                <option
                  v-for="healthMetric in healthMetrics"
                  :value="healthMetric"
                  :key="healthMetric.id"
                >
                  {{ healthMetric.name }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="column">
            <b-field
              label="Value:"
              :type="healthMetricValueError ? 'is-danger' : ''"
              :message="
                healthMetricValueError ? 'Please enter a value' : ''
              "
            >
              <b-input
                type="text"
                v-model="healthMetricValue"
                maxlength="50"
                :disabled="selectedHealthMetric ? false : true"
              ></b-input>
            </b-field>
          </div>
        </div>

        <div class="has-text-centered">
          <b-button type="is-primary" @click="submitHealthMetric"
            >Submit</b-button
          >
        </div>
      </div>
    </div>
    <b-table
      :data="data"
      :paginated="true"
      :per-page="5"
      :current-page="1"
      :pagination-simple="false"
      pagination-position="bottom"
      :pagination-rounded="true"
      class="mt-3"
    >
      <b-table-column field="id" label="ID" :visible="false" v-slot="props">
        {{ props.row.id }}
      </b-table-column>
      <b-table-column field="name" label="Health Metric" v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column field="value" label="Value" v-slot="props">
        {{ props.row.value }}
      </b-table-column>
      <b-table-column
        field="creation_time"
        label="Recorded Time"
        v-slot="props"
      >
        {{
          new Date(props.row.creation_time).toDateString() +
          ' ' +
          new Date(props.row.creation_time).toLocaleTimeString()
        }}
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
            @click="() => deleteHealthMetric(props.row.id)"
          ></b-button>
        </b-tooltip>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      healthMetrics: [],
      selectedHealthMetric: null,
      healthMetricError: false,
      healthMetricValue: '',
      healthMetricValueError: false,
      data: [],
    }
  },
  async mounted() {
    try {
      const typesResult = await this.$axios.get(
        `/statistics/health-metric-types/`
      )
      const healthMetricsResult = await this.$axios.get(
        `/statistics/health-metrics/${this.$store.state.user.id}`
      )

      const { healthMetricTypes } = typesResult.data
      const { healthMetrics } = healthMetricsResult.data

      this.healthMetrics = healthMetricTypes
      this.data = healthMetrics
    } catch {
      this.$buefy.snackbar.open({
        message: 'Error retrieving health metrics data',
        position: 'is-bottom',
        type: 'is-danger',
      })
    }
  },
  methods: {
    async submitHealthMetric() {
      this.healthMetricError = !this.selectedHealthMetric ? true : false
      this.healthMetricValueError = !this.healthMetricValue ? true : false

      if (this.healthMetricError || this.healthMetricValueError) {
        return
      }

      try {
        await this.$axios.post('statistics/health-metrics', {
          userId: this.$store.state.user.id,
          typeId: this.selectedHealthMetric.id,
          value: this.healthMetricValue,
        })
        this.healthMetricValue = ''
        this.selectedHealthMetric = null

        const healthMetricsResult = await this.$axios.get(
          `/statistics/health-metrics/${this.$store.state.user.id}`
        )

        const { healthMetrics } = healthMetricsResult.data
        this.data = healthMetrics
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error submitting health metric',
          position: 'is-bottom',
          type: 'is-danger',
        })
      }
    },
    async deleteHealthMetric(id) {
      try {
        await this.$axios.delete(`statistics/health-metrics/${id}`)

        const healthMetricsResult = await this.$axios.get(
          `/statistics/health-metrics/${this.$store.state.user.id}`
        )

        const { healthMetrics } = healthMetricsResult.data
        this.data = healthMetrics
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error deleting health metric',
          position: 'is-bottom',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>

<style scoped></style>
