<template>
  <div>
    <div class="pt-3">
      <h2 class="title is-2 has-text-centered">Add Forum Post</h2>
    </div>
    <div class="card mt-3">
      <div class="card-content">
        <form>
          <b-field
            label="Title:"
            :type="titleError ? 'is-danger' : ''"
            :message="titleError ? 'Title cannot be blank' : ''"
          >
            <b-input
              type="input"
              name="title"
              v-model="title"
              @input="titleError = false"
            ></b-input>
          </b-field>
          <b-field
            label="Content:"
            :type="contentError ? 'is-danger' : ''"
            :message="contentError ? 'Content cannot be blank' : ''"
          >
            <b-input
              type="textarea"
              name="content"
              v-model="content"
              @input="contentError = false"
            ></b-input>
          </b-field>
          <div class="has-text-centered">
            <b-button type="is-primary mr-4" @click="submitPost"
              >Submit</b-button
            >
            <b-button type="is-danger" @click="$router.go(-1)">Back</b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      titleError: '',
      content: '',
      contentError: '',
    }
  },
  methods: {
    async submitPost() {
      this.titleError = !this.title ? true : false
      this.contentError = !this.content ? true : false

      if (this.titleError || this.contentError) {
        return
      }

      try {
        await this.$axios.post('/forum', {
          title: this.title,
          content: this.content,
          userId: this.$store.state.user.id
        })
        this.$router.push('/forum')
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error adding forum post',
          position: 'is-bottom',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>

<style></style>
