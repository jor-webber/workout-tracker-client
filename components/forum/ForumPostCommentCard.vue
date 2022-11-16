<template>
  <div class="card">
    <div class="card-content">
      <b-field label="Comment:" >
        <b-input type="textarea" v-model="comment"></b-input>
      </b-field>
      <div class="has-text-centered">
        <b-button type="is-success" @click="postComment">Post Comment</b-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  emits: ['addComment'],
  props: {
    addCommentToPost: Function,
  },
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    postComment() {
      if(!this.comment) return;
      this.addCommentToPost(this.comment);
      this.comment = ''
    }
  }
}
</script>

<style scoped></style>
