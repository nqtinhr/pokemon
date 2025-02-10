<template>
  <div v-if="pokemonDetail" class="columns detail-poke-init">
    <div class="pokemon column">
      <div class="card has-text-weight-bold has-text-white card--blastoise">
        <div class="title">
          Info {{ pokemonDetail.name }}
          <img
            v-if="pokemonDetail.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default"
            :src="pokemonDetail.sprites.versions['generation-v']['black-white'].animated.front_default"
            alt="Pokemon Sprite"
          />
          <img
            v-else-if="pokemonDetail.sprites?.front_default"
            :src="pokemonDetail.sprites.front_default"
            alt="Pokemon Sprite"
          />
        </div>

        <div class="content-info-detail-poke">
          <div class="info-detail-poke-item">
            <div class="cate-info">
              Color:
              <span v-if="pokemonDetail.color" class="value-cate-info">
                <router-link
                  :to="`/pokemon-color/${getIdFromUrl(pokemonDetail.color.url)}`"
                  :style="{ color: pokemonDetail.color.name }"
                >
                  {{ pokemonDetail.color.name }}
                </router-link>
              </span>
            </div>

            <div class="cate-info">
              Exp: <span class="value-cate-info" style="color: #64fc64">{{ pokemonDetail.base_experience }} xp</span>
            </div>

            <div class="cate-info">
              Egg groups:
              <span v-if="pokemonDetail.egg_groups" class="value-cate-info">
                <template v-for="(item, index) in pokemonDetail.egg_groups" :key="index">
                  <router-link :to="`/egg-group/${getIdFromUrl(item.url)}`">
                    {{ index !== 0 ? ', ' : '' }}{{ item.name }}
                  </router-link>
                </template>
              </span>
            </div>

            <div class="cate-info">
              Habitat:
              <span v-if="pokemonDetail.habitat" class="value-cate-info">
                <router-link :to="`/pokemon-habitat/${getIdFromUrl(pokemonDetail.habitat.url)}`">
                  {{ formatHabitat(pokemonDetail.habitat.name) }}
                </router-link>
                {{ getHabitatEmoji(pokemonDetail.habitat.name) }}
              </span>
              <span v-else class="value-cate-info">❔</span>
            </div>

            <div class="cate-info">
              Hatching eggs time:
              <span class="value-cate-info">{{ pokemonDetail.hatch_counter }} Day</span>
            </div>

            <div class="cate-info">
              Evolution:
              <span class="value-cate-info">
                <EvolutionPoke
                  v-if="pokemonDetail.evolves_from_species"
                  :namePoke="pokemonDetail.evolves_from_species.name"
                  :apiEvolutionPoke="pokemonDetail.evolves_from_species.url"
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
import { computed } from 'vue';
import { usePokemonStore } from '@/store/pokemonStore';
import { useRoute } from 'vue-router';
import EvolutionPoke from '@/components/EvolutionPoke.vue';

const store = usePokemonStore();
const route = useRoute();

const pokemonDetail = computed(() => store.pokemonInfo[route.params.name] || null);

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
</script>
