<template>
  <div className="hero">
    <img :src=" `http://192.168.68.29/img/commande.jpg`" class="img-hero">
  </div>
  <div className="main">
    <div className="sub-main">
      <div class="numCode">
        <p class="txtCode">N° de commande</p>
        <p class="code">{{ code }}</p>
        <p class="description-commande">Vous pourrez retirer votre commande au comptoir lorsqu'elle sera prête.</p>
      </div>
      <p class="txtDetailsCommande">Détails de la commande</p>
      <div class="details-commande">
        <p class="code">{{ code }}</p>
        <div class="block-produits">
          <div v-for="produit in produits" class="produits">
            <p>{{ produit['NOM_PROD'] }}</p>
            <p class="prix"></p>
          </div>
          <div v-for="produit in produitsLivraison" class="produits">
            <p>{{ produit['NOM_PROD'] }}</p>
            <p class="prix"></p>
          </div>
        </div>
        <div class="bar"></div>
        <p class="preparation">Préparée : <span v-if="preparation">{{ formatDate(preparation) }}</span>  <span v-if="preparationLivraison">{{ formatDate(preparationLivraison) }}</span></p>
        <div class="totalPrix">
          <p>Total</p>
          <p>{{ prix }} {{ prixLivraison }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Commande",
  data() {
    return {
      code: "",
      produits: [],
      prix: "",
      preparation: "",
      produitsLivraison: [],
      prixLivraison: "",
      preparationLivraison: "",
    }
  },
  mounted() {
    this.code = this.$route.query.code;
    this.getProduitsByCode();
    this.getProduitsByCodeLivraison();
  },
  methods: {
    async getProduitsByCode() {
      fetch(
          `http://192.168.68.29/api/listeProduitClickCollect/${this.code}`
      )
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              this.produits = data;
              this.prix = this.produits[0]['prix'];
              this.preparation = this.produits[0]['date_theorique'];
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    async getProduitsByCodeLivraison() {
      fetch(
          `http://192.168.68.29/api/listeProduitLivraison/${this.code}`
      )
          .then((response) => response.json())
          .then((data) => {
            this.produitsLivraison = data;
            this.prixLivraison = this.produitsLivraison[0]['prix'];
            this.preparationLivraison = this.produitsLivraison[0]['date_theorique'];
          })
          .catch((error) => {
            console.log(error);
          });
    },
    formatDate(date) {
      const formattedDate = new Date(date).toLocaleString("fr-FR");
      return formattedDate;
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

.preparation {
  font-weight: 500;
}

.preparation span {
  font-weight: 400;
}

.totalPrix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.totalPrix p {
  margin-block-start: 0;
  margin-block-end: 0;
  font-weight: 600;
}

.prix {
  font-size: 12px;
}

.produits {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.block-produits {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.block-produits p {
  font-weight: 400;
  margin-block-start: 0;
  margin-block-end: 0;
}

.txtDetailsCommande {
  font-weight: 600;
  margin-block-start: 0;
  margin-block-end: 0;
}

.numCode {
  margin-top: 20px;
}

.details-commande {
  background-color: rgba(0, 0, 0, 0.05);
  box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.txtCode {
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 15px;
  margin-block-start: 0;
  margin-block-end: 0;
}

.code {
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 20px;
  margin-block-start: 0;
  margin-block-end: 0;
}

.description-commande {
  font-weight: 400;
  font-size: 13px;
}
</style>