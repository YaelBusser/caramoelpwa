import {createRouter, createWebHistory} from "vue-router";
import Home from "/src/views/Home.vue";
import Restaurants from "/src/views/Restaurants.vue";
import Connexion from "/src/views/Connexion.vue";
import Inscription from "/src/views/Inscription.vue";
import Profile from "/src/views/Profile.vue";
import Panier from "/src/views/Panier.vue";
import Produits from "/src/views/Produits.vue";
import ProfileInfos from "/src/views/ProfileInfos.vue";
const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home,
    },
    {
        name: 'Restaurants',
        path: '/resto',
        component: Restaurants,
    },
    {
        name: 'Connexion',
        path: '/connexion',
        component: Connexion,
    },
    {
        name: 'Inscription',
        path: '/inscription',
        component: Inscription,
    },
    {
        name: 'Profile',
        path: '/profile',
        component: Profile,
    },
    {
        name: 'Panier',
        path: '/panier',
        component: Panier,
    },
    {
        name: 'Produits',
        path: '/produits',
        component: Produits,
    },
    {
        name: 'ProfileInfos',
        path: '/profileInfos',
        component: ProfileInfos,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;