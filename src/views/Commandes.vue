<template>
  <div className="hero">
    <img :src=" `http://192.168.68.29/img/profile.jpg`" class="img-hero">
  </div>
  <div className="main">
    <div className="sub-main">
      <div class="commandesEnCours">
        <h3>Commandes En cours</h3>
        <h4>Click & Collect</h4>
        <div v-for="commande in clickCollectEnCours" class="commandes">
          <router-link :to="`/commande?code=${commande['code']}`">
            <div class="block-commande">
              <i class="fa-solid fa-shop"></i>
              <div>
                <p class="code">Commande n°{{ commande['code'] }}</p>
                <p class="dateLieu">{{ formatDate(commande['date_commande']) }} · {{ commande['NOM_COMMERCE'] }}</p>
                <p class="nbPrixEtat">{{ commande['nb_produits'] }} produits · {{ commande['prix'] }} € · {{
                    commande['etat']
                  }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <h4>Livraison</h4>
        <div v-for="commande in livraisonEnCours" class="commandes">
          <router-link :to="`/commande?code=${commande['code']}`">
            <div class="block-commande">
              <i class="fa-solid fa-truck"></i>
              <div>
                <p class="code">Commande n°{{ commande['code'] }}</p>
                <p class="dateLieu">{{ formatDate(commande['date_commande']) }} · {{ commande['NOM_COMMERCE'] }}</p>
                <p class="nbPrixEtat">{{ commande['nb_produits'] }} produits · {{ commande['prix'] }} € · {{
                    commande['etat']
                  }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="commandesTerminees">
        <h3>Commandes Terminées</h3>
        <h4>Click & Collect</h4>
        <div v-for="commande in clickCollectTerminees" class="commandes">
          <router-link :to="`/commande?code=${commande['code']}`">
            <div class="block-commande">
              <i class="fa-solid fa-shop"></i>
              <div>
                <p class="code">Commande n°{{ commande['code'] }}</p>
                <p class="dateLieu">{{ formatDate(commande['date_commande']) }} · {{ commande['NOM_COMMERCE'] }}</p>
                <p class="nbPrixEtat">{{ commande['nb_produits'] }} produits · {{ commande['prix'] }} € · {{
                    commande['etat']
                  }}</p>
              </div>
            </div>
          </router-link>
        </div>
        <h4>Livraison</h4>
        <div v-for="commande in livraisonTerminees" class="commandes">
          <router-link :to="`/commande?code=${commande['code']}`">
            <div class="block-commande">
              <i class="fa-solid fa-truck"></i>
              <div>
                <p class="code">Commande n°{{ commande['code'] }}</p>
                <p class="dateLieu">{{ formatDate(commande['date_commande']) }} · {{ commande['NOM_COMMERCE'] }}</p>
                <p class="nbPrixEtat">{{ commande['nb_produits'] }} produits · {{ commande['prix'] }} € · {{
                    commande['etat']
                  }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Commandes",
  data() {
    return {
      clickCollectEnCours: [],
      clickCollectTerminees: [],
      livraisonEnCours: [],
      livraisonTerminees: [],
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  mounted() {
    this.getCommandeClickCollectEnCours(this.getUser.id);
    this.getCommandeClickCollectTerminees(this.getUser.id);
    this.updateCommandeStatus();

    this.getCommandeLivraisonEnCours(this.getUser.id);
    this.getCommandeLivraisonTerminees(this.getUser.id);
    this.updateCommandeStatusLivraison();

  },
  methods: {
    async getCommandeClickCollectEnCours(idUser) {
      fetch(
          `http://192.168.68.29/api/commande/clickcollectEnCours/${idUser}`
      )
          .then((response) => response.json())
          .then((data) => {
            this.clickCollectEnCours.push(...data);
            console.log(this.clickCollectEnCours);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    async getCommandeLivraisonEnCours(idUser) {
      fetch(
          `http://192.168.68.29/api/commande/livraisonEnCours/${idUser}`
      )
          .then((response) => response.json())
          .then((data) => {
            this.livraisonEnCours.push(...data);
            console.log(this.livraisonEnCours);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    async getCommandeClickCollectTerminees(idUser) {
      fetch(
          `http://192.168.68.29/api/commande/clickcollectTerminees/${idUser}`
      )
          .then((response) => response.json())
          .then((data) => {
            this.clickCollectTerminees.push(...data);
            console.log(this.clickCollect);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    async getCommandeLivraisonTerminees(idUser) {
      fetch(
          `http://192.168.68.29/api/commande/livraisonTerminee/${idUser}`
      )
          .then((response) => response.json())
          .then((data) => {
            this.livraisonTerminees.push(...data);
            console.log(this.livraisonTerminees);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    formatDate(date) {
      const formattedDate = new Date(date).toLocaleString("fr-FR");
      return formattedDate;
    },
    updateCommandeStatus() {
      fetch('http://192.168.68.29/api/commande/clickcollectTerminees/maj_etat', {
        method: 'PUT',
      })
          .then(response => response.json())
          .then(data => {
            console.log(data.message); // Affiche le message de succès
          })
          .catch(error => {
            console.log(error);
          });
    },
    updateCommandeStatusLivraison() {
      fetch('http://192.168.68.29/api/commande/livraisonTerminees/maj_etat', {
        method: 'PUT',
      })
          .then(response => response.json())
          .then(data => {
            console.log(data.message); // Affiche le message de succès
          })
          .catch(error => {
            console.log(error);
          });
    },

  },
};
</script>

<style scoped>
h4{
  font-weight: 400;
  font-size: 15px;
  margin-block-start: 0;
  margin-block-end: 0;
  background-color: #ee7017;
  color: white;
  padding: 1rem;
}
.block-commande {
  display: flex;
  gap: 10px;
  align-items: center;
}

.block-commande i {
  color: #ee7017;
  font-size: 25px;
  border-radius: 50%;
  border: 1px solid #ee7017;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
  color: black;
}

p {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-bottom: 5px;
}

.commandesEnCours {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.commandesTerminees {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h3 {
  font-family: 'Roboto';
  font-weight: 700;
}

.commandes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #ee7017;
  padding-bottom: 0.5rem;
}

.code {
  font-family: 'Roboto';
  font-weight: 500;
}

.dateLieu {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
}

.nbPrixEtat {
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.8);
}
</style>
