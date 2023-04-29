<template>
  <div class="block">
    <div class="container">
      <img src="https://i.ibb.co/gyP5VF3/logo-caramoel.png" />
      <input type="text" placeholder="nom" v-model="nom" />
      <input type="text" placeholder="prénom" v-model="prenom" />
      <input type="email" placeholder="mail" v-model="mail" />
      <input type="tel" maxlength="10" placeholder="téléphone" v-model="tel" />
      <input type="password" placeholder="Mot de passe" v-model="mdp" />
      <input type="button" value="s'inscrire" @click="register" />
      <p>Déjà inscris ? Clique <router-link to="/connexion">ici</router-link></p>
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
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.nom,
          firstname: this.prenom,
          email: this.mail,
          telephone: this.tel,
          password: this.mdp
        })
      };

      fetch('http://192.168.68.29/api/userCreate', requestOptions)
        .then(response => response.json())
        .then(data => {
          alert("Votre compte a été créer avec succès !");
        })
        .catch(error => {
          alert("Erreur !" + error);
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
  background-color: #6c211c;
  color: white;
  border-radius: 10px;
  padding: 1rem;
}

input {
  background-color: #ee7017;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  width: 80%;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

input[type="button"] {
  width: 50%;
  background-color: #cc5704;
  color: white;
  cursor: pointer;
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
  