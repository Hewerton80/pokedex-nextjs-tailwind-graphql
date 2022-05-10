import { IPokemonAbility } from './PokemonAbility'
import { IPokemonGeneration } from './PokemonGeneration'
import { IPokemonType } from './PokemonType'

export interface IPokemon {
  id?: string
  name?: string
  types?: IPokemonType[]
  abilities?: IPokemonAbility[]
  generation?: IPokemonGeneration
}
