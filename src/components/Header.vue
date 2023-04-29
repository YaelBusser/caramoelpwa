<template>
  <header class="header" :class="{ 'scrolled': scrolled }">
    <i v-if="toggleMenu" class="fa-solid fa-xmark" :class="{ 'icon-scrolled': scrolled }" @click="animMenu"></i>
    <i v-if="$route.path === '/' && toggleMenu === false" class="fa-solid fa-bars"
       :class="{ 'icon-scrolled': scrolled }" @click="animMenu"></i>

    <i v-if="$route.path !== '/'" class="fa-solid fa-arrow-left" :class="{ 'icon-scrolled': scrolled }"
       @click="back(); animBack()"></i>

    <img src="https://i.ibb.co/gyP5VF3/logo-caramoel.png" :class="{ 'img-scrolled': scrolled }">
    <h2 :class="{ 'h2-scrolled': scrolled }" :style="$route.path === '/' ? 'color: black' : ''">{{ h2 }}</h2>
    <div class="menu" :style="toggleMenu ? 'width: 100%; opacity: 1; z-index: 100;' : 'opacity: 0; z-index: -1;'">
      <nav class="nav">
        <h1>caramoël</h1>
        <div class="nav-link">
          <router-link to="/" @click="animMenu">
            <div class="item">
              <i class="fa-solid fa-house"></i>
            </div>
          </router-link>
          <router-link to="/resto" @click="animMenu">
            <div class="item">
              <i class="fa-solid fa-utensils"></i>
            </div>
          </router-link>
          <router-link to="/connexion" v-if="!getUser" @click="animMenu">
            <div class="item">
              <i class="fa-solid fa-user"></i>
            </div>
          </router-link>
          <router-link to="/profile" v-else @click="animMenu">
            <div class="item">
              <i class="fa-solid fa-user"></i>
            </div>
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
import {mapGetters} from "vuex";

window.setInterval(function () {
  if (this.handleScroll) {
    this.handleScroll();
  }
}, 0);
export default {
  data() {
    return {
      scrolled: false,
      h2: "",
      toggleMenu: false,
      toggleBack: false,
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    handleScroll() {
      if (scrollY !== 0) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
      }
    },
    changedRoute() {
      switch (this.$route.path) {
        case "/resto":
          this.h2 = "Restaurants";
          break;
        case "/produits":
          this.h2 = "Produits";
          break;
        case "/":
          this.h2 = "Accueil";
          break;
      }
    },
    animMenu() {
      this.toggleMenu = !this.toggleMenu;
    },
    animBack() {
      this.toggleBack = !this.toggleBack;
    },
  },
  computed: {
    ...mapGetters(['getUser',]),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.changedRoute();
  },
  watch: {
    '$route.path'(to, from) {
      this.changedRoute();
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
h1 {
  font-size: 50px;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-family: Roboto;
  font-weight: 100;
  color: white;
}

.item {
  display: flex;
  gap: 20px;
  font-size: 30px;
}

a {
  text-decoration: none;
  color: black;
}

.nav {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.nav-link {
  display: flex;
  gap: 20px;
}

.item i {
  position: relative;
  color: #ee7017;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  width: 30px;
  height: 35px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  position: fixed;
  width: 0;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  transition: all 0.3s ease-in-out;
  background: url("https://i.ibb.co/tK4sYk5/Capture-d-cran-2023-04-29-060355.png") no-repeat;
  background-size: cover;
}

.header {
  width: 100%;
  max-width: 100%;
  height: 10vh;
  background-color: white;
  display: flex;
  justify-content: start;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.3s ease-in-out;
  border-radius: 0 0 30px 30px;
  z-index: 101;
}

h2 {
  width: 100%;
  position: absolute;
  top: 2px;
  text-align: center;
  z-index: 99;
}

header img {
  width: 50px;
  z-index: 100;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  position: absolute;
  right: 10px;
}

header i {
  color: #ee7017;
  font-size: 20px;
  cursor: pointer;
  background-color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  position: absolute;
  left: 10px;
  top: 13px;
  z-index: 101;
  text-align: center;
}

.scrolled {
  background-color: white;
}

.img-scrolled {
  opacity: 1;

}

.icon-scrolled {
  background-color: rgba(0, 0, 0, 0);
}

.h2-scrolled {
  color: black;
}
</style>