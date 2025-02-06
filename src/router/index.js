import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const Pokemons = defineAsyncComponent(() => import('../pages/Pokemons.vue'));
const PokemonColor = defineAsyncComponent(() => import('../pages/PokemonColor.vue'));
const PokemonDetail = defineAsyncComponent(() => import('../pages/PokemonDetail.vue'));
const NotFound = defineAsyncComponent(() => import('../pages/NotFound.vue'));

const routes = [
  {
    path: '/',
    component: Pokemons
  },
  {
    path: '/:queryPoke/:id',
    component: PokemonColor
  },
  {
    path: '/pokemon/:id/:name',
    component: PokemonDetail
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
