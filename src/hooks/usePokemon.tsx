import { useCallback, useState } from 'react'
import { getPokemonByIdGql, getPokemonGql } from '../queriesGql/getPokemonsGql'
import { apolloClient } from '../services/apolloClient'
import { IPokemon } from '../types/Pokemon'
import { IPokemonAbility } from '../types/PokemonAbility'
import { PokemonGenerationName } from '../types/PokemonGeneration'
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

  const getPokemons = useCallback(
    async ({ perPage = 48, currentPage = 1, ...restArgs }: IpokemonFilter) => {
      setIsLoading(true)
      try {
        const { data, error } = await apolloClient.query({
          query: getPokemonGql({ perPage, currentPage, ...restArgs }),
        })
        if (!error) {
          let pokemonsTmp: IPokemon[] = []
          pokemonsTmp = data.species?.map((poke: any) => {
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
          const totalDocs = Number(data?.species_total?.aggregate?.count)
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

  const getPokemonById = useCallback(async (pokemonId: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await apolloClient.query({
        query: getPokemonByIdGql(pokemonId),
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
        console.log('specie: ', specie)
        console.log('pokemonTmp: ', pokemonTmp)
        console.log('evolutionchainEspeciesTmp: ', evolutionchainEspeciesTmp)
        console.log('types: ', types)
        console.log('abilities: ', abilities)
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }, [])

  return { pokemons, isLoading, pokemon, getPokemons, getPokemonById }
}
export default usePokemon
