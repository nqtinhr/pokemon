<template>
  <nav class="nav" id="nav">
    <div class="nav__inner container">
      <div class="nav__section">
        <router-link class="nav__logo__text" to="/">
          <img :src="LogoPoke" alt="" class="logo" />
        </router-link>
      </div>
      <div class="nav__section">
        <ul class="nav__menu">
          <li
            class="nav__menu__item"
            v-for="(menu, index) in menuItems"
            :key="index"
          >
            <span class="nav__menu__item__title">{{ menu.title }}</span>
            <ul class="nav__menu__item__dropdown">
              <ListMenuItem :apiListMenu="menu.api" :nameMenu="menu.name" />
            </ul>
          </li>
        </ul>
      </div>
      <div class="nav__section">
        <div class="nav-search">
          <button class="nav-search__icon">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <input class="nav-search__input" type="text" placeholder="Search" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
import ListMenuItem from "./ListMenuItem.vue";
import {
  API_COLOR_POKE,
  API_EGG_POKE,
  API_HABITAT_POKE,
} from "../constants/urlApi";
import LogoPoke from "../assets/logo.png";

export default defineComponent({
  components: {
    ListMenuItem,
  },
  data() {
    return {
      LogoPoke,
      menuItems: [
        { title: "color", api: API_COLOR_POKE, name: "color" },
        { title: "egg groups", api: API_EGG_POKE, name: "egg" },
        { title: "habitat", api: API_HABITAT_POKE, name: "habitat" },
      ],
    };
  },
});
</script>
