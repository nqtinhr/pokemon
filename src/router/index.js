import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const Pokemons = defineAsyncComponent(() => import('@/pages/Pokemons.vue'))
const PokemonAttribute = defineAsyncComponent(() => import('@/pages/PokemonAttribute.vue'))
const PokemonDetail = defineAsyncComponent(() => import('@/pages/PokemonDetail.vue'))
const NotFound = defineAsyncComponent(() => import('@/pages/NotFound.vue'))

const routes = [
  {
    path: '/',
    component: Pokemons
  },
  {
    path: '/:queryPoke/:id',
    component: PokemonAttribute
  },
  {
    path: '/pokemon/:id/:name',
    component: PokemonDetail
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
