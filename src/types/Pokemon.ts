import { IPokemonAbility } from './PokemonAbility'
import { IPokemonType } from './PokemonType'

export interface IPokemon {
  id?: string
  name?: string
  types?: IPokemonType[]
  abilities?: IPokemonAbility[]
}
