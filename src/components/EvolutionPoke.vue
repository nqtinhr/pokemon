<template>
  <div v-if="pokemonEvolution">
    <router-link :to="`/pokemon/${pokemonEvolution.id}/${namePoke}`">
      <img
        v-if="pokemonEvolution.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default"
        :src="pokemonEvolution.sprites.versions['generation-v']['black-white'].animated.front_default"
        alt="Evolution Sprite" />
      <img
        v-else-if="pokemonEvolution.sprites?.front_default"
        :src="pokemonEvolution.sprites.front_default"
        alt="Evolution Sprite" />
    </router-link>
  </div>
  <Loading v-else :loading="true" />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePokemonStore } from '@/store/pokemonStore'
import Loading from '@/components/Loading.vue'

const props = defineProps({
  namePoke: String // Tên Pokémon tiến hóa
})

const store = usePokemonStore()

const pokemonEvolution = computed(() => store.pokemonInfo[props.namePoke] || null)

onMounted(() => {
  if (!pokemonEvolution.value) {
    store.fetchPokemonById(props.namePoke)
  }
})
</script>
