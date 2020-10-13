import axios from 'axios';

const getPokelist = async (type) => {
    try {
        const response = await axios({
            url: `https://api.pokemontcg.io/v1/cards`,
            method: 'get'
          });
          return response
    } catch (error) {
        throw error;
    }
}

const getPokemon = async (type) => {
    try {
        const response = await axios({
            url: `https://api.pokemontcg.io/v1/cards/${type}`,
            method: 'get'
          });
          return response
    } catch (error) {
        throw error;
    }
}


export { getPokelist, getPokemon }