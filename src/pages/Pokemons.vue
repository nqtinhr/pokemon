<template>
  <div>
    <div class="row">
      <PokemonItem
        v-for="(pokemon, index) in store.pokemons"
        :key="pokemon.url || index"
        :name="pokemon.name"
        :url="pokemon.url"
      />
    </div>
    <Loading :loading="store.loading" />
  </div>
</template>

<script setup>
import Loading from '@/components/Loading.vue';
import PokemonItem from '@/components/PokemonItem.vue';
import { usePokemonStore } from '@/store/pokemonStore';
import { onMounted, onUnmounted } from 'vue';

const store = usePokemonStore();

const fetchInitialData = () => {
  store.fetchPokemons();
};

onMounted(() => {
  fetchInitialData();
  const elHeight = document.getElementById('nav').clientHeight;

  const handleScroll = () => {
    if (
      store.pokemons.length &&
      store.nextUrl &&
      document.documentElement.scrollHeight - window.innerHeight <= window.scrollY + 10
    ) {
      console.log('fetch next page', store.nextUrl);
      setTimeout(() => store.fetchPokemons(store.nextUrl), 500);
    }
  };

  window.addEventListener('scroll', handleScroll);

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>
