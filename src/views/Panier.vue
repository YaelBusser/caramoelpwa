<template>
  <div class="hero">
    <img :src=" `http://192.168.68.29/img/shopping-cart.jpg`" class="img-hero">
  </div>
  <div class="main">
    <div class="sub-main">
      <h3 class="hero-h3">Votre panier</h3>
      <div class="panier" v-for="(commerce, number) in commerces">
        <h4 v-if="commerce"><i class="fa-solid fa-star"></i>{{ commerce["NOM_COMMERCE"] }}<i
            class="fa-solid fa-star"></i></h4>
        <p class="adresse">
          {{ commerce["ADRESSE_COMMERCE"] }}
        </p>
        <div v-for="(panier, index) in paniers" class="main-prod">
          <div class="produits" v-if="commerce['ID_COMMERCE'] === panier['id_commerce'] && panier['qte'] > 0">
            <div class="modal" :style="toggleModalPayer ? 'bottom: 0;' : ''">
              <div class="overflow" @click="payer(number)" :style="toggleModalPayer ? 'top: 0;' : '' "></div>
              <div class="block-type" :style="toggleModalPayer ? 'bottom: 0;' : '' ">
                <i class="fa-solid fa-xmark" @click="payer(number)"></i>
                <div class="mode-cmd">
                  <p class="title-mode-cmd">choisissez votre mode de commande</p>
                  <div class="buttons">
                    <button
                        @click="addCommande(idCommerce, panier); clickAndCollect = true; livraison = false;">
                      <i
                          class="fa-solid fa-shop"></i>
                      <p>Click & Collect</p></button>
                    <button
                        @click="addCommande(idCommerce, panier); livraison = true; clickAndCollect = false;">
                      <i class="fa-solid fa-truck"></i>
                      <p>Livraison</p></button>
                  </div>
                </div>
              </div>
            </div>
            <div class="block-produit" v-if="panier['qte'] > 0">
              <img :src="`http://192.168.68.29/${panier['LIEN_IMG']}`"
                   class="img-produit">
              <div class="infos-prod">
                <p>
                  {{ panier["NOM_PROD"] }}
                </p>
                <div class="prix-qte">
                  <p>
                    <span class="valuePrix">{{ panier["prix"] * panier["qte"] }}</span><span class="euro">€</span>
                  </p>
                  <div class="qte">
                    <button
                        @click="decrement(panier)"
                        class="btn-left">-
                    </button>
                    <input type="number" v-model="panier['qte']" min="0" max="100"/>
                    <button @click="increment(panier);" class="btn-right">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="block-payment">
          <div class="preparation">
            <p>Préparation</p>
            <p>{{ totalTpsPrepa(commerce.ID_COMMERCE) }} min</p>
          </div>
          <div class="preparation">
            <p>Total (HT) </p>
            <p>{{ totalHtByCommerce(commerce.ID_COMMERCE) }}<span>€</span></p>
          </div>
          <div class="preparation">
            <p>Taxes</p>
            <p>10<span>%</span></p>
          </div>
          <div class="bar"></div>
          <div class="prix-total">
            <p>Total </p>
            <p>{{ totalByCommerce(commerce.ID_COMMERCE) }}<span>€</span></p>
          </div>
          <button class="btn-payer" @click="payer(number)">payer</button>
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
      commerces: [],
      produits: [],
      toggleModalPayer: false,
      clickAndCollect: false,
      livraison: false,
      idCommerce: 0,
      lastIdVente: 0,
      produitsParCommerce: [],
    }
  },

  mounted() {
    this.listeCommerces();
    this.listeProduits();
    this.fetchPanier();
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
  methods: {
    addCommande(idC, panier) {
      fetch(`http://192.168.68.29/api/listProduitsPanier/${this.getUser.id}/${idC}`)
          .then(response => response.json())
          .then(data => {
            this.produitsParCommerce = data;
            console.log(idC);

            if (!this.livraison) {
              let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              let code = "";
              for (var i = 0; i < 5; i++) {
                var index = Math.floor(Math.random() * caracteres.length);
                code += caracteres.charAt(index);
              }
              const dateDuJour = new Date();
              const dureeEnMinutes = this.totalTpsPrepa(idC);
              const dureeEnMillisecondes = dureeEnMinutes * 60 * 1000;
              const dateTheorique = new Date(dateDuJour.getTime() + dureeEnMillisecondes);
              dateTheorique.setMinutes(dateTheorique.getMinutes() + dureeEnMinutes);

              const anneeJour = dateDuJour.getFullYear();
              const moisJour = (dateDuJour.getMonth() + 1).toString().padStart(2, '0');
              const jourJour = dateDuJour.getDate().toString().padStart(2, '0');
              const heuresJour = dateDuJour.getHours().toString().padStart(2, '0');
              const minutesJour = dateDuJour.getMinutes().toString().padStart(2, '0');
              const secondesJour = dateDuJour.getSeconds().toString().padStart(2, '0');

              const annee = dateTheorique.getFullYear();
              const mois = (dateTheorique.getMonth() + 1).toString().padStart(2, '0');
              const jour = dateTheorique.getDate().toString().padStart(2, '0');
              const heures = dateTheorique.getHours().toString().padStart(2, '0');
              const minutes = dateTheorique.getMinutes().toString().padStart(2, '0');
              const secondes = dateTheorique.getSeconds().toString().padStart(2, '0');

              const dateDuJourFormatee = `${anneeJour}-${moisJour}-${jourJour} ${heuresJour}:${minutesJour}:${secondesJour}`;
              const dateTheoriqueFormatee = `${annee}-${mois}-${jour} ${heures}:${minutes}:${secondes}`;
              this.produitsParCommerce.forEach(produit => {
                fetch(`http://192.168.68.29/api/addCommandeClickCollect`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id_user: this.getUser.id,
                    id_commerce: idC,
                    code: code,
                    id_produit: produit.id_produit,
                    prix: this.totalByCommerce(idC),
                    date_commande: dateDuJourFormatee,
                    date_theorique: dateTheoriqueFormatee,
                  }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                      // Supprimer le produit du panier après avoir passé la commande
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                fetch(`http://192.168.68.29/api/panier/produit/${this.getUser.id}/${produit.id_produit}`, {
                  method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data.message);
                      // Mettre à jour le panier en récupérant les produits mis à jour
                      this.fetchPanier();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
              });
              alert("Votre commande a été validée avec succès, code : " + code);
            } else {
              let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              let code = "";
              for (var i = 0; i < 5; i++) {
                var index = Math.floor(Math.random() * caracteres.length);
                code += caracteres.charAt(index);
              }
              const dateDuJour = new Date();
              const dureeEnMinutes = this.totalTpsPrepa(idC);
              const dureeEnMillisecondes = dureeEnMinutes * 60 * 1000;
              const dateTheorique = new Date(dateDuJour.getTime() + dureeEnMillisecondes);
              dateTheorique.setMinutes(dateTheorique.getMinutes() + dureeEnMinutes);

              const anneeJour = dateDuJour.getFullYear();
              const moisJour = (dateDuJour.getMonth() + 1).toString().padStart(2, '0');
              const jourJour = dateDuJour.getDate().toString().padStart(2, '0');
              const heuresJour = dateDuJour.getHours().toString().padStart(2, '0');
              const minutesJour = dateDuJour.getMinutes().toString().padStart(2, '0');
              const secondesJour = dateDuJour.getSeconds().toString().padStart(2, '0');

              const annee = dateTheorique.getFullYear();
              const mois = (dateTheorique.getMonth() + 1).toString().padStart(2, '0');
              const jour = dateTheorique.getDate().toString().padStart(2, '0');
              const heures = dateTheorique.getHours().toString().padStart(2, '0');
              const minutes = dateTheorique.getMinutes().toString().padStart(2, '0');
              const secondes = dateTheorique.getSeconds().toString().padStart(2, '0');

              const dateDuJourFormatee = `${anneeJour}-${moisJour}-${jourJour} ${heuresJour}:${minutesJour}:${secondesJour}`;
              const dateTheoriqueFormatee = `${annee}-${mois}-${jour} ${heures}:${minutes}:${secondes}`;
              this.produitsParCommerce.forEach(produit => {
                fetch(`http://192.168.68.29/api/addLivraison`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id_user: this.getUser.id,
                    id_commerce: idC,
                    code: code,
                    id_produit: produit.id_produit,
                    prix: this.totalByCommerce(idC),
                    date_commande: dateDuJourFormatee,
                    date_theorique: dateTheoriqueFormatee,
                  }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                fetch(`http://192.168.68.29/api/panier/produit/${this.getUser.id}/${produit.id_produit}`, {
                  method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data.message);
                      this.fetchPanier();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
              });
              alert("Votre commande a été validée avec succès, code : " + code);
            }
          })
          .catch(error => {
            console.log(error);
          });
    },
    totalHtByCommerce(id_commerce) {
      let totalHt = 0;
      for (let panier of this.paniers) {
        if (panier.id_commerce === id_commerce) {
          totalHt += Number(panier.prix) * Number(panier.qte);
        }
      }
      return totalHt.toFixed(2);
    }
    ,
    totalByCommerce(id_commerce) {
      let total = 0;
      for (let panier of this.paniers) {
        if (panier.id_commerce === id_commerce) {
          total += Number(panier.prix) * Number(panier.qte) * 1.1;
        }
      }
      return total.toFixed(2);
    }
    ,
    totalTpsPrepa(id_commerce) {
      let tps = 0;
      for (let panier of this.paniers) {
        if (panier.id_commerce === id_commerce) {
          tps += Number(panier.tps_prepa);
        }
      }
      return tps;
    }
    ,
    payer(number) {
      this.toggleModalPayer = !this.toggleModalPayer;
      this.idCommerce = this.commerces[number].ID_COMMERCE;
    }
    ,
    decrement(panier) {
      if (panier['qte'] > 0) {
        panier['qte']--;
      }
      if (panier['qte'] === 0) {
        fetch(`http://192.168.68.29/api/panier/${panier.id_panier}`, {
          method: 'DELETE'
        }).then(response => response.json())
            .then(data => {
              console.log(data.message);

            })
            .catch(error => {
              console.log(error);
            });
      }
    }
    ,
    increment(panier) {
      if (panier['qte'] >= 1 && panier['qte'] < 10) {
        panier['qte']++;
      }
    }
    ,
    async listeProduits() {
      fetch(`http://192.168.68.29/api/listeProduit`)
          .then(response => response.json())
          .then(data => {
            this.produits = data;
          }).catch(error => {
        console.log(error);
      });
    }
    ,
    async listeCommerces() {
      fetch(`http://192.168.68.29/api/listeCommerce`)
          .then(response => response.json())
          .then(data => {
            this.commerces = data;
          }).catch(error => {
        console.log(error);
      });
    }
    ,
    async fetchPanier() {
      fetch(`http://192.168.68.29/api/panier/${this.getUser.id}`)
          .then(response => response.json())
          .then(data => {
            this.paniers = data;
          }).catch(error => {
        console.log(error);
      });
    }
    ,
  }
}
</script>
<style scoped>
.adresse {
  margin-block-start: 0;
  margin-block-end: 0;
  font-family: 'Roboto';
  font-weight: 300;
  color: rgba(0, 0, 0, 0.5);
  padding: 0;
  margin-top: -30px;
}

.main-prod {
  min-width: 100%;
}

.block-produit {
  width: 100%;
  display: flex;
  gap: 10px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.buttons button i {
  padding: 0;
  color: #ee7017;
  margin: 0;
  height: 10px;
  background-color: rgba(0, 0, 0, 0);
}

.buttons button {
  background-color: white;
  border: 1px solid rgba(238, 112, 23, 0.25);
  font-family: 'Roboto';
  font-weight: 400;
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.buttons button:hover {
  background-color: rgba(238, 112, 23, 0.15);
}

button p {
  margin-block-start: 0;
  margin-block-end: 0;
  font-family: 'Roboto';
  font-weight: 400;
  height: 15px;
  display: flex;
  align-items: center;
}

.mode-cmd {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}

.title-mode-cmd {
  font-family: 'Roboto';
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 13px;
}

.block-type {
  position: fixed;
  bottom: -50vh;
  min-width: 100%;
  left: 0;
  right: 0;
  min-height: 50vh;
  background-color: white;
  border-radius: 30px 30px 0 0;
  transition: all 0.3s ease-in-out;
}

.modal i {
  padding-left: 1.1rem;
  padding-right: 1.2rem;
  padding-bottom: 1.1rem;
  padding-top: 1rem;
  border-radius: 50%;
  color: #ee7017;
  background-color: white;
  transition: all 0.3s ease-in-out;
  margin-left: 10px;
  margin-top: 10px;
}

.overflow {
  position: fixed;
  top: -100vh;
  left: 0;
  right: 0;
  width: 100%;
  height: 60vh;
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.modal {
  min-width: 100%;
  position: fixed;
  height: 100vh;
  bottom: -100vh;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  z-index: 150;
}

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

.preparation p {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-top: 10px;
  padding-bottom: 10px;
}

.preparation {
  display: flex;
  justify-content: space-between;
  font-family: 'Roboto';
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
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
  gap: 10px;
  width: 100%;
  border-radius: 10px;
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
  justify-content: center;
  align-items: center;
  gap: 20px;
}

h2 {
  text-align: center;
  color: #ee7017;
  font-family: Bahnschrift;
}
</style>