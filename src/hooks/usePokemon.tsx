import { ApiError } from 'next/dist/server/api-utils'
import { useCallback, useState } from 'react'
import { getPokemonByIdGql, getPokemonGql } from '../queriesGql/getPokemonsGql'
import { apolloClient } from '../services/apolloClient'
import { baseApi } from '../services/baseApi'
import { IPokemon } from '../types/Pokemon'
import { IPokemonAbility } from '../types/PokemonAbility'
import { PokemonGenerationName } from '../types/PokemonGeneration'
import { IPokemonStat } from '../types/PokemonStat'
import { IPokemonType, PokemonTypeName } from '../types/PokemonType'
import { getPaginedDocs, IPaginedDocs } from '../utils/getPaginedDocs'

type PokemonRecords = IPaginedDocs<IPokemon>

export interface IpokemonFilter extends IPokemon {
  currentPage?: number
  perPage?: number
  type?: PokemonTypeName
  generationName?: PokemonGenerationName
}

function usePokemon() {
  const [pokemons, setPokemons] = useState<PokemonRecords>({} as PokemonRecords)
  const [pokemon, setPokemon] = useState<IPokemon>({} as IPokemon)
  const [isLoading, setIsLoading] = useState(false)

  const getPokemons = useCallback(async (ookemonQueryParams: IpokemonFilter) => {
    setIsLoading(true)
    try {
      // const { data, error } = await apolloClient.query({
      //   query: getPokemonGql({ perPage, currentPage, ...restArgs }),
      // })
      // if (!error) {
      //   let pokemonsTmp: IPokemon[] = []
      //   pokemonsTmp = data.species?.map((poke: any) => {
      //     const pokeTmp = poke?.pokemon_v2_pokemons?.[0]
      //     const types: IPokemonType[] =
      //       pokeTmp?.pokemon_v2_pokemontypes?.map((type: any) => ({
      //         id: type?.pokemon_v2_type?.id,
      //         name: type?.pokemon_v2_type?.name,
      //       })) || []

      //     return {
      //       id: pokeTmp?.id,
      //       name: pokeTmp?.name,
      //       types,
      //     }
      //   })
      //   const totalDocs = Number(data?.species_total?.aggregate?.count)
      //   const pokemonRecordsTmp = getPaginedDocs<IPokemon>({
      //     docs: pokemonsTmp,
      //     currentPage,
      //     perPage,
      //     totalDocs,
      //   })
      const response = await baseApi.get('/pokemon', { params: ookemonQueryParams })
      // console.log('pokemons: ', response.data)
      setPokemons(response.data)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }, [])

  const getPokemonById = useCallback(async (pokemonId: string) => {
    setIsLoading(true)
    try {
      const response = await baseApi.get(`/pokemon/${pokemonId}`)
      setPokemon(response.data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [])

  return { pokemons, isLoading, pokemon, getPokemons, getPokemonById }
}
export default usePokemon
