import axiosInstance from "./axiosInstance";

const pokeApi = {
    getColorPokemons(){
      return axiosInstance.get(`/pokemon-color`);
    },
    getEggPokemons(){
      return axiosInstance.get(`/egg-group`);
    },
    getHabitatPokemons(){
      return axiosInstance.get(`/pokemon-habitat`);
    },
  };
  
  export default pokeApi;