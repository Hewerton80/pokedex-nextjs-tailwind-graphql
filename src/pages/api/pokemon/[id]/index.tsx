import type { NextApiRequest, NextApiResponse } from 'next'
import { IpokemonFilter } from '../../../../hooks/usePokemon'
import { getPokemonByIdGql } from '../../../../queriesGql/getPokemonsGql'
import { apolloClient } from '../../../../services/apolloClient'
import { IPokemon } from '../../../../types/Pokemon'
import { IPokemonAbility } from '../../../../types/PokemonAbility'
import { IPokemonStat } from '../../../../types/PokemonStat'
import { IPokemonType } from '../../../../types/PokemonType'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id: pokemonId }: IpokemonFilter = req.query
    try {
      const { data, error } = await apolloClient.query({
        query: getPokemonByIdGql(String(pokemonId)),
      })

      if (!error) {
        let specie = data?.species?.[0]
        const pokemonTmp = specie?.pokemon_v2_pokemons?.[0]
        const evolutionchainEspeciesTmp: IPokemon[] =
          specie?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies?.map(
            (evelotuinchain: any) => ({
              id: evelotuinchain?.id,
              name: evelotuinchain?.name,
            })
          )
        const types: IPokemonType[] =
          pokemonTmp?.pokemon_v2_pokemontypes?.map((type: any) => ({
            id: type?.pokemon_v2_type?.id,
            name: type?.pokemon_v2_type?.name,
          })) || []
        const abilities: IPokemonAbility[] =
          pokemonTmp?.pokemon_v2_pokemonabilities?.map((ability: any) => ({
            id: ability?.pokemon_v2_ability?.id,
            is_main_series: ability?.pokemon_v2_ability?.is_main_series,
            name: ability?.pokemon_v2_ability?.name,
          })) || []
        const stats: IPokemonStat[] =
          pokemonTmp?.pokemon_v2_pokemonstats?.map((stat: any) => ({
            id: stat?.pokemon_v2_stat?.id,
            name: stat?.pokemon_v2_stat?.name,
            game_index: stat?.pokemon_v2_stat?.game_index,
            is_battle_only: stat?.pokemon_v2_stat?.is_battle_only,
            base_stat: stat?.base_stat,
            effort: stat?.effort,
          })) || []
        const pokemonRecordsTmp: IPokemon = {
          id: pokemonTmp?.id,
          base_happiness: specie?.base_happiness,
          capture_rate: specie?.capture_rate,
          forms_switchable: specie?.forms_switchable,
          gender_rate: specie?.gender_rate,
          has_gender_differences: specie?.has_gender_differences,
          hatch_counter: specie?.hatch_counter,
          is_baby: specie?.is_baby,
          is_legendary: specie?.is_legendary,
          is_mythical: specie?.is_mythical,
          name: specie?.name,
          base_experience: pokemonTmp?.base_experience,
          height: pokemonTmp?.height,
          weight: pokemonTmp?.weight,
          types,
          abilities,
          stats,
          evelotionsChain: evolutionchainEspeciesTmp,
        }
        return res.status(200).json(pokemonRecordsTmp)
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json(JSON.stringify(err))
    }
  }
  {
    return res.status(400).json({ msg: 'page not found' })
  }
}
