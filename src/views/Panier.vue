<template>
  <div className="hero">
    <img :src=" `http://192.168.68.29/img/shopping-cart.jpg`" class="img-hero">
  </div>
  <div className="main">
    <div className="sub-main">
      <h3 className="hero-h3">Votre panier</h3>
      <div class="panier" v-if="panier2.length > 0">
        <h4><i class="fa-solid fa-star"></i>{{ commerce2["NOM_COMMERCE"] }}<i class="fa-solid fa-star"></i></h4>
        <div v-for="panier in panier2">
          <div v-for="produit in produits" class="produits" v-if="panier['qte'] > 0">
            <img :src="`http://192.168.68.29/${produit.LIEN_IMG}`"
                 class="img-produit" v-if="produit['ID_PROD'] === panier['id_produit']">
            <div class="infos-prod" v-if="panier['id_produit'] === produit['ID_PROD']">
              <p>
                {{ produit["NOM_PROD"] }}
              </p>
              <div class="prix-qte">
                <p>
                  <span class="valuePrix">{{ produit["PRIX_PROD"] * panier['qte'] }}</span><span class="euro">€</span>
                </p>
                <div class="qte">
                  <button
                      @click="decrement(panier, commerce2['ID_COMMERCE'], produit['ID_PROD'], panier['qte'])"
                      class="btn-left">-
                  </button>
                  <input type="number" v-model="panier['qte']" min="0" max="100"/>
                  <button @click="increment(panier, produit['ID_PROD'], panier['qte']);" class="btn-right">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block-payment">
          <div class="bar"></div>
          <div class="prix-total">
            <p>Total</p>
            <p>{{ prixTotal2 }}<span>€</span></p>
          </div>
          <button class="btn-payer">payer</button>
        </div>
      </div>
      <div class="panier" v-if="panier3.length > 0">
        <h4><i class="fa-solid fa-star"></i>{{ commerce3["NOM_COMMERCE"] }}<i class="fa-solid fa-star"></i></h4>
        <div v-for="panier in panier3">
          <div v-for="produit in produits" class="produits" v-if="panier['qte'] > 0">
            <img :src="`http://192.168.68.29/${produit.LIEN_IMG}`"
                 class="img-produit" v-if="produit['ID_PROD'] === panier['id_produit']">
            <div class="infos-prod" v-if="panier['id_produit'] === produit['ID_PROD']">
              <p>
                {{ produit["NOM_PROD"] }}
              </p>
              <div class="prix-qte">
                <p>
                  <span class="valuePrix">{{ produit["PRIX_PROD"] * panier['qte'] }}</span><span class="euro">€</span>
                </p>
                <div class="qte">
                  <button
                      @click="decrement(panier, commerce3['ID_COMMERCE'], produit['ID_PROD'], panier['qte'])"
                      class="btn-left">-
                  </button>
                  <input type="number" v-model="panier['qte']" min="0" max="100"/>
                  <button @click="increment(panier, produit['ID_PROD'], panier['qte']);" class="btn-right">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block-payment">
          <div class="bar"></div>
          <div class="prix-total">
            <p>Total</p>
            <p>{{ prixTotal3 }}<span>€</span></p>
          </div>
          <button class="btn-payer">payer</button>
        </div>
      </div>
      <div class="panier" v-if="panier4.length > 0">
        <h4><i class="fa-solid fa-star"></i>{{ commerce4["NOM_COMMERCE"] }}<i class="fa-solid fa-star"></i></h4>
        <div v-for="panier in panier4">
          <div v-for="produit in produits" class="produits" v-if="panier['qte'] > 0">
            <img :src="`http://192.168.68.29/${produit.LIEN_IMG}`"
                 class="img-produit" v-if="produit['ID_PROD'] === panier['id_produit']">
            <div class="infos-prod" v-if="panier['id_produit'] === produit['ID_PROD']">
              <p>
                {{ produit["NOM_PROD"] }}
              </p>
              <div class="prix-qte">
                <p>
                  <span class="valuePrix">{{ produit["PRIX_PROD"] * panier['qte'] }}</span><span class="euro">€</span>
                </p>
                <div class="qte">
                  <button
                      @click="decrement(panier, commerce4['ID_COMMERCE'], produit['ID_PROD'], panier['qte'])"
                      class="btn-left">-
                  </button>
                  <input type="number" v-model="panier['qte']" min="0" max="100"/>
                  <button @click="increment(panier, produit['ID_PROD'], panier['qte']);" class="btn-right">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block-payment">
          <div class="bar"></div>
          <div class="prix-total">
            <p>Total</p>
            <p>{{ prixTotal4 }}<span>€</span></p>
          </div>
          <button class="btn-payer">payer</button>
        </div>
      </div>
      <div class="panier" v-if="panier5.length > 0">
        <h4><i class="fa-solid fa-star"></i>{{ commerce5["NOM_COMMERCE"] }}<i class="fa-solid fa-star"></i></h4>
        <div v-for="panier in panier5">
          <div v-for="produit in produits" class="produits" v-if="panier['qte'] > 0">
            <img :src="`http://192.168.68.29/${produit.LIEN_IMG}`"
                 class="img-produit" v-if="produit['ID_PROD'] === panier['id_produit']">
            <div class="infos-prod" v-if="panier['id_produit'] === produit['ID_PROD']">
              <p>
                {{ produit["NOM_PROD"] }}
              </p>
              <div class="prix-qte">
                <p>
                  <span class="valuePrix">{{ produit["PRIX_PROD"] * panier['qte'] }}</span><span class="euro">€</span>
                </p>
                <div class="qte">
                  <button
                      @click="decrement(panier, commerce5['ID_COMMERCE'], produit['ID_PROD'], panier['qte'])"
                      class="btn-left">-
                  </button>
                  <input type="number" v-model="panier['qte']" min="0" max="100"/>
                  <button @click="increment(panier, produit['ID_PROD'], panier['qte']);" class="btn-right">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block-payment">
          <div class="bar"></div>
          <div class="prix-total">
            <p>Total</p>
            <p>{{ prixTotal5 }}<span>€</span></p>
          </div>
          <button class="btn-payer">payer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "Panier",
  data() {
    return {
      paniers: [],
      commerce2: [],
      commerce3: [],
      commerce4: [],
      commerce5: [],
      produits: [],
      panier2: [],
      panier3: [],
      panier4: [],
      panier5: [],
      valeur2: 0,
      valeurs2: [],
      prixTotal2: 0,
      prixTotal3: 0,
      prixTotal4: 0,
      prixTotal5: 0,
    }
  },
  mounted() {
    this.listeCommerces();
    this.listeProduits();
    this.fetchPanierParUserEtParCommerce();
    this.getPrixTotal();
  },
  updated() {
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
  methods: {
    getPrixTotal(){
      fetch(`http://192.168.68.29/api/prixTotal/${this.getUser.id}/2`)
          .then(response => response.json())
          .then(data => {
            this.prixTotal2 = data['prix'];
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/prixTotal/${this.getUser.id}/3`)
          .then(response => response.json())
          .then(data => {
            this.prixTotal3 = data['prix'];
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/prixTotal/${this.getUser.id}/4`)
          .then(response => response.json())
          .then(data => {
            this.prixTotal4 = data['prix'];
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/prixTotal/${this.getUser.id}/5`)
          .then(response => response.json())
          .then(data => {
            this.prixTotal5 = data['prix'];
          }).catch(error => {
        console.log(error);
      });
    },
    decrement(panier, idCommerce, idProduit, qte) {
      panier['qte']--;
      this.getPrixTotal();
      if (panier['qte'] === 0) {
        fetch(`http://192.168.68.29/api/panier/${this.getUser.id}/${idCommerce}/${idProduit}`, {
          method: 'DELETE'
        }).then(response => response.json())
            .then(data => {
              console.log(data.message);
            })
            .catch(error => {
              console.log(error);
            });
      }
      if (panier['qte'] > 100) {
        panier['qte'] = 100;
      }
      fetch(`http://192.168.68.29/api/modifQtePanier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_user: this.getUser.id,
          id_produit: idProduit,
          qte: qte - 1,
        })
      }).then(response => response.json())
          .then(data => {
            console.log(data.message);
          })
          .catch(error => {
            console.log(error);
          });
      this.getPrixTotal();
    },
    increment(panier, idProduit, qte) {
      if (panier['qte'] < 100) {
        panier['qte']++;
      }
      if (panier['qte'] > 100) {
        panier['qte'] = 100;
      }
      if (panier['qte'] < 1) {
        panier['qte'] = 1;
      }
      this.getPrixTotal();
      fetch(`http://192.168.68.29/api/modifQtePanier`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_user: this.getUser.id,
          id_produit: idProduit,
          qte: qte + 1,
        })
      }).then(response => response.json())
          .then(data => {
            console.log(data.message);
          })
          .catch(error => {
            console.log(error);
          });
      this.getPrixTotal();
    },
    async listeProduits() {
      fetch(`http://192.168.68.29/api/listeProduit`)
          .then(response => response.json())
          .then(data => {
            this.produits = data;
          }).catch(error => {
        console.log(error);
      });
    },
    async listeCommerces() {
      fetch(`http://192.168.68.29/api/commerce/2`)
          .then(response => response.json())
          .then(data => {
            this.commerce2 = data;
            this.commerce2 = this.commerce2[0];
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/commerce/3`)
          .then(response => response.json())
          .then(data => {
            this.commerce3 = data;
            this.commerce3 = this.commerce3[0];
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/commerce/4`)
          .then(response => response.json())
          .then(data => {
            this.commerce4 = data;
            this.commerce4 = this.commerce4[0];
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/commerce/5`)
          .then(response => response.json())
          .then(data => {
            this.commerce5 = data;
            this.commerce5 = this.commerce5[0];
          }).catch(error => {
        console.log(error);
      });
    },
    async fetchPanierParUserEtParCommerce() {
      fetch(`http://192.168.68.29/api/panier/${this.getUser.id}/2}`)
          .then(response => response.json())
          .then(data => {
            this.panier2 = data;
            for (const panier in this.panier2) {
              this.prix2 += this.panier2[panier]["prix"];
            }
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/panier/${this.getUser.id}/3}`)
          .then(response => response.json())
          .then(data => {
            this.panier3 = data;
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/panier/${this.getUser.id}/4}`)
          .then(response => response.json())
          .then(data => {
            this.panier4 = data;
          }).catch(error => {
        console.log(error);
      });
      fetch(`http://192.168.68.29/api/panier/${this.getUser.id}/5}`)
          .then(response => response.json())
          .then(data => {
            this.panier5 = data;
          }).catch(error => {
        console.log(error);
      });
    },
  }
}
</script>
<style scoped>
.bar {
  border-bottom: 1px dashed #ee7017;
  height: 0;
  width: 100%;
}

.prix-total span {
  color: #ee7017;
  font-size: 12px;
}

.prix-total {
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto';
  font-weight: 500;
}

.qte {
  display: flex;
  gap: 0;
}

.btn-left {
  border-radius: 10px 0 0 10px;
}

.btn-right {
  border-radius: 0 10px 10px 0;
}

.qte button {
  appearance: none;
  border: none;
  background-color: #ee7017;
  color: white;
  font-family: 'Roboto';
  font-weight: 900;
  font-size: 20px;
  width: 30px;
  height: 30px;
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
  font-size: 15px;
  width: 30px;
}

.prix-qte {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.valuePrix {
  font-family: 'Roboto';
  font-weight: 400;
}

.infos-prod {
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;
}

.infos-prod p {
  margin-block-start: 0;
  margin-block-end: 0;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
}

.euro {
  color: #ee7017;
  font-size: 13px;
}

.block-payment {
  width: 100%;
  margin-top: 30px;
}

h4 {
  font-family: 'Roboto';
  font-weight: 500;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 10px;
}

h4 i {
  color: #ee7017;
}

.btn-payer {
  padding: 1rem;
  background-color: #ee7017;
  appearance: none;
  border: none;
  border-radius: 50px 50px 50px 50px;
  color: white;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: 'Roboto';
  font-weight: 500;
  width: 100%;
}

.produits {
  display: flex;
  padding: 0;
  justify-content: start;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 2px;
}

.img-produit {
  min-width: 75px;
  max-width: 75px;
  min-height: 75px;
  max-height: 75px;
  border-radius: 20%;
  object-fit: cover;
}

.panier {
  background-color: #f8f8f8;
  font-family: 'Roboto';
  font-weight: 400;
  border-radius: 10px 10px 10px 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h2 {
  text-align: center;
  color: #ee7017;
  font-family: Bahnschrift;
}
</style>