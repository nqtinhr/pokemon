<template>
  <div class="poke-card">
    <div class="poke-card__inner">
      <div
        class="poke-card__artwork"
        :style="{ backgroundImage: `url(${bgImage})` }"
        @mouseover="changeBg(true)"
        @mouseout="changeBg(false)"></div>

      <!-- Thông tin Pokemon -->
      <div class="poke-card__body row">
        <div class="poke-card__avatar" :style="{ backgroundImage: `url(${avatar})` }"></div>
        <div class="poke-card__details">
          <RouterLink :to="`/pokemon/${pokemonId}/${name}`" class="poke-card__title" :title="name">
            {{ name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'
import { API_FETCH_POKEMON_DETAIL_IMG } from '@/constants/urlApi'

const props = defineProps({
  name: String,
  url: String
})

const pokemonId = computed(() => props.url.split('/').slice(-2, -1)[0])

const imgPokemon = (id) => `${API_FETCH_POKEMON_DETAIL_IMG}/versions/generation-v/black-white/animated/${id}.gif`
const imgPokemonSp = (id) => `${API_FETCH_POKEMON_DETAIL_IMG}/${id}.png`
const bgImgPokemon = (id) => `${API_FETCH_POKEMON_DETAIL_IMG}/other/dream-world/${id}.svg`
const bgImgPokemonSp = (id) => `${API_FETCH_POKEMON_DETAIL_IMG}/other/official-artwork/${id}.png`

const bgImage = ref(bgImgPokemonSp(pokemonId.value))
const avatar = ref(imgPokemon(pokemonId.value) || imgPokemonSp(pokemonId.value))

const changeBg = (hover) => {
  bgImage.value = hover ? bgImgPokemon(pokemonId.value) : bgImgPokemonSp(pokemonId.value)
}
</script>
