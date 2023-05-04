<template>
  <div class="hero">
    <img :src=" `http://192.168.68.29/img/cuisine.jpg`" class="img-hero">
  </div>
  <div class="main">
    <div class="sub-main">
      <h3 class="hero-h3">{{ commerce["NOM_COMMERCE"] }}</h3>
      <p class="adresse">{{ commerce["ADRESSE_COMMERCE"] }}</p>
      <div class="categorie-produit">
        <h4 class="type-plat" v-if="cat1.length > 0">Entrées</h4>
        <div class="block-produits" v-if="cat1.length > 0">
          <div v-for="(produit, index) in cat1" class="produits" @click="modal(produit['ID_PROD'])">
            <img :src="`http://192.168.68.29/${produit.LIEN_IMG}`"
                 class="img-produit">
            <p class="nom-prod">{{ produit["NOM_PROD"] }}</p>
          </div>
        </div>
        <h4 class="type-plat" v-if="cat2.length > 0">Plats</h4>
        <div class="block-produits" v-if="cat2.length > 0">
          <div v-for="(produit, index) in cat2" class="produits" @click="modal(produit['ID_PROD'])">
            <img :src="`http://192.168.68.29/${produit.LIEN_IMG}`"
                 class="img-produit">
            <p class="nom-prod">{{ produit["NOM_PROD"] }}</p>
          </div>
        </div>
        <h4 class="type-plat" v-if="cat3.length > 0">Desserts</h4>
        <div class="block-produits" v-if="cat3.length > 0">
          <div v-for="(produit, index) in cat3" class="produits" @click="modal(produit['ID_PROD'])">
            <img :src="`http://192.168.68.29/${produit.LIEN_IMG}`"
                 class="img-produit">
            <p class="nom-prod">{{ produit["NOM_PROD"] }}</p>
          </div>
        </div>
        <h4 class="type-plat" v-if="cat4.length > 0">Boissons</h4>
        <div class="block-produits" v-if="cat4.length > 0">
          <div v-for="(produit, index) in cat4" class="produits" @click="modal(produit['ID_PROD'])">
            <img :src="`http://192.168.68.29/${produit.LIEN_IMG}`"
                 class="img-produit">
            <p class="nom-prod">{{ produit["NOM_PROD"] }}</p>
          </div>
        </div>
        <h4 class="type-plat" v-if="cat5.length > 0">Autres</h4>
        <div class="block-produits" v-if="cat5.length > 0">
          <div v-for="(produit, index) in cat5" class="produits" @click="modal(produit['ID_PROD'])">
            <img :src="`http://192.168.68.29/${produit.LIEN_IMG}`"
                 class="img-produit">
            <p class="nom-prod">{{ produit["NOM_PROD"] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" :style="toggleModal ? 'left: 0;' : 'left: 100%'">
    <i class="fa-solid fa-xmark x" @click="modal"></i>
    <div class="hero">
      <img :src="`http://192.168.68.29/${detailsProduit['LIEN_IMG']}`" class="img-hero">
    </div>
    <div class="main">
      <div class="sub-main">
        <h3 class="hero-h3">{{ detailsProduit['NOM_PROD'] }}</h3>
        <p class="ingredients">{{ detailsProduit["ingredients"] }}</p>
        <p class="prix">{{ detailsProduit["PRIX_PROD"] * counter }}<span>€</span></p>
        <div class="qte" v-if="detailsProduit['QUANTITE_PROD'] > 0">
          <button @click="decrementCounter" class="btn-left">-</button>
          <input type="number" v-model="counter" min="0" max="100"/>
          <button @click="incrementCounter" class="btn-right">+</button>
        </div>
        <div v-else>
          <p class="rupture-stock">Produit en rupture de stock</p>
        </div>
        <div class="details">
          <div class="note">
            <i class="fa-solid fa-star star"></i>
            <p>{{ detailsProduit["note"] }}</p>
          </div>
          <div class="kcal">
            <i class="fa-solid fa-fire"></i>
            <p>{{ detailsProduit["kcal"] }} Kcal</p>
          </div>
          <div class="tps">
            <i class="fa-solid fa-clock"></i>
            <p>{{ detailsProduit["tps_prepa"] }} min</p>
          </div>
        </div>
        <p class="description">{{ detailsProduit["DESCRIPTION_PROD"] }}</p>
        <button class="btn-add" v-if="detailsProduit['QUANTITE_PROD'] > 0" @click="addPanier(detailsProduit['ID_COMMERCE'], detailsProduit['ID_PROD'], counter, detailsProduit['PRIX_PROD'] * counter)">ajouter au panier</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "Produits",
  data() {
    return {
      counter: 1,
      idCommerce: this.$route.query.id,
      produits: [],
      commerce: [],
      catProduit: [],
      produitsParCat: [],
      cat1: [],
      cat2: [],
      cat3: [],
      cat4: [],
      cat5: [],
      toggleModal: false,
      detailsProduit: [],
    }
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
  async mounted() {
    await this.fetchRestaurant(this.idCommerce);
    await this.fetchProduits(this.idCommerce);
    await this.fetchCategorieProduit();
    await this.fetchProduitsParCat(this.idCommerce);
  },
  methods: {
    addPanier(idCommerce, idProduit, qte, prix){
      fetch(`http://192.168.68.29/api/addPanier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_user: this.getUser.id,
          id_commerce: idCommerce,
          id_produit: idProduit,
          qte: qte,
          prix: prix
        })
      }).then(response => response.json())
          .then(data => {
            alert("Produit ajouté dans votre panier avec succès !");
            console.log(data.message);
          })
          .catch(error => {
            console.log(error);
          });
    },

    incrementCounter() {
      if (this.counter < 10) {
        this.counter++;
      }
      if (this.counter > 10) {
        this.counter = 10;
      }
      if (this.counter < 1) {
        this.counter = 1;
      }
    },
    decrementCounter() {
      if (this.counter > 1) {
        this.counter--;
      }
      if (this.counter < 1) {
        this.counter = 0;
      }
      if (this.counter > 10) {
        this.counter = 10;
      }
    },
    modal(id) {
      this.toggleModal = !this.toggleModal;
      if (this.toggleModal) {
        fetch(`http://192.168.68.29/api/produit/${id}`)
            .then(response => response.json())
            .then(data => {
              this.detailsProduit = data;
              this.detailsProduit = this.detailsProduit[0];
            }).catch(error => {
          console.log(error);
        });
      } else {
      }
    },
    async fetchProduitsParCat(idCommerce) {
      fetch(`http://192.168.68.29/api/produits/${idCommerce}/1`)
          .then(response => response.json())
          .then(data => {
            this.cat1 = data;
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/produits/${idCommerce}/2`)
          .then(response => response.json())
          .then(data => {
            this.cat2 = data;
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/produits/${idCommerce}/3`)
          .then(response => response.json())
          .then(data => {
            this.cat3 = data;
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/produits/${idCommerce}/4`)
          .then(response => response.json())
          .then(data => {
            this.cat4 = data;
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/produits/${idCommerce}/5`)
          .then(response => response.json())
          .then(data => {
            this.cat5 = data;
          }).catch(error => {
        console.log(error);
      });
    },
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
    },
    async fetchCategorieProduit() {
      fetch("http://192.168.68.29/api/listeCategorieProduit")
          .then(response => response.json())
          .then(data => {
            this.catProduit = data;
          }).catch(error => {
        console.log(error);
      });
    },
  }
}
</script>

<style scoped>
.adresse{
  margin-block-start: 0;
  margin-block-end: 0;
  margin-top: -25px;
  font-size: 12px;
  font-family: 'Roboto';
  font-weight: 300;
}
.rupture-stock{
  color: white;
  background-color: #d71604;
  padding: 1rem;
  border-radius: 50px 50px 50px 50px;
  text-align: center;
  font-family: 'Roboto';
  font-weight: 500;
}
.ingredients {
  margin-block-start: 0;
  margin-block-end: 0;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 13px;
  margin-top: -25px;
}

.details p {
  margin-block-start: 0;
  margin-block-end: 0;
}

.details div {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.details i {
  color: #ee7017;
  font-size: 25px;
}

.details {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.details p {
  font-family: 'Roboto';
  font-weight: 500;
}

.description {
  font-family: 'Roboto';
  font-weight: 300;
}

button {
  cursor: pointer;
}

.btn-add {
  appearance: none;
  border: none;
  padding: 1rem;
  background-color: #ee7017;
  color: white;
  font-family: 'Roboto';
  font-weight: 700;
  border-radius: 50px 50px 50px 50px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.qte {
  display: flex;
  gap: 0;
  justify-content: center;
}

.btn-left {
  border-radius: 50% 0 0 50%;
}

.btn-right {
  border-radius: 0 50% 50% 0;
}

.qte button {
  appearance: none;
  border: none;
  padding: 1rem;
  background-color: #ee7017;
  color: white;
  font-family: 'Roboto';
  font-weight: 900;
  font-size: 20px;
  width: 60px;
}

.qte input {
  appearance: none;
  border: none;
  outline: none;
  text-align: center;
  background-color: #ee7017;
  color: white;
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 20px;
}

.prix {
  font-size: 50px;
  position: absolute;
  right: 30px;
  top: 0;
  font-family: 'Roboto';
  font-weight: 500;
}

.prix span {
  color: #ee7017;
  font-size: 15px;
}

.modal {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: white;
  left: 100%;
  transition: all 0.3s ease-in-out;
}

.x {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: white;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 50%;
  color: #ee7017;
}

.nom-prod {
  font-size: 10px;
  font-family: 'Roboto';
  font-weight: 300;
  margin-block-start: 0;
  margin-block-end: 0;
  text-align: center;
  width: 50px;
}

.type-plat {
  font-size: 15px;
  font-family: 'Roboto';
  font-weight: 500;
}

.img-produit {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

.produits {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
}

.block-produits {
  display: flex;
  width: 112%;
  position: relative;
  gap: 27px;
  overflow-x: scroll;
}
</style>