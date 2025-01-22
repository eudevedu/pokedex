import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0';
const API_BASE_URL_TYPE = 'https://pokeapi.co/api/v2/type';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSort, setSelectedSort] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all Pokémon types
    const fetchTypes = async () => {
      try {
        const response = await axios.get(API_BASE_URL_TYPE);
        setTypes(response.data.results);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    // Fetch Pokémon list based on type or all Pokémon
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        let data = [];
        if (selectedType) {
          // Fetch Pokémon by type
          const response = await axios.get(`${API_BASE_URL_TYPE}/${selectedType}`);
          data = response.data.pokemon.map((entry) => entry.pokemon);
        } else {
          // Fetch all Pokémon
          const response = await axios.get(API_BASE_URL);
          data = response.data.results;
        }

        // Enrich Pokémon data with their types
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

  // Sort Pokémon by selected option
  const sortedPokemons = [...pokemons].sort((a, b) => {
    if (selectedSort === 'name') {
      return a.name.localeCompare(b.name);
    } else if (selectedSort === 'type') {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  // Filter Pokémon by search query
  const filteredPokemons = sortedPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center px-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-5 mb-5 w-full max-w-md">
        <input
          type="text"
          placeholder="Pesquisar Pokémon"
          className="p-2 border-2 border-orange-500 rounded-md bg-white w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 border-2 border-orange-500 rounded-md bg-white w-full sm:w-auto"
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
          className="p-2 border-2 border-orange-500 rounded-md bg-white w-full sm:w-auto"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="name">Ordenar por Nome</option>
          <option value="type">Ordenar por Tipo</option>
        </select>
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 w-full max-w-6xl">
        {loading ? (
          <p className="col-span-full text-center text-gray-600">Carregando...</p>
        ) : (
          filteredPokemons.map((pokemon, index) => (
            <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
          ))
        )}
      </div>
    </div>
  );
};

export default Pokedex;
