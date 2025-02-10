<template>
  <LazyLoad height="200" :once="true" :placeholder="loadingComponent">
    <div class="row">
      <PokemonItem v-for="item in store.pokemons" :key="item" v-bind="item" />
    </div>
  </LazyLoad>
  <Loading v-if="store.loading" />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePokemonStore } from '@/store/pokemonStore';
import LazyLoad from 'vue-lazyload';
import Loading from '@/components/Loading.vue';
import PokemonItem from '@/components/PokemonItem.vue';

const route = useRoute();
const store = usePokemonStore();

onMounted(() => {

});
</script>

