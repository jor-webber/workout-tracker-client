<template>
  <div class="container pt-5">
    <forum-post-card
      :title="title"
      :content="content"
      :is-owner="isOwner"
      @deletePost="deletePost"
      :username="username"
      :user-id="userId"
    ></forum-post-card>
    <div class="has-text-centered pt-5 pb-5">
      <b-button type="is-primary" @click="commentClicked">Comment</b-button>
    </div>
    <div :hidden="!showCommentCard">
      <forum-post-comment-card
        :add-comment-to-post="addCommentToPost"
      ></forum-post-comment-card>
    </div>
    <div class="chat-height">
      <div v-for="comment in comments" :key="comment.id" class="mt-5">
        <comment-card
          :comment="comment.content"
          :profile-picture="comment.profile_picture"
          :username="comment.username"
          :user-id="comment.user_id"
          :creation-time="comment.creation_time"
        ></comment-card>
      </div>
    </div>
  </div>
</template>

<script>
import ForumPostCard from '~/components/forum/ForumPostCard.vue'
import ForumPostCommentCard from '~/components/forum/ForumPostCommentCard.vue'
import CommentCard from '~/components/forum/CommentCard.vue'

export default {
  components: { ForumPostCard, ForumPostCommentCard, CommentCard },
  data() {
    return {
      title: '',
      content: '',
      isOwner: false,
      username: '',
      comments: [],
      userId: null,
      showCommentCard: false,
    }
  },
  async mounted() {
    const { id } = this.$route.params
    const result = await this.$axios.get(`/forum/${id}`)
    const commentResults = await this.$axios.get(`/forum/comments/${id}`)

    const { forumPost } = result.data
    const { comments } = commentResults.data

    this.comments = comments

    this.title = forumPost.title
    this.username = forumPost.username
    this.content = forumPost.content
    this.userId = forumPost.user_id;
    this.isOwner = this.userId === this.$store.state.user.id ? true : false

  },
  methods: {
    commentClicked() {
      this.showCommentCard = !this.showCommentCard
    },
    async addCommentToPost(content) {
      const { id } = this.$route.params
      try {
        await this.$axios.post('/forum/add-comment', {
          content,
          userId: this.$store.state.user.id,
          postId: id,
        })

        this.$buefy.snackbar.open({
          message: 'Comment added successfully',
          position: 'is-bottom',
          type: 'is-success',
        })

        this.showCommentCard = false
        this.getComments()
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error adding comment',
          position: 'is-bottom',
          type: 'is-danger',
        })
      }
    },
    async deletePost() {
      const { id } = this.$route.params

      try {
        await this.$axios.delete(`/forum/${id}`)
        this.$router.push('/forum')
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error deleting post',
          position: 'is-bottom',
          type: 'is-danger',
        })
      }
    },
    async getComments() {
      const { id } = this.$route.params
      const commentResults = await this.$axios.get(`/forum/comments/${id}`)
      const { comments } = commentResults.data

      this.comments = comments
    },
  },
}
</script>

<style scoped>
.chat-height {
  overflow: auto;
  position: relative;
  width: 100%;
  max-height: 1000px;
  background-color: white;
  bottom: 0;
}
</style>
