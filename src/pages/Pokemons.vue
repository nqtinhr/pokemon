<template>
  <div>
    <div class="row">
      <PokemonItem
        v-for="(pokemon, index) in pokemons"
        :key="pokemon.url || index"
        :name="pokemon.name"
        :url="pokemon.url"
      />
    </div>
    <Loading :loading="loading" />
  </div>
</template>

<script setup>
import Loading from '@/components/Loading.vue';
import PokemonItem from '@/components/PokemonItem.vue';
import { usePokemonStore } from '@/store/pokemonStore';
import { onMounted } from 'vue';

const pokemonStore = usePokemonStore();
const { pokemons, loading, fetchPokemons } = pokemonStore;

onMounted(() => {
  fetchPokemons();
});
</script>
