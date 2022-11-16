<template>
  <div class="card p-3">
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
        field="rowId"
        label="Row Id"
        width="40"
        :visible="false"
        v-slot="props"
      >
        {{ props.row.rowId }}
      </b-table-column>
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
        field="submission_id"
        label="Submission Id"
        width="40"
        :visible="false"
        v-slot="props"
      >
        {{ props.row.submission_id }}
      </b-table-column>
      <b-table-column
        field="exercise"
        label="Exercise"
        sortable
        centered
        v-slot="props"
      >
        {{ props.row.exercise }}
      </b-table-column>
      <b-table-column
        field="sets"
        label="Sets"
        sortable
        centered
        v-slot="props"
      >
        {{ props.row.sets }}
      </b-table-column>
      <b-table-column
        field="reps"
        label="Reps"
        sortable
        centered
        v-slot="props"
      >
        {{ props.row.reps }}
      </b-table-column>
      <b-table-column
        field="weight"
        label="Weight"
        sortable
        centered
        v-slot="props"
      >
        {{ props.row.weight }}
      </b-table-column>
      <b-table-column field="actions" sortable centered v-slot="props" :visible="showDelete">
        <b-tooltip label="Delete">
          <b-button
            type="is-danger"
            icon-left="delete"
            @click="() => deleteExercise(props.row)"
          ></b-button>
        </b-tooltip>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
export default {
  emits: ['removeExercise'],
  props: {
    data: Array,
    showDelete: Boolean
  },
  methods: {
    deleteExercise(row) {
      this.$buefy.dialog.confirm({
        message: 'Are you sure you wish to delete?',
        onConfirm: () => {
          if (row.submission_id) {
            const submissionId = row.submission_id
            var index = this.data
              .map((x) => {
                return x.submissionId
              })
              .indexOf(submissionId)

            this.data.splice(index, 1)

            this.$emit('removeExercise', submissionId)
          } else {
            const { rowId } = row

            var index = this.data
              .map((x) => {
                return x.rowId
              })
              .indexOf(rowId)

            this.data.splice(index, 1)
          }
        },
      })
    },
  },
}
</script>

<style></style>
