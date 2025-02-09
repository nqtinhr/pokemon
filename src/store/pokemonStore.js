import pokeApi from '@/api/pokemonApi';
import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    loading: false,
    nextUrl: null,
    pokemons: [],
    pokemonInfo: {},
    listItemsMenu: {
      color: [],
      egg: [],
      habitat: [],
    },
  }),
  actions: {
    async fetchPokemons() {
      this.loading = true;
      try {
        const params = {
          limit: 24,
        };
        const data = await pokeApi.getPokemons(params);
        this.pokemons = [...this.pokemons, ...data.results]; 
        this.nextUrl = data.next;
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchPokemonById(id) {
      if (this.pokemonInfo[id]) return this.pokemonInfo[id];
      this.loading = true;
      try {
        const data = await pokeApi.getPokemonById(id);
        this.pokemonInfo[id] = data;
        return data;
      } catch (error) {
        console.error(`Get pokemon by id ${id} failed:`, error);
        return null;
      } finally {
        this.loading = false;
      }
    },
    async fetchDataPokeMenu(nameMenu) {
      if (this.listItemsMenu[nameMenu].length) return; 
      this.loading = true;
      try {
        const apiMap = {
          color: pokeApi.getColorPokemons,
          egg: pokeApi.getEggPokemons,
          habitat: pokeApi.getHabitatPokemons,
        };

        if (!apiMap[nameMenu]) throw new Error(`Invalid menu name: ${nameMenu}`);

        const data = await apiMap[nameMenu]();

        this.listItemsMenu[nameMenu] = data.results || [];
      } catch (error) {
        console.error(`Lỗi khi lấy dữ liệu ${nameMenu}:`, error);
      } finally {
        this.loading = false;
      }
    },
  },
});
