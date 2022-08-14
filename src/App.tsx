import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchAllPokemon, getPokemon } from "./utils/pokemon";

export interface Pokemon {
  name: string;
  url: string;
}

export interface FetchPokemonData {
  count: number;
  next: string;
  previous: any;
  results: Pokemon[];
}

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState<boolean>(true);
  const []

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res: FetchPokemonData = await fetchAllPokemon(initialURL);
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = (data: Pokemon[]) => {
    let _pokemonData = Promise.all(
      data.map((value, index) => {
        return getPokemon(value.url);
      })
    );
  };

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <h1>ポケモンデータを取得しました。</h1>
      )}
    </div>
  );
}

export default App;
