<template>
  <div>
    <TheHeader />
    <div class="background-color">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/shared/TheHeader.vue'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
  },
}
</script>

<style>
.background-color {
  background: #ddd;
  height: 100vh;
}
* {
  margin: 0;
  padding: 0;
}
</style>
