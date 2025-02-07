import { defineStore } from "pinia";
import pokeApi from "@/api/pokemonApi";

export const usePokemonMenuStore = defineStore("pokemonMenu", {
  state: () => ({
    loading: false,
    listItems: {
      color: [],
      egg: [],
      habitat: [],
    },
  }),
  actions: {
    async fetchDataPokeMenu(nameMenu) {
      if (this.listItems[nameMenu].length) return; 
      this.loading = true;
      try {
        let data;
        switch (nameMenu) {
          case "color":
            data = await pokeApi.getColorPokemons();
            break;
          case "egg":
            data = await pokeApi.getEggPokemons();
            break;
          case "habitat":
            data = await pokeApi.getHabitatPokemons();
            break;
          default:
            throw new Error(`Invalid menu name: ${nameMenu}`);
        }

        this.listItems[nameMenu] = data.results || [];
      } catch (error) {
        console.error(`Lỗi khi lấy dữ liệu ${nameMenu}:`, error);
      } finally {
        this.loading = false;
      }
    },
  },
});
