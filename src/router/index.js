import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

const PokemonsContainer = defineAsyncComponent(() => import('./containers/PokemonsContainer.vue'));
const PokemonColorContainer = defineAsyncComponent(() => import('./containers/PokemonColorContainer.vue'));
const DetailPokemonContainer = defineAsyncComponent(() => import('./containers/DetailPokemonContainer.vue'));
const NotFoundContainer = defineAsyncComponent(() => import('./containers/NotFoundContainer.vue'));

const routes = [
  {
    path: '/',
    component: PokemonsContainer
  },
  {
    path: '/:queryPoke/:id',
    component: PokemonColorContainer
  },
  {
    path: '/pokemon/:id/:name',
    component: DetailPokemonContainer
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundContainer
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
