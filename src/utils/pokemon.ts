import { FetchPokemonData } from "../App";

export const fetchAllPokemon = (url: string): Promise<FetchPokemonData> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

// todo promiseの方がおかしい
export const getPokemon = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      });
  });
};
