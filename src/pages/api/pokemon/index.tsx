import type { NextApiRequest, NextApiResponse } from 'next'
import { IpokemonFilter } from '../../../hooks/usePokemon'
import { getPokemonGql } from '../../../queriesGql/getPokemonsGql'
import { apolloClient } from '../../../services/apolloClient'
import { IPokemon } from '../../../types/Pokemon'
import { IPokemonType } from '../../../types/PokemonType'
import { getPaginedDocs } from '../../../utils/getPaginedDocs'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { perPage = 48, currentPage = 1, ...restArgs }: IpokemonFilter = req.query
    try {
      const { data, error } = await apolloClient.query({
        query: getPokemonGql({ perPage, currentPage, ...restArgs }),
      })
      console.log('-----------')
      if (!error) {
        let pokemonsTmp: IPokemon[] = []
        pokemonsTmp = data.species?.map((poke: any) => {
          const pokeTmp = poke?.pokemon_v2_pokemons?.[0]
          const types: IPokemonType[] =
            pokeTmp?.pokemon_v2_pokemontypes?.map((type: any) => ({
              id: type?.pokemon_v2_type?.id,
              name: type?.pokemon_v2_type?.name,
            })) || []

          return { id: pokeTmp?.id, name: pokeTmp?.name, types }
        })
        const totalDocs = Number(data?.species_total?.aggregate?.count)
        const pokemonRecordsTmp = getPaginedDocs<IPokemon>({
          docs: pokemonsTmp,
          currentPage,
          perPage,
          totalDocs,
        })
        res.status(200).json(pokemonRecordsTmp)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json(JSON.stringify(err))
    }
  }
  {
    res.status(400).json({ msg: 'page not found' })
  }
}
