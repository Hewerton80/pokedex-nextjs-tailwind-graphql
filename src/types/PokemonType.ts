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
  // unknown = 'unknown',
  // shadow = 'shadow',
}

export type PokemonTypeName = keyof typeof PokemonTypeNameEnum
export interface IPokemonType {
  id?: string
  name?: PokemonTypeName
}
