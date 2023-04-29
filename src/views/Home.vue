<template>
  <div class="space-top-main"></div>
  <div class="main-home">
    <div class="sub-main-home">
      <div class="card-home">
        <img src="https://i.ibb.co/4fnbvsR/logo-Caramoel-clair.png" class="logo">

      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      commerces: [],
    }
  },
  mounted() {
    this.fetchCommerces();
  },
  methods: {
    fetchCommerces() {
      fetch("http://192.168.68.29/api/listeCommerce")
          .then(response => response.json())
          .then(data => {
            this.commerces = data;
          }).catch(error => {
        console.log(error);
      });
    },
  },
}
</script>

<style scoped>
.card-home {
  width: 100%;
  height: 180px;
  border-radius: 30px;
  background: url("https://i.ibb.co/tK4sYk5/Capture-d-cran-2023-04-29-060355.png") no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
}
.logo{
  width: 100px;
  height: 100px;
  margin-top: 20px;
  clip-path: inset(0px 0px 35px);
}
h1{
  text-transform: uppercase;
  font-family: Roboto;
  font-weight: 300;
  letter-spacing: 2px;
  color: #6c211c;
}
</style>