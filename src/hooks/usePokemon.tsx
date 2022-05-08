import { useCallback, useState } from 'react'
import { getPokemonGql } from '../queriesGql/getPokemonsGql'
import { apolloClient } from '../services/apolloClient'
import { IPokemon } from '../types/Pokemon'
import { IPokemonType, PokemonTypeNameEnum } from '../types/PokemonType'
import { getPaginedDocs, IPaginedDocs } from '../utils/getPaginedDocs'

type PokemonRecords = IPaginedDocs<IPokemon>

export interface IpokemonFilter extends IPokemon {
  currentPage?: number
  perPage?: number
  type?: keyof typeof PokemonTypeNameEnum
}

function usePokemon() {
  const [pokemons, setPokemons] = useState<PokemonRecords>({} as PokemonRecords)
  const [isLoading, setIsLoading] = useState(false)

  const getPokemons = useCallback(
    async ({ perPage = 48, currentPage = 1, ...restArgs }: IpokemonFilter) => {
      setIsLoading(true)
      try {
        const { data, error } = await apolloClient.query({
          query: getPokemonGql({ perPage, currentPage, ...restArgs }),
        })
        if (!error) {
          let pokemonsTmp: IPokemon[] = []
          pokemonsTmp = data.gen3_species?.map((poke: any) => {
            const pokeTmp = poke?.pokemon_v2_pokemons?.[0]
            const types: IPokemonType[] =
              pokeTmp?.pokemon_v2_pokemontypes?.map((type: any) => ({
                id: type?.pokemon_v2_type?.id,
                name: type?.pokemon_v2_type?.name,
              })) || []

            return {
              id: pokeTmp?.id,
              name: pokeTmp?.name,
              types,
            }
          })
          const totalDocs = Number(data?.gen3_species_total?.aggregate?.count)
          const pokemonRecordsTmp = getPaginedDocs<IPokemon>({
            docs: pokemonsTmp,
            currentPage,
            perPage,
            totalDocs,
          })

          setPokemons(pokemonRecordsTmp as unknown as PokemonRecords)
        }
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    },
    []
  )

  return { pokemons, isLoading, getPokemons }
}
export default usePokemon
