<template>
  <router-link to="/panier" v-if="getUser && $route.path !== '/panier'" class="shop">
    <i class="fa-solid fa-cart-shopping"></i>
  </router-link>
  <header class="header" :class="{ 'scrolled': scrolled }">
    <i v-if="$route.path === '/' && toggleMenu === false" class="fa-solid fa-bars"
       :class="{ 'icon-scrolled': scrolled }" @click="animMenu"></i>
    <i v-if="$route.path !== '/'" class="fa-solid fa-arrow-left" :class="{ 'icon-scrolled': scrolled }"
       @click="back(); animBack()"></i>
    <h2 :class="{ 'h2-scrolled': scrolled }" :style="$route.path === '/' ? 'color: black' : ''">{{ h2 }}</h2>
  </header>
  <div class="menu" :style="toggleMenu ? 'width: 100%; opacity: 1; z-index: 999;' : 'opacity: 0; z-index: -1;'">
    <i class="fa-solid fa-xmark" @click="animMenu"></i>
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.changedRoute();
  },
  watch: {
    '$route.path'(to, from) {
      this.changedRoute();
    },
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
        case "/profile":
          this.h2 = "Profil";
          break;
          case "/panier":
          this.h2 = "Panier";
          break;
        case "/resto":
          this.h2 = "Restaurants";
          break;
        case "/produits":
          this.h2 = "Cuisines";
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
    nbProductsInCart() {
      return this.nbTab.length;
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>
.nb {
  position: absolute;
  background-color: red;
  color: white;
  top: -3px;
  right: 8px;
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 7px;
  border-radius: 50%;
  font-family: 'Roboto';
  font-weight: 900;
}

.fa-xmark {
  position: absolute;
  top: 15px;
  left: 12px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
  background-color: white;
  border-radius: 50%;
  color: #ee7017;
}

.shop {
  position: fixed;
  right: 10px;
  top: 13px;
  z-index: 103;
  border-radius: 50%;
}

.shop i {
  font-size: 20px;
  color: #ee7017;
  cursor: pointer;
  background-color: white;
  padding: 0.9rem;
  border-radius: 50%;
}

h1 {
  font-size: 45px;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-family: Roboto;
  font-weight: 300;
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
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10%;
}

.menu i {
  position: absolute;
  top: 20px;
  left: 20px;
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
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 50%;
}

.menu {
  position: fixed;
  width: 0;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  background: url("https://i.ibb.co/tK4sYk5/Capture-d-cran-2023-04-29-060355.png") no-repeat;
  background-size: cover;
  z-index: -1;
}

.header {
  width: 100%;
  min-width: 100%;
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
  z-index: 102;
}

h2 {
  width: 100%;
  position: absolute;
  top: 2px;
  text-align: center;
  z-index: 1;
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
  z-index: 102;
  text-align: center;
}

.scrolled {
  background-color: white;
}

.icon-scrolled {
  background-color: rgba(0, 0, 0, 0);
}

.h2-scrolled {
  color: black;
}
</style>