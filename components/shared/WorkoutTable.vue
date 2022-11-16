<template>
  <div class="card">
    <div class="card-content">
      <b-table
        :data="data"
        :paginated="true"
        :per-page="5"
        :current-page="1"
        :pagination-simple="false"
        pagination-position="bottom"
        :pagination-rounded="true"
      >
        <b-table-column
          field="id"
          label="ID"
          width="40"
          :visible="false"
          v-slot="props"
        >
          {{ props.row.id }}
        </b-table-column>
        <b-table-column
          field="date"
          label="Date"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.date }}
        </b-table-column>
        <b-table-column
          field="startTime"
          label="Start Time"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.startTime }}
        </b-table-column>
        <b-table-column
          field="endTime"
          label="End Time"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.endTime }}
        </b-table-column>
        <b-table-column field="actions" sortable centered v-slot="props">
          <b-tooltip label="View">
            <b-button
              type="is-primary"
              icon-left="eye"
              @click="() => viewWorkout(props.row.id)"
            ></b-button>
          </b-tooltip>
          <b-tooltip label="Edit">
            <b-button
              type="is-warning"
              icon-left="pencil"
              @click="() => editWorkout(props.row.id)"
            ></b-button>
          </b-tooltip>
          <b-tooltip label="Delete">
            <b-button
              type="is-danger"
              icon-left="delete"
              @click="() => deleteWorkout(props.row.id)"
            ></b-button>
          </b-tooltip>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
    }
  },
  methods: {
    viewWorkout(id) {
      this.$router.push(`/workouts/${id}`)
    },
    editWorkout(id) {
      this.$router.push(`/edit-workout/${id}`)
    },
    async deleteWorkout(id) {
      try {
        this.$buefy.dialog.confirm({
          message: 'Are you sure you wish to delete?',
          onConfirm: async () => {
            const result = await this.$axios.delete(`/workouts/${id}`)

            if (result.status === 204) {
              this.$buefy.snackbar.open({
                message: 'Workout deleted successfully',
                type: 'is-success',
                position: 'is-bottom',
              })
            }
            const index = this.data.findIndex((item) => item.id === id)
            this.data.splice(index, 1)
         },
        }) 
      } catch {
        this.$buefy.snackbar.open({
          message: 'Unable to delete workout',
          type: 'is-danger',
          position: 'is-bottom',
        })
      }
    },
  },
  async mounted() {
    try {
      const userId = this.$store.state.user.id
      const result = await this.$axios.get(`/workouts/user/${userId}`)

      const { workouts } = result.data

      const userWorkouts = workouts.map((workout) => {
        return {
          id: workout.id,
          userId: workout.user_id,
          date: new Date(workout.start_time).toDateString(),
          startTime: new Date(workout.start_time).toLocaleTimeString(),
          endTime: new Date(workout.end_time).toLocaleTimeString(),
        }
      })

      this.data = userWorkouts
    } catch {}
  },
}
</script>

<style></style>
