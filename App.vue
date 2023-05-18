<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<script>
import Header from "./src/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      
    }
  }
}
</script>


<style scoped>

</style>
