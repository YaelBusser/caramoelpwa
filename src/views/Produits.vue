<template>
  <div class="block">
    <img :src=" `http://192.168.68.29/${commerce['LIEN_IMG']}`" class="img-hero">
    <h2>{{ commerce["NOM_COMMERCE"] }}</h2>
    <div class="block-produits">
      <div v-for="(produit, index) in produits" class="produits">
        <img :src=" `http://192.168.68.29/${produit['LIEN_IMG']}`" class="img-produit">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Produits",
  data() {
    return {
      idCommerce: this.$route.query.id,
      produits: [],
      commerce: [],
    }
  },
  mounted() {
    this.fetchRestaurant(this.idCommerce);
    this.fetchProduits(this.idCommerce);
  },
  methods: {
    async fetchProduits(id) {
      fetch(`http://192.168.68.29/api/produitsCommerce/${id}`)
          .then(response => response.json())
          .then(data => {
            this.produits = data;
          }).catch(error => {
        console.log(error);
      });
    },
    async fetchRestaurant(id) {
      fetch(`http://192.168.68.29/api/commerce/${id}`)
          .then(response => response.json())
          .then(data => {
            this.commerce = data;
            this.commerce = this.commerce[0];
          }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>

.img-produit {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.produits {
  min-width: 200px;
  border: 1px solid red;
  position: relative;
}

.block-produits {
  margin-top: 50px;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  width: 100%;
  height: 150px;
  gap: 150px;
  position: relative;
}
</style>