import { useCallback, useState } from 'react'
import { baseApi } from '../services/baseApi'
import { IPokemon } from '../types/Pokemon'
import { PokemonGenerationName } from '../types/PokemonGeneration'
import { PokemonTypeName } from '../types/PokemonType'
import { IPaginedDocs } from '../utils/getPaginedDocs'

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
