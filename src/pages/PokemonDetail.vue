<template>
    <div v-if="pokemon">
      <div class="container-detail-poke">
        <i class="btn-back fa-solid fa-arrow-circle-left" @click="goBack"></i>
        <div class="columns">
          <div class="pokemon column">
            <div class="card has-text-weight-bold has-text-white card--blastoise">
              <div class="card-image">
                <div class="card-image-container">
                  <img
                    v-if="pokemon.sprites?.other"
                    :src="
                      pokemon.sprites.other.dream_world.front_default ||
                      pokemon.sprites.other['official-artwork'].front_default
                    "
                    alt="Pokemon Image"
                  />
                </div>
              </div>
              <div class="card-content has-text-centered">
                <div class="main">
                  <div class="title has-text-white">{{ pokemon.name }}</div>
                  <div class="group-info-poke">
                    <div
                      v-for="(item, index) in pokemon.stats"
                      :key="index"
                      class="item-info-poke"
                    >
                      {{ item.stat.name }}: {{ item.base_stat }}
                      <div class="hp" :style="{ width: item.base_stat + 'px' }"></div>
                    </div>
                  </div>
                </div>
                <div class="stats columns">
                  <div class="column has-text-centered">
                    <span v-if="pokemon.types">
                      <template v-for="item in pokemon.types" :key="item.type.name">
                        {{ getTypeEmoji(item.type.name) }}
                      </template>
                    </span>
                    <br />
                    <span class="tag">Type</span>
                  </div>
                  <div class="column has-text-centered center-column">
                    <span class="color-white">{{ pokemon.weight }} lbs</span>
                    <br />
                    <span class="tag">Weight</span>
                  </div>
                  <div class="column has-text-centered">
                    <span class="color-white">{{ pokemon.height }} m</span>
                    <br />
                    <span class="tag">Height</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DetailPoke />
      </div>
      <Loading :loading="store.loading" />
    </div>
  </template>
  
  <script setup>
  import Loading from '@/components/Loading.vue';
import { usePokemonStore } from '@/store/pokemonStore';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DetailPoke from '@/components/DetailPoke.vue';

  const route = useRoute();
  const router = useRouter();
  const store = usePokemonStore();
  const pokemon = computed(() => store.pokemonInfo[route.params.id]);
  
  const getTypeEmoji = (type) => {
    const typeEmojis = {
      fire: '🔥',
      grass: '🌳',
      poison: '☠️',
      flying: '✈️',
      bug: '🐞',
      fighting: '⚔️',
      ground: '⛰️',
      rock: '🗿',
      ghost: '👻',
      steel: '🔪',
      electric: '⚡',
      psychic: '🔮',
      ice: '❄️',
      dragon: '🐉',
      dark: '⚫',
      fairy: '🧚🏻‍♀️',
      unknown: '❔',
      normal: '😐',
      shadow: '👥',
      water: '💧',
    };
    return typeEmojis[type] || '❔';
  };
  
  const goBack = () => {
    router.go(-1);
  };
  
  onMounted(() => {
    store.fetchPokemonById(route.params.id);
  });
  </script>
  