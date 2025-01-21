# Pokédex - Projeto React com PokéAPI e Tailwind CSS

## Visão Geral
Este é um projeto de Pokédex desenvolvido em React, utilizando a **PokéAPI** para buscar dados de Pokémon e **Tailwind CSS** para estilização. A Pokédex permite:

- Listar Pokémon com seus nomes, imagens e tipos.
- Filtrar Pokémon por tipo.
- Ordenar Pokémon por nome ou tipo.
- Carregar dados dinâmicos diretamente da PokéAPI.

---

## Requisitos

Certifique-se de ter os seguintes itens instalados:

1. **Node.js** (versão 14 ou superior)
2. **npm** ou **yarn** (gerenciador de pacotes)

---

## Configuração do Ambiente

### 1. Clonar o Repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd pokedex
```

### 2. Instalar Dependências
```bash
npm install
```

---

## Estrutura do Projeto

```
/
|-- public/               # Arquivos públicos
|-- src/
    |-- components/       # Componentes React
        |-- Pokedex.js    # Componente principal da Pokédex
        |-- PokemonCard.js # Exibe informações individuais de cada Pokémon
    |-- App.js            # Componente raiz
    |-- index.css          # Configurações globais do Tailwind CSS
    |-- index.Js         # Ponto de entrada
|-- tailwind.config.js    # Configuração do Tailwind
|-- package.json          # Configurações do projeto e dependências
```

---

## Configuração do Tailwind CSS

### 1. Instalar o Tailwind CSS
Execute o seguinte comando para instalar o Tailwind CSS e suas dependências:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 2. Configurar o `tailwind.config.js`
Edite o arquivo `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 3. Atualizar o `index.css`
Substitua o conteúdo do arquivo `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Scripts Disponíveis

### 1. Iniciar o Servidor de Desenvolvimento
Para iniciar o projeto em modo de desenvolvimento:
```bash
npm start
```


---

## Funcionalidades

### 1. Listar Pokémon
Os Pokémon são exibidos com os seguintes dados:
- Nome
- Imagem (sprite)
- Tipo(s)

### 2. Filtrar por Tipo
O usuário pode selecionar um tipo de Pokémon no dropdown para filtrar a lista.

### 3. Ordenar por Nome ou Tipo
Os Pokémon podem ser ordenados alfabeticamente por:
- Nome
- Tipo

### 4. Carregar Dados da PokéAPI
Os dados dos Pokémon são carregados dinamicamente da PokéAPI:
- URL base: [https://pokeapi.co/api/v2/](https://pokeapi.co/api/v2/)

---

## Componentes

### 1. `Pokedex.js`
- Gerencia a lista de Pokémon, aplica filtros e ordenações.
- Usa estados para:
  - Tipo selecionado.
  - Critério de ordenação.

### 2. `PokemonCard.js`
- Exibe informações individuais de cada Pokémon, incluindo:
  - Nome
  - Imagem
  - Tipo(s)


Com estas instruções, o projeto estará pronto para ser configurado e executado com todas as funcionalidades descritas. Se precisar de ajuda, é só perguntar! 🚀