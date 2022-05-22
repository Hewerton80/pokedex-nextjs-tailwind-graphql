type PokemonStatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed'

export interface IPokemonStat {
  id?: string
  base_stat?: number
  effort?: number
  game_index?: number
  is_battle_only?: boolean
  name?: PokemonStatName
}
