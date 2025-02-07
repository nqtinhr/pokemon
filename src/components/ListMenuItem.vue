<template>
  <ul v-if="listItems[nameMenu]">
    <li
      v-for="(item) in listItems[nameMenu]"
      :key="item"
      class="nav__dropdown__item"
    >
      <RouterLink
        :to="`/${getSegment(item.url, -3)}/${getSegment(item.url, -2)}`"
        @mouseover="changeBgStyle($event, item.name)"
        @mouseout="changeBgStyle($event, '#ffff')"
      >
        {{ item.name }}
      </RouterLink>
    </li>
  </ul>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { usePokemonMenuStore } from "@/store/pokemonMenuStore";

const props = defineProps({
  nameMenu: String,
});

const { fetchDataPokeMenu, listItems } = usePokemonMenuStore();

const changeBgStyle = (event, color) => {
  event.target.style.color = color;
};

const getSegment = (url, position) => {
  const segments = url.split("/");
  return segments[segments.length + position];
};

onMounted(() => {
  fetchDataPokeMenu(props.nameMenu);
});
</script>
