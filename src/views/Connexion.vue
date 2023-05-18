<template>
  <div class="block">
    <div class="container">
      <img src="https://i.ibb.co/gyP5VF3/logo-caramoel.png"/>
      <input type="email" placeholder="Adresse mail" v-model="email"/>
      <input type="password" placeholder="Mot de passe" v-model="mdp"/>
      <input type="button" value="Se connecter" @click="login"/>
      <p>Pas encore inscris ? Clique
        <router-link to="/inscription">ici</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import store from "../../store.js";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      email: "",
      mdp: "",
    };
  },
  mounted() {
    if (this.getUser) {
      this.$router.push('/profile')
    }
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
  methods: {
    path() {
      return path
    },
    async login() {
      const response = await fetch("http://192.168.68.29/api/users");
      const users = await response.json();

      // Recherche de l'utilisateur correspondant au nom d'utilisateur entré
      const user = users.find((u) => u.email === this.email);

      if (!user) {
        alert("Nom d'utilisateur incorrect");
        return;
      }

      // Vérification du mot de passe en comparant le hash enregistré avec le mot de passe entré
      const match = await bcrypt.compare(this.mdp, user.password);
      if (!match) {
        alert("Mot de passe incorrect");
        return;
      }
      // Si tout est OK, on stocke les informations de l'utilisateur dans l'état global
      this.$store.commit('setUser', user);
      // Si tout est OK, on redirige l'utilisateur vers la page de son espace membre
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.block {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
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
  background-color: #ee7017;
  color: white;
  border-radius: 10px;
  padding: 1rem;
  width: 80%;
}

input {
  background-color: white;
  padding: 1rem;
  width: 80%;
  border: none;
  border-radius: 10px;
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
  background-color: white;
  border-radius: 50%;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
  padding-left: 0.9rem;
  padding-right: 0.9rem;
}

a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
</style>
  