<template>
  <div ref="lazyContainer">
    <div v-if="isVisible" class="row">
      <PokemonItem v-for="item in pokemons" :key="item.name" v-bind="item" />
    </div>
    <Loading v-if="store.loading" />
  </div>
</template>

<script setup>
import Loading from '@/components/Loading.vue';
import PokemonItem from '@/components/PokemonItem.vue';
import { API_POKEMONS } from '@/constants/urlApi';
import { usePokemonStore } from '@/store/pokemonStore';
import { useIntersectionObserver } from '@vueuse/core';
import axios from 'axios';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const lazyContainer = ref(null);
const isVisible = ref(false);
const route = useRoute();
const store = usePokemonStore();
const pokemons = ref([]);

useIntersectionObserver(lazyContainer, ([{ isIntersecting }]) => {
  if (isIntersecting) isVisible.value = true;
});

const fetchPokemonData = async (queryPoke, id) => {
  try {
    const response = await axios.get(`${API_POKEMONS}/${queryPoke}/${id}`);
    pokemons.value = response.data?.pokemon_species || [];
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
};

watch(() => route.params, (newParams) => {
  if (!newParams.queryPoke || !newParams.id) return;
  fetchPokemonData(newParams.queryPoke, newParams.id);
}, { immediate: true });
</script>
