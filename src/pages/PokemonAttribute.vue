<template>
  <div ref="lazyContainer">
    <div v-if="isVisible" class="row">
      <PokemonItem v-for="item in displayedPokemons" :key="item.name" v-bind="item" />
    </div>
    <Loading v-if="store.loading" />
  </div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core'
import axios from 'axios'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import Loading from '@/components/Loading.vue'
import PokemonItem from '@/components/PokemonItem.vue'
import { API_POKEMONS } from '@/constants/urlApi'
import { usePokemonStore } from '@/store/pokemonStore'

const lazyContainer = ref(null)
const isVisible = ref(false)
const route = useRoute()
const store = usePokemonStore()

const allPokemons = ref([])
const displayedPokemons = ref([])

// Số lượng mỗi lần load thêm
const batchSize = 28
const currentIndex = ref(0)

// Dùng IntersectionObserver để kiểm tra phần tử có hiển thị không
useIntersectionObserver(lazyContainer, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    isVisible.value = true
  }
})

const fetchPokemonData = async (queryPoke, id) => {
  try {
    store.loading = true
    const response = await axios.get(`${API_POKEMONS}/${queryPoke}/${id}`)
    allPokemons.value = response.data?.pokemon_species || []

    // Hiển thị lô đầu tiên
    displayedPokemons.value = allPokemons.value.slice(0, batchSize)
    currentIndex.value = batchSize
  } catch (error) {
    console.error('Lỗi khi gọi API Pokémon:', error)
  } finally {
    store.loading = false
  }
}

// Hàm load thêm dữ liệu khi cuộn xuống
const loadMore = () => {
  if (currentIndex.value >= allPokemons.value.length) return

  // Lấy batch mới
  const nextBatch = allPokemons.value.slice(currentIndex.value, currentIndex.value + batchSize)
  displayedPokemons.value.push(...nextBatch)
  currentIndex.value += batchSize
}

// Hàm kiểm tra scroll để load thêm
const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY
  const bottomThreshold = document.documentElement.scrollHeight - 10

  if (scrollPosition >= bottomThreshold && !store.loading) {
    loadMore()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
  () => route.params,
  (newParams) => {
    if (!newParams.queryPoke || !newParams.id) return
    fetchPokemonData(newParams.queryPoke, newParams.id)
  },
  { immediate: true }
)
</script>
