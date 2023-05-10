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
      <p class="description-camoel">Nous avons le plaisir de vous proposer les meilleurs restaurants de Camoël.</p>
      <p>Top restaurants</p>
      <div class="listeCommerces">
        <div v-for="commerce in commerces" class="commerce">
          <img :src="`http://192.168.68.29/${commerce['LIEN_IMG']}`" @click="redirectCommerce(commerce['ID_COMMERCE'])">
          <div class="note">
            <i class="fa-solid fa-star"></i>
            <p>{{ commerce["note"] }}</p>
          </div>
        </div>
      </div>
      <p>Top plats</p>
      <div class="listeProduits">
        <div v-for="produit in produits" class="produits">
          <img :src="`http://192.168.68.29/${produit['LIEN_IMG']}`">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      commerces: [],
      produits: [],
    }
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
  mounted() {
    this.fetchCommerces();
    this.fetchProduits();
  },
  methods: {
    redirectCommerce(idCommerce){
      this.$router.push(`/produits?id=${idCommerce}`);
    },
    fetchCommerces() {
      fetch("http://192.168.68.29/api/topRestaurants")
          .then(response => response.json())
          .then(data => {
            this.commerces = data;
          }).catch(error => {
        console.log(error);
      });
    },
    fetchProduits(){
      fetch("http://192.168.68.29/api/topProduits")
          .then(response => response.json())
          .then(data => {
            this.produits = data;
          }).catch(error => {
        console.log(error);
      });
    }
  },
}
</script>

<style scoped>
.produits{

}
.produits img{
  min-width: 50px;
  max-width: 50px;
  min-height: 50px;
  max-height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.note {
  position: absolute;
  bottom: 0;
  color: #ee7017;
  font-family: 'Roboto';
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 0.5rem;
  border-radius: 10px;
}

.note p {
  margin-block-start: 0;
  margin-block-end: 0;
}

.commerce img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.commerce {
  width: 200px;
  border-radius: 10px;
  position: relative;
}

.listeCommerces {
  display: flex;
  gap: 10px;
}

.listeProduits {
  display: flex;
  gap: 10px;
  width: 110%;
  overflow-x: scroll;
}

.description-camoel {
  font-size: 15px;
  font-family: 'Roboto';
  font-weight: 300;
}

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