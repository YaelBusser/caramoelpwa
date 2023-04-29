import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Restaurants from "../views/Restaurants.vue";
import Connexion from "../views/Connexion.vue";
import Inscription from "../views/Inscription.vue";
import Profile from "../views/Profile.vue";
import Commandes from "../views/Commandes.vue";
import Produits from "../views/Produits.vue";
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
        name: 'Commandes',
        path: '/commandes/:id',
        component: Commandes,
    },
    {
        name: 'Produits',
        path: '/produits',
        component: Produits,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;