<template>
  <div class="card">
    <div class="card-content">
      <div>
        <h3 class="title is-3 has-text-centered">{{ title }}</h3>
      </div>
      <div>
        <p class="has-text-centered mt-4">{{ content }}</p>
      </div>
      <div>
        <p class="has-text-centered mt-3"><strong>Created by:</strong> <nuxt-link :to="`/profile/${userId}`">{{ username }}</nuxt-link></p>
      </div>
      <div :hidden="!isOwner" class="has-text-centered mt-5">
        <b-button
          :hidden="true"
          type="is-danger"
          icon-left="delete"
          @click="() => $emit('deletePost')"
        >Delete Post</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['deletePost'],
  props: {
    title: String,
    content: String,
    isOwner: Boolean,
    username: String,
    userId: String
  },
}
</script>

<style scoped></style>
