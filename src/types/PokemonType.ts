export enum PokemonTypeNameEnum {
  normal = 'normal',
  fighting = 'fighting',
  flying = 'flying',
  poison = 'poison',
  ground = 'ground',
  rock = 'rock',
  bug = 'bug',
  ghost = 'ghost',
  steel = 'steel',
  fire = 'fire',
  water = 'water',
  grass = 'grass',
  electric = 'electric',
  psychic = 'psychic',
  ice = 'ice',
  dragon = 'dragon',
  dark = 'dark',
  fairy = 'fairy',
}

export type PokemonTypeName = keyof typeof PokemonTypeNameEnum

type IPokemonVulnerabilitiesByType = {
  [Property in keyof typeof PokemonTypeNameEnum]: {
    vulnerableTo: PokemonTypeName[]
    resistantTo: PokemonTypeName[]
  }
}

export const PokemonVulnerabilitiesByType: IPokemonVulnerabilitiesByType = {
  normal: {
    vulnerableTo: ['flying'],
    resistantTo: ['fire'],
  },
  fighting: {
    vulnerableTo: ['flying', 'psychic', 'fairy'],
    resistantTo: ['rock', 'bug', 'dark'],
  },
  flying: {
    vulnerableTo: ['electric', 'rock', 'ice'],
    resistantTo: ['fighting', 'bug', 'grass', 'ground'],
  },
  poison: {
    vulnerableTo: ['ground', 'psychic'],
    resistantTo: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
  },
  ground: {
    vulnerableTo: ['water', 'grass', 'ice'],
    resistantTo: ['poison', 'rock', 'electric'],
  },
  rock: {
    vulnerableTo: ['fighting', 'ground', 'steel', 'water', 'grass'],
    resistantTo: ['flying', 'poison', 'fire', 'normal'],
  },
  bug: {
    vulnerableTo: ['fire', 'flying', 'rock'],
    resistantTo: ['fighting', 'ground', 'grass'],
  },
  ghost: {
    vulnerableTo: ['ghost', 'dark'],
    resistantTo: ['poison', 'bug', 'flying', 'normal'],
  },
  steel: {
    vulnerableTo: ['fighting', 'ground', 'fire'],
    resistantTo: [
      'normal',
      'flying',
      'rock',
      'bug',
      'steel',
      'grass',
      'psychic',
      'ice',
      'dragon',
      'fairy',
      'poison',
    ],
  },
  fire: {
    vulnerableTo: ['ground', 'rock', 'water'],
    resistantTo: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'],
  },
  water: {
    vulnerableTo: ['grass', 'electric'],
    resistantTo: ['steel', 'fire', 'water', 'ice'],
  },
  grass: {
    vulnerableTo: ['flying', 'poison', 'bug', 'fire', 'ice'],
    resistantTo: ['ground', 'water', 'grass', 'electric'],
  },
  electric: {
    vulnerableTo: ['ground'],
    resistantTo: ['electric', 'flying', 'steel'],
  },
  psychic: {
    vulnerableTo: ['bug', 'ghost', 'dark'],
    resistantTo: ['fighting', 'psychic'],
  },
  ice: {
    vulnerableTo: ['fighting', 'rock', 'steel', 'fire'],
    resistantTo: ['ice'],
  },
  dragon: {
    vulnerableTo: ['ice', 'dragon', 'fairy'],
    resistantTo: ['fire', 'water', 'grass', 'electric'],
  },
  dark: {
    vulnerableTo: ['fighting', 'bug', 'fairy'],
    resistantTo: ['ghost', 'psychic', 'dark'],
  },
  fairy: {
    vulnerableTo: ['poison', 'steel'],
    resistantTo: ['fighting', 'bug', 'dragon', 'dark'],
  },
}
// PokemonVulnerabilitiesByType.normal.vulnerableTo.includes('flying')
export interface IPokemonType {
  id?: string
  name?: PokemonTypeName
}
