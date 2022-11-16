<template>
  <div>
    <div class="card">
      <div class="card-content has-text-centered">
        <div>
          <strong>{{ title }}</strong>
        </div>
        <div>
          <strong>Date Posted: {{ new Date(datePosted).toDateString() }}</strong>
        </div>
        <div>
          <strong>{{amountOfComments}} Comments</strong>
        </div>
        <div class="mt-3">
          <b-button type="is-link" class="mr-4" @click="$router.push(`/forum/${id}`)">View</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
    datePosted: String,
    amountOfComments: Number,
  },
}
</script>

<style>

</style>