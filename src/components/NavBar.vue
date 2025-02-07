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
              <ListMenuItem :nameMenu="menu.name" />
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

<script setup>
import LogoPoke from "@/assets/logo.png";
import { ref } from "vue";
import ListMenuItem from "./ListMenuItem.vue";

const menuItems = ref([
  { title: "color", name: "color" },
  { title: "egg groups", name: "egg" },
  { title: "habitat", name: "habitat" },
]);
</script>

