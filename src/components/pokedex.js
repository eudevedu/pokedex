import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSort, setSelectedSort] = useState('name');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}type`);
        setTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        let url = `${API_BASE_URL}pokemon?limit=20`;
        if (selectedType) {
          url = `${API_BASE_URL}type/${selectedType}`;
        }
        const response = await axios.get(url);
        const data = selectedType
          ? response.data.pokemon.map((entry) => entry.pokemon)
          : response.data.results;

        const enrichedData = await Promise.all(
          data.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              url: pokemon.url,
              type: res.data.types.map((t) => t.type.name).join(', '),
            };
          })
        );

        setPokemons(enrichedData);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [selectedType]);

  // Ordenar osPokémon com base no critério selecionado
  const sortedPokemons = [...pokemons].sort((a, b) => {
    if (selectedSort === 'name') {
      return a.name.localeCompare(b.name);
    } else if (selectedSort === 'type') {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  return (
    <div className="flex flex-col items-center">
      {/* Filtros */}
      <div className="flex gap-5 mb-5">
        <select
          className="p-2 border-2 border-blue-500 rounded-md bg-white"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Filtrar por Tipo</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
        <select
          className="p-2 border-2 border-blue-500 rounded-md bg-white"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="name">Ordenar por Nome</option>
          <option value="type">Ordenar por Tipo</option>
        </select>
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {loading ? (
          <p className="col-span-full text-center text-gray-600">Carregando...</p>
        ) : (
          sortedPokemons.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
          ))
        )}
      </div>
    </div>
  );
};

export default Pokedex;
