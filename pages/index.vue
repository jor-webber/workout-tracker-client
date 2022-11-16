<template>
  <section>
    <div class="login-container login-background">
      <div class="login-card">
        <login-card></login-card>
      </div>
    </div>
  </section>
</template>

<script>
import LoginCard from '~/components/LoginCard.vue'
export default {
  components: { LoginCard },
  name: 'IndexPage',
  layout: 'landing'
}
</script>

<style scoped>
.login-background {
  background: #373b44;
  background: -webkit-linear-gradient(to right, #373b44, #4286f4);
  background: linear-gradient(to right, #373b44, #4286f4);
}
html 
body {
  height: 100%;
}
.login-container {
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  width: 33%;
}

@media screen and (max-width: 768px) {
  .login-card {
    width: 100%;
  }
}
</style>
