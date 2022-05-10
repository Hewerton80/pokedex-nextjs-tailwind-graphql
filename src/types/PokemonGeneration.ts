export enum PokemonGenerationNameEnum {
  'generation-i' = '1',
  'generation-ii' = '2',
  'generation-iii' = '3',
  'generation-iv' = '4',
  'generation-v' = '5',
  'generation-vi' = '6',
  'generation-vii' = '7',
  'generation-viii' = '8',
}

export type PokemonGenerationName = keyof typeof PokemonGenerationNameEnum

export interface IPokemonGeneration {
  id?: string
  name?: PokemonGenerationName
}
