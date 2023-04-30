<template>
  <div class="hero">
    <img src="http://192.168.68.29/img/restau.jpg" class="img-hero">
  </div>
  <div class="main">
    <div class="sub-main">
      <h3 class="hero-h3">Top restaurants</h3>
      <div class="commerces">
        <div v-for="(commerce, index) in commerces"
             @click="redirectProduits(commerce);"
             class="commerce">
          <img :src="`http://192.168.68.29/${commerce['LIEN_IMG']}` " class="img-resto">
          <div class="description">
            <p>{{ commerce["NOM_COMMERCE"] }}</p>
            <p class="p-description">{{ commerce["type"] }}</p>
            <p class="p-description">{{commerce["ADRESSE_COMMERCE"]}}</p>
            <div class="note">
              <i class="fa-solid fa-star"></i>
              <p>{{ commerce["note"] }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      commerces: [],
    }
  },
  mounted() {
    this.fetchCommerces();
  },
  methods: {
    redirectProduits(commerce) {
      this.$router.push({
            path: "/produits",
            query: {id: commerce["ID_COMMERCE"]}
          }
      );
    },
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
.p-description{
  font-size: 12px!important;
  font-family: Roboto!important;
  font-weight: 500!important;
  color: rgba(0,0,0,0.5)!important;
  margin-top: 5px!important;
}
.note {
  display: flex;
  gap: 5px;
  margin-top: auto;
  justify-content: center;
  align-items: center;
}

.note p {
  font-family: 'Roboto' !important;
  font-weight: 500!important;
  font-size: 13px!important;
}

.note i {
  color: #ee7017;
}

.description {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
}

.commerces {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.commerce {
  width: 90%;
  display: flex;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 10px 10px 10px 10px;
}

.commerce p {
  text-align: center;
  border-radius: 0 0 10px 10px;
  margin-block-start: 0;
  margin-block-end: 0;
  color: black;
  font-size: 15px;
  font-family: Roboto;
  font-weight: 500;
}

.img-resto {
  border-radius: 10px 10px 10px 10px;
  width: 75px;
  height: 75px;
  object-fit: cover;
}
</style>