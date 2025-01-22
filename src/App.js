import React from 'react';
import Pokedex from './components/pokedex';


function App() {
  return (
    <div className="bg-neutral-300 min-h-screen p-5">
      <h1 className="text-4xl font-bold text-orange-500 text-center mb-5">Pokedex do Edu</h1>
      <Pokedex />
    </div>
  );
}

export default App;
