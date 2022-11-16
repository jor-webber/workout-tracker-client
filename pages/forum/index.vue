<template>
  <div class="container pt-3">
    <div class="has-text-centered pb-3">
      <b-button type="is-primary has-text-centered" @click="$router.push('/forum/add')">Add New Post</b-button>
    </div>
    <div>
      <div v-for="forumPost in forumPosts" :key="forumPost.id" class="mt-4">
        <forum-post-preview-card
          :id="forumPost.id"
          :title="forumPost.title"
          :date-posted="forumPost.creation_time"
          :amount-of-comments="Number(forumPost.comments)"
        ></forum-post-preview-card>
      </div>
    </div>
  </div>
</template>

<script>
import ForumPostPreviewCard from '~/components/forum/ForumPostPreviewCard.vue'
export default {
  components: { ForumPostPreviewCard },
  data() {
    return {
      forumPosts: []
    }
  },
  async mounted() {
    const result = await this.$axios.get('/forum')

    console.log(result.data)
    
    const { forumPosts } = result.data;

    console.log(forumPosts)

    this.forumPosts = forumPosts;
  }
}
</script>

<style>
</style>