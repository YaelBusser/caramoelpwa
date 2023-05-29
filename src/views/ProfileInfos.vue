<template>
  <div class="hero">
    <img :src="`http://192.168.68.29/img/profile.jpg`" class="img-hero">
  </div>
  <div class="main">
    <div class="sub-main">
      <div class="block-profile">
        <i v-if="!edit" class="fa-solid fa-pen-to-square" @click="toggleEdit"></i>
        <i v-if="edit" class="fa-solid fa-xmark" @click="toggleEdit"></i>
        <p v-if="edit">Profil</p>
        <div>
          <p v-if="!edit">{{ getUser.firstname }}</p>
          <input v-if="edit" type="text" v-model="user.firstname">
        </div>
        <div>
          <p v-if="!edit">{{ getUser.name }}</p>
          <input v-if="edit" type="text" v-model="user.name">
        </div>
        <div>
          <p v-if="!edit">{{ getUser.email }}</p>
          <input v-if="edit" type="email" v-model="user.email">
        </div>
        <div>
          <p v-if="!edit">{{ getUser.adresse }}</p>
          <input v-if="edit" type="text" v-model="user.adresse">
        </div>
        <div>
          <p v-if="!edit">{{ getUser.telephone }}</p>
          <input v-if="edit" type="text" v-model="user.telephone">
        </div>
        <div>
          <p v-if="edit">Changer le mot de passe :</p>
          <input v-if="edit" type="password" v-model="user.password" placeholder="Mot de passe">
          <input v-if="edit" type="password" placeholder="Confirmez le mot de passe">
        </div>
        <div class="block-btn">
          <button v-if="edit" @click="updateUser">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "ProfileInfos",
  data() {
    return {
      edit: false,
      user: {
        firstname: "",
        name: "",
        email: "",
        adresse: "",
        telephone: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapMutations(["setUser"]), // Ajouter cette ligne pour utiliser la mutation setUser

    toggleEdit() {
      this.edit = !this.edit;
      if (!this.edit) {
        // Réinitialiser les valeurs du formulaire
        this.user = {
          firstname: this.getUser.firstname,
          name: this.getUser.name,
          email: this.getUser.email,
          adresse: this.getUser.adresse,
          telephone: this.getUser.telephone,
          password: "",
        };
      }
    },
    updateUser() {
      const id = this.getUser.id;
      const payload = {
        name: this.user.name,
        firstname: this.user.firstname,
        email: this.user.email,
        adresse: this.user.adresse,
        telephone: this.user.telephone,
        password: this.user.password,
      };

      // Effectuer une requête API pour mettre à jour l'utilisateur
      fetch(`http://192.168.68.29/api/utilisateur/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Mettre à jour les données de l'utilisateur dans le store Vuex
            this.setUser(data);
            alert("Données modifiées avec succès !");
          })
          .catch((error) => {
            console.log(error);
            // Gérer les erreurs de la requête API
          });

    },
  },
};
</script>


<style scoped>
.block-btn {
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: end;
  margin-top: 10px;
}

button {
  background-color: white;
  color: #ee7017;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  outline: none;
  border: 1px solid #ee7017;
  padding: 1rem;
  border-radius: 10px;
}

.block-profile i {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ee7017;
}

.block-profile p {
  font-size: 20px;
  margin-block-start: 0;
  margin-block-end: 0;
  padding: 1rem;
}

.block-profile {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 10px;
  position: relative;
}

.flex {
  display: flex;
  gap: 10px;
}

input {
  background-color: white;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  margin: 10px;
  outline: 1px solid rgba(238, 112, 23, 0.32);
}
</style>