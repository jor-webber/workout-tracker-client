<template>
  <section>
    <div class="forgot-password-container forgot-password-background">
      <div class="forgot-password-card">
        <forgot-password-card></forgot-password-card>
      </div>
    </div>
  </section>
</template>

<script>
import ForgotPasswordCard from '../components/ForgotPasswordCard.vue'
export default {
  components: { ForgotPasswordCard },
  name: 'ForgotPassword',
  layout: 'landing',
}
</script>

<style scoped>
.forgot-password-background {
  background: #373b44;
  background: -webkit-linear-gradient(to right, #373b44, #4286f4);
  background: linear-gradient(to right, #373b44, #4286f4);
}
html 
body {
  height: 100%;
}
.forgot-password-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.forgot-password-card {
  width: 33%;
}

@media screen and (max-width: 768px) {
  .forgot-password-card {
    width: 100%;
  }
  .container.is-fluid {
    padding: 0;
  }
}
</style>
