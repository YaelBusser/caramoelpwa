<template>
  <div class="block">
    <div class="container">
      <div class="flex">
        <input type="text" placeholder="nom" v-model="nom"/>
        <input type="text" placeholder="prénom" v-model="prenom"/>
      </div>
      <div class="flex">
        <input type="email" placeholder="mail" v-model="mail"/>
        <input type="tel" maxlength="10" placeholder="téléphone" v-model="tel"/>
      </div>
      <div class="flex">
        <input type="text" placeholder="Adresse" class="adresse" v-model="adresse"/>
      </div>
      <div class="flex">
        <input type="password" placeholder="Mot de passe" v-model="mdp" @input="validateMdp()"/>
        <input type="password" placeholder="Confirmez votre mot de passe" v-model="mdp2" @input="validateMdp()"/>
      </div>
      <p class="error" :style="errorMsg ? 'transform: scale(1)' : ''">{{ errorMsg }}</p>
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
      mdp2: "",
      mail: "",
      tel: "",
      adresse: "",
      mdpError: null,
      errorMsg: "",
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
    validateMdp() {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      if (!passwordRegex.test(this.mdp)) {
        this.mdpError = true;
        this.errorMsg = "Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.";
        return false; // Le mot de passe ne correspond pas, arrêter la méthode
      }else{
        this.errorMsg = '';
      }
      if (this.mdp !== this.mdp2) {
        this.errorMsg = "Les mots de passe ne correspondent pas.";
        return false; // Le mot de passe ne correspond pas, arrêter la méthode
      }else{
        this.errorMsg = "";
      }
      return true; // Le mot de passe est valide
    },
    async register() {
      if (!this.validateMdp()) {
        return;
      }
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
.error{
  background-color: #d71604;
  padding: 0;
  border-radius: 10px;
  width: 200px;
  font-family: 'Roboto';
  font-weight: 500;
  text-align: justify;
  letter-spacing: 2px;
  transform: scale(0);
  margin-block-start: 0;
  margin-block-end: 0;
  transition: all 0.3s ease-in-out;
}
input[type=button] {
  width: 90%;
}

.adresse {
  width: 83%;
}

.flex {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

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
  background-color: rgba(0,0,0,0.05);
  color: white;
  border-radius: 10px;
  padding-top: 1.5rem;
}

input {
  background-color: white;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  width: 100px;
  outline: 1px solid rgba(238, 112, 23, 0.32);
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
  