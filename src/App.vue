<template>
  <Header></Header>
  <Nav></Nav>
  <RouterView></RouterView>
</template>

<script>
import Header from './components/Header.vue';
import Nav from './components/Nav.vue';
export default {
  components: {
    Header,
    Nav
  },
  data() {
    return {
      
    }
  }
}
</script>


<style scoped>

</style>
