<template>
    <nav>
      <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
      <router-link to="/resto"><i class="fa-solid fa-utensils"></i></router-link>
      <router-link to="/connexion" v-if="!getUser"><i class="fa-solid fa-user"></i></router-link>
      <router-link to="/profile" v-else><i class="fa-solid fa-user"></i></router-link>
      <router-link to="/commandes" v-if="getUser"><i class="fa-solid fa-cart-shopping"></i></router-link>
    </nav>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
}
</script>

<style scoped>
nav{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    background-color: #6c211c;
    padding: 1rem;
    z-index: 100;
}
i{
  color: #ee7017;
  font-size: 25px;
}
</style>