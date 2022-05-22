import { IPokemonAbility } from './PokemonAbility'
import { IPokemonGeneration } from './PokemonGeneration'
import { IPokemonStat } from './PokemonStat'
import { IPokemonType } from './PokemonType'

export interface IPokemon {
  id?: string
  name?: string
  base_happiness?: number
  capture_rate?: number
  has_gender_differences?: boolean
  is_baby?: boolean
  base_experience?: number
  forms_switchable?: boolean
  gender_rate?: number
  hatch_counter?: number
  is_legendary?: boolean
  is_mythical?: boolean
  height?: number
  weight?: number
  evelotionsChain?: IPokemon[]
  types?: IPokemonType[]
  abilities?: IPokemonAbility[]
  generation?: IPokemonGeneration
  stats?: IPokemonStat[]
}
