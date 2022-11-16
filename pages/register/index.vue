<template>
  <section>
    <div class="register-container register-background">
      <div class="register-card">
        <register-card></register-card>
      </div>
    </div>
  </section>
</template>

<script>
import RegisterCard from '../../components/RegisterCard.vue'
export default {
  components: { RegisterCard },
  name: 'IndexPage',
  layout: 'landing'

}
</script>

<style scoped>
.register-background {
  background: #373b44;
  background: -webkit-linear-gradient(to right, #373b44, #4286f4);
  background: linear-gradient(to right, #373b44, #4286f4);
}
html 
body {
  height: 100%;
}
.register-container {
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
.register-card {
  width: 33%;
}

@media screen and (max-width: 768px) {
  .register-card {
    width: 100%;
  }
}
</style>