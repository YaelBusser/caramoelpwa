<template>
  <div class="container">
    <div class="userInfos">
      <div class="blockUserInfos">
        <i class="fa-solid fa-gear"></i>
        <div class="labelFor">
          <p>Prénom</p>
          <p>{{ getUser.firstname }}</p>
        </div>
        <div class="labelFor">
          <p>Nom</p>
          <p>{{ getUser.name }}</p>
        </div>
        <div class="labelFor">
          <p>Mail</p>
          <p>{{ getUser.email }}</p>
        </div>
        <div class="labelFor">
          <p>Téléphone</p>
          <p class="tel">{{ getUser.telephone }}</p>
        </div>
        <div class="labelFor">
          <p>Adresse</p>
          <p class="tel">{{ getUser.adresse }}</p>
        </div>
      </div>
    </div>
    <div class="deco">
      <button @click="logout">déconnexion</button>
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
.container {
  position: absolute;
  width: 100%;
  top: 8vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.userInfos, .deco {
  background-color: #6c211c;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 80%;
  padding: 1rem;
  border-radius: 10px;
}

p {
  color: #ecf5ff;
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
  color: rgba(255, 255, 255, 0.9);
  width: 81px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 5px;
}
.labelFor p:nth-child(2) {
  text-align: left;
  font-size: 13px;
}

.blockUserInfos {
  width: 100%;
  position: relative;
}
.blockUserInfos i{
  position: absolute;
  top: 0;
  right: 0;
  color: #ee7017;
  font-size: 20px;
}
</style>