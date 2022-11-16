<template>
  <div>
    <div class="container" v-if="isOwner">
      <div class="columns is-vcentered is-narrow">
        <div class="column is-one-fifth">
          <Avatar :src="`https://workout-tracker-server-4tiok.ondigitalocean.app/uploads/${profilePicture}`" :username="username" :size="100" />
          <p class="ml-5"><strong>{{username}}</strong></p>
        </div>
        <div class="column has-text-left">
          <p>{{ message }}</p>
          <span class="has-text-left">{{ new Date(timeSent).toDateString() + ' ' + new Date(timeSent).toLocaleTimeString() }}</span>
        </div>
      </div>
    </div>
    <div class="container darker" v-else>
      <div class="columns is-vcentered is-narrow">
        <div class="column has-text-right">
          <p>{{ message }}</p>
          <span class="has-text-right">{{ new Date(timeSent).toDateString() + ' ' + new Date(timeSent).toLocaleTimeString() }}</span>
        </div>
        <div class="column is-one-fifth right-align is-align-content-end is-flex">
          <div>
            <Avatar :src="`https://workout-tracker-server-4tiok.ondigitalocean.app/uploads/${profilePicture}`" :username="username" :size="100" />
            <p class="mr-4"><strong>{{username}}</strong></p>
          </div>       
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Avatar } from 'vue-avatar';

export default {
    props: {
        isOwner: Boolean,
        message: String,
        timeSent: String,
        profilePicture: String,
        username: String
    },
    components: { Avatar }
}
</script>

<style scoped>
/* Chat containers */
.container {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

/* Clear floats */
.container::after {
  content: '';
  clear: both;
  display: table;
}

/* Style images */
.container img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

/* Style the right image */
.container img.right {
  float: right;
  margin-left: 20px;
  margin-right: 0;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}

.right-align {
  text-align: right;
  align-items: right;
  justify-content: right;
  justify-items: right;
  align-self: right;
  align-content: right;
}
</style>
