// Component dos cards do pokemon

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonCard = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(url);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, [url]);

  if (!pokemonData) {
    return (
      <div className="bg-slate-800 shadow-md border-2 border-gray-300 rounded-lg p-5 text-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="bg-zinc-400 shadow-md border-2 border-blue-500 rounded-lg p-5 text-center transform transition-transform hover:scale-105">
      <img
        src={pokemonData.sprites.front_default}
        alt={name}
        className="w-20 h-20 mx-auto mb-3"
      />
      <h3 className="text-lg font-bold capitalize">{name}</h3>
      <p className="text-sm text-gray-600">
        Tipo: {pokemonData.types.map((type) => type.type.name).join(', ')}
      </p>
    </div>
  );
};

export default PokemonCard;
