<template>
  <ul v-if="store.listItemsMenu[nameMenu]">
    <li v-for="item in store.listItemsMenu[nameMenu]" :key="item" class="nav__dropdown__item">
      <RouterLink
        :to="`/${getSegment(item.url, -3)}/${getSegment(item.url, -2)}`"
        @mouseover="changeBgStyle($event, item.name)"
        @mouseout="changeBgStyle($event, '#ffff')">
        {{ item.name }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup>
import { usePokemonStore } from '@/store/pokemonStore'
import { defineProps, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  nameMenu: String
})

const store = usePokemonStore()

const changeBgStyle = (event, color) => {
  event.target.style.color = color
}

const getSegment = (url, position) => {
  const segments = url.split('/')
  return segments[segments.length + position]
}

onMounted(() => {
  store.fetchDataPokeMenu(props.nameMenu)
})
</script>
