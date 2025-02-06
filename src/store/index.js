import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    loading: false,
  }),
  actions: {
    async fetchPokemons() {
      this.loading = true;
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        this.pokemons = response.data.results;
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      } finally {
        this.loading = false;
      }
    },
  },
});
