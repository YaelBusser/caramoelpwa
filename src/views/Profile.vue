<template>
  <div class="hero">
    <img :src=" `http://192.168.68.29/img/profile.jpg`" class="img-hero">
  </div>
  <div class="main">
    <div class="sub-main">
      <h3 class="hero-h3">{{ getUser.firstname }} {{ getUser.name }}</h3>
      <div class="buttons">
        <button>
          <i class="fa-solid fa-list"></i>
          Mes commandes
        </button>
        <router-link to="/profileInfos">
          <button>
            <i class="fa-regular fa-user"></i>
            Mes informations
          </button>
        </router-link>
        <button @click="logout" class="deco">se déconnecter</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Profile",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
  methods: {
    logout() {
      this.$store.commit('setUser', null);
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.buttons button {
  width: 100%;
  background-color: white;
  border: 1px solid #ee7017;
  font-family: 'Roboto';
  font-weight: 400;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
}

a {
  text-decoration: none;
}

.deco {
  bottom: 0;
  width: 100%;
  border: 1px solid #ee7017;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: 'Roboto';
  font-weight: 300!important;
  display: flex;
  margin-top: 50px;
  justify-content: center!important;
}

p {
  color: black;
  font-family: Bahnschrift;
  margin-block-start: 0;
  margin-block-end: 0;
  text-align: center;
  padding: 0.5rem;
}

.deco button {
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
  color: #ee7017;
  border: 0;
  letter-spacing: 5px;
  text-transform: uppercase;
}

.labelFor {
  display: flex;
  gap: 50px;
  justify-content: start;
  align-items: center;
}

.labelFor p:nth-child(1) {
  color: rgba(0, 0, 0, 0.9);
  width: 81px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.labelFor p:nth-child(2) {
  text-align: left;
  font-size: 13px;
}

.blockUserInfos {
  width: 100%;
  position: relative;
  background-color: #f8f8f8;
  width: 100%;
  border-radius: 10px;
}

.blockUserInfos i {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ee7017;
  font-size: 15px;
}
</style>