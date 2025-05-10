<template>
  <div>
    <div class="row">
      <PokemonItem
        v-for="(pokemon, index) in store.pokemons"
        :key="pokemon.url || index"
        :name="pokemon.name"
        :url="pokemon.url" />
    </div>
    <Loading :loading="store.loading" />
  </div>
</template>

<script setup>
import Loading from '@/components/Loading.vue'
import PokemonItem from '@/components/PokemonItem.vue'
import { usePokemonStore } from '@/store/pokemonStore'
import { onMounted, onUnmounted, ref } from 'vue'

const store = usePokemonStore()
const isFetching = ref(false) // Ngăn chặn gọi API nhiều lần

const handleScroll = () => {
  if (isFetching.value || !store.nextUrl) return

  const scrollPosition = window.innerHeight + window.scrollY
  const bottomThreshold = document.documentElement.scrollHeight - 10

  if (scrollPosition >= bottomThreshold) {
    console.log('Fetching next page:', store.nextUrl)
    isFetching.value = true

    store.fetchPokemons(store.nextUrl).finally(() => {
      isFetching.value = false
    })
  }
}

onMounted(() => {
  if (store.pokemons.length === 0) {
    store.fetchPokemons()
  }
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
