<template>
  <div class="container">
    <h3 class="title is-3">{{ receivingUsername }}</h3>
    <div class="chat-height">
      <chat-message
        v-for="message in messages"
        :key="message.id"
        :username="
          message.sender_user_id === $store.state.user.id
            ? $store.state.user.username
            : receivingUsername
        "
        :is-owner="
          message.sender_user_id === $store.state.user.id ? true : false
        "
        :profile-picture="
          message.sender_user_id === $store.state.user.id
            ? $store.state.user.profilePicture
            : profilePicture
        "
        :message="message.message"
        :time-sent="message.creation_time"
      ></chat-message>
    </div>
    <div>
      <div class="main-div">
        <b-field>
          <b-input type="text" v-model="messageText" expanded />
          <b-button @click="sendMessage">Submit</b-button>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMessage from '@/components/messages/ChatMessage.vue'
export default {
  components: {
    ChatMessage,
  },
  data() {
    return {
      socket: null,
      otherUser: null,
      receivingUsername: '',
      messageText: '',
      profilePicture: '',
      messages: [],
    }
  },
  async mounted() {
    const { id } = this.$route.params

    const result = await this.$axios.get(`/users/${id}`)
    const messagesResult = await this.$axios.post(`/messages/from-users`, {
      currentUser: this.$store.state.user.id,
      otherUser: id,
    })

    const { messages } = messagesResult.data

    messages.forEach(message => {
      if (
        (message.sender_user_id === this.$store.state.user.id && message.receiving_user_id === id) ||
        (message.sender_user_id === id && message.receiving_user_id === this.$store.state.user.id)
      ) {
        this.messages.push(message)
      }
    })

    const { user } = result.data
    this.receivingUsername = user.username
    this.profilePicture = user.profile_picture
    this.socket = this.$nuxtSocket({
      name: 'home',
    })

    this.socket.on('messageSent', (data) => {
      if (
        data.sender_user_id === this.$store.state.user.id || data.receiving_user_id === this.$store.state.user.id
      ) {
        this.messages.push(data)
      }
    })
  },
  methods: {
    async sendMessage() {
      const { id: recievingId } = this.$route.params
      if(!this.messageText) {
        return;
      }
      try {
        this.socket.emit('sendMessage', {
          message: this.messageText,
          recievingId,
          senderId: this.$store.state.user.id,
        })
        this.messageText = ''
      } catch {
        this.$buefy.snackbar.open({
          message: 'unable to send message',
          position: 'is-bottom',
          type: 'is-danger',
        })
      }
    },
  },
}
</script>

<style scoped>
.chat-height {
  overflow: auto;
  position: relative;
  width: 100%;
  max-height: 90vh;
  background-color: white;
  bottom: 0;
}
.main-div {
  text-align: center;
  position: fixed;
  bottom: 20px;
  right: 50px;
  left: 50px;
}
</style>
