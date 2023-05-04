<template>
  <div class="space-top-main"></div>
  <div class="main-home">
    <div class="sub-main-home">
      <div class="card-home">
        <p>Vos plats à Camoël !</p>
      </div>
      <div>
        <p v-if="getUser">Bonjour {{ getUser.firstname }} !</p>
      </div>
      <p>Nous avons le plaisir de vous proposer les meilleurs restaurants de Camoël.</p>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      commerces: [],
    }
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
  mounted() {
    this.fetchCommerces();
  },
  methods: {
    fetchCommerces() {
      fetch("http://192.168.68.29/api/listeCommerce")
          .then(response => response.json())
          .then(data => {
            this.commerces = data;
          }).catch(error => {
        console.log(error);
      });
    },
  },
}
</script>

<style scoped>
.card-home {
  width: 100%;
  height: 180px;
  border-radius: 30px;
  background: url("https://i.ibb.co/tK4sYk5/Capture-d-cran-2023-04-29-060355.png") no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
}

.card-home p {
  color: black;
  font-family: 'Roboto';
  font-weight: 800;
  text-align: center;
  width: 100%;
}

h1 {
  text-transform: uppercase;
  font-family: Roboto;
  font-weight: 300;
  letter-spacing: 2px;
  color: #6c211c;
}
</style>