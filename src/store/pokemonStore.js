import { API_COLOR_POKE, API_EGG_POKE, API_FETCH_POKEMONS, API_HABITAT_POKE } from '@/constants/urlApi';
import axios from 'axios';
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
    async fetchPokemons(url= null) {
      this.loading = true;
      try {
        const params = url ? {} : { offset: 0, limit: 28 };
        const response = await axios.get(url || API_FETCH_POKEMONS, { params });
        this.pokemons = [...this.pokemons, ...response.data.results];
        this.nextUrl = response.data.next;
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
        const response = await axios.get(`${API_FETCH_POKEMONS}/${id}`);
        this.pokemonInfo[id] = response.data;
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
          color: API_COLOR_POKE,
          egg: API_EGG_POKE,
          habitat: API_HABITAT_POKE,
        };

        if (!apiMap[nameMenu]) throw new Error(`Invalid menu name: ${nameMenu}`);

        const response = await axios.get(apiMap[nameMenu]);
        this.listItemsMenu[nameMenu] = response.data.results || [];
      } catch (error) {
        console.error(`Lỗi khi lấy dữ liệu ${nameMenu}:`, error);
      } finally {
        this.loading = false;
      }
    },
  },
});
