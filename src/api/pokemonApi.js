import axiosInstance from "./axiosInstance";

const pokeApi = {
    getPokemons(params){
      return axiosInstance.get(`/pokemon`, { params });
    },
    getPokemonById(id){
      return axiosInstance.get(`/pokemon/${id}`);
    },
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