<template>
  <div v-if="pokemon" class="columns detail-poke-init">
    <div class="pokemon column">
      <div class="card has-text-weight-bold has-text-white card--blastoise">
        <div class="title">
          Info {{ pokemon.name }}
          <img
            v-if="pokemon.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default"
            :src="pokemon.sprites.versions['generation-v']['black-white'].animated.front_default"
            alt="Pokemon Sprite"
          />
          <img v-else-if="pokemon.sprites?.front_default" :src="pokemon.sprites.front_default" alt="Pokemon Sprite" />
        </div>

        <div class="content-info-detail-poke">
          <div class="info-detail-poke-item">
            <div class="cate-info">
              Color:
              <span v-if="speciesData?.color" class="value-cate-info">
                <router-link
                  :to="`/pokemon-color/${getIdFromUrl(speciesData.color.url)}`"
                  :style="{ color: speciesData.color.name }"
                >
                  {{ speciesData.color.name }}
                </router-link>
              </span>
            </div>

            <div class="cate-info">
              Exp: <span class="value-cate-info" style="color: #64fc64">{{ pokemon.base_experience }} xp</span>
            </div>

            <div class="cate-info">
              Egg groups:
              <span v-if="speciesData?.egg_groups" class="value-cate-info">
                <template v-for="(item, index) in speciesData.egg_groups" :key="item.url">
                  <router-link :to="`/egg-group/${getIdFromUrl(item.url)}`">
                    {{ item.name }} {{ index !== 0 ? ', ' : '' }}
                  </router-link>
                </template>
              </span>
            </div>

            <div class="cate-info">
              Habitat:
              <span v-if="speciesData?.habitat" class="value-cate-info">
                <router-link :to="`/pokemon-habitat/${getIdFromUrl(speciesData.habitat.url)}`">
                  {{ formatHabitat(speciesData.habitat.name) }}
                </router-link>
                {{ getHabitatEmoji(speciesData.habitat.name) }}
              </span>
              <span v-else class="value-cate-info">❔</span>
            </div>

            <div class="cate-info">
              Hatching eggs time:
              <span class="value-cate-info">{{ speciesData?.hatch_counter }} Day</span>
            </div>

            <div class="cate-info">
              Evolution:
              <span class="value-cate-info">
                <EvolutionPoke
                  v-if="speciesData?.evolves_from_species"
                  :namePoke="speciesData.evolves_from_species.name"
                  :apiEvolutionPoke="speciesData.evolves_from_species.url"
                />
                <span v-else>🥚</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { usePokemonStore } from '@/store/pokemonStore';
import { useRoute } from 'vue-router';
import EvolutionPoke from '@/components/EvolutionPoke.vue';
import axios from 'axios';

const store = usePokemonStore();
const route = useRoute();
const speciesData = ref(null);

const speciesUrl = computed(() => store.pokemonInfo[route.params.id]?.species?.url);
const pokemon = computed(() => store.pokemonInfo[route.params.id]);

const getIdFromUrl = (url) => url.split('/').slice(-2, -1)[0];

const formatHabitat = (name) => name.replace('-', ' ');

const getHabitatEmoji = (habitat) => {
  const habitatIcons = {
    cave: '🕳️',
    forest: '🌲',
    grassland: '🌿',
    rare: '💫',
    'rough-terrain': '🎢',
    sea: '🌊',
    urban: '🏰',
    'waters-edge': '🏖️',
    mountain: '⛰️',
  };
  return habitatIcons[habitat] || '❔';
};

onMounted(async () => {
  if (speciesUrl.value) {
    try {
      const response = await axios.get(speciesUrl.value);
      speciesData.value = response.data;
      console.log('Species Data:', speciesData.value);
    } catch (error) {
      console.error('Error fetching species data:', error);
    }
  }
});
</script>
