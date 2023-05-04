<template>
  <div class="block">
    <div class="container">
      <input type="text" placeholder="nom" v-model="nom"/>
      <input type="text" placeholder="prénom" v-model="prenom"/>
      <input type="email" placeholder="mail" v-model="mail"/>
      <input type="tel" maxlength="10" placeholder="téléphone" v-model="tel"/>
      <input type="text" placeholder="Adresse" v-model="adresse"/>
      <input type="password" placeholder="Mot de passe" v-model="mdp"/>
      <input type="button" value="s'inscrire" @click="register"/>
      <p>Déjà inscris ? Clique
        <router-link to="/connexion">ici</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      nom: "",
      prenom: "",
      mdp: "",
      mail: "",
      tel: "",
      adresse: "",
    };
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
  mounted() {
    if (this.getUser) {
      this.$router.push('/profile')
    }
  },
  methods: {
    async register() {
      fetch(`http://192.168.68.29/api/userCreate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.nom,
          firstname: this.prenom,
          email: this.mail,
          telephone: this.tel,
          password: this.mdp,
          adresse: this.adresse,
        })
      }).then(response => response.json())
          .then(data => {
            console.log(data.message);
            alert("Votre compte a été créer avec succès !" + data);
          })
          .catch(error => {
            console.log(error)
          });
    }
  },
};
</script>

<style scoped>
.block {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 80%;
  background-color: #ee7017;
  color: white;
  border-radius: 10px;
  padding-top: 1.5rem;
}

input {
  background-color: white;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  width: 80%;
}

input::placeholder {
  color: rgba(0, 0, 0, 0.5);
}

input[type="button"] {
  background-color: white;
  color: #ee7017;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
}

img {
  width: 100px;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
  