import { IPokemonAbility } from './PokemonAbility'
import { IPokemonGeneration } from './PokemonGeneration'
import { IPokemonType } from './PokemonType'

export interface IPokemon {
  id?: string
  name?: string
  base_happiness?: number
  capture_rate?: number
  forms_switchable?: boolean
  gender_rate?: number
  has_gender_differences?: boolean
  hatch_counter?: number
  is_baby?: boolean
  is_legendary?: boolean
  is_mythical?: boolean
  evelotionsChain?: IPokemon[]
  types?: IPokemonType[]
  abilities?: IPokemonAbility[]
  generation?: IPokemonGeneration
}
