import React, { FC, useEffect, useState } from "react";
import "./App.css";
import { fetchAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./application/ui/atoms/Card/Card";
import Navbar from "./application/ui/atoms/Navbar/Navbar";

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

const App: FC = () => {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<string[]>([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res: FetchPokemonData = await fetchAllPokemon(initialURL);
      await loadPokemon(res.results);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data: Pokemon[]) => {
    const _pokemonData: string[] = await Promise.all(
      data.map((value, index) => {
        return getPokemon(value.url);
      })
    );
    setPokemonData(_pokemonData);
  };
  const handleNextPage = async () => {
    setLoading(true);
    let data = await fetchAllPokemon(nextURL);
    await loadPokemon(data.results);
    setLoading(false);
    setNextURL(data.next);
  };
  const handlePrevPage = async () => {
    setLoading(true);
    let data = await fetchAllPokemon(nextURL);
    await loadPokemon(data.results);
    setLoading(false);
    setNextURL(data.next);
  };

  return (
    <div className="App">
      <>
        <Navbar />
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
        )}
        <div className="btn">
          <button onClick={handlePrevPage}>前へ</button>
          <button onClick={handleNextPage}>次へ</button>
        </div>
      </>
    </div>
  );
};

export default App;
