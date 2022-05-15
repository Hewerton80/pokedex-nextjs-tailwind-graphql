import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import usePokemon from '../../../hooks/usePokemon'

function PokemonPage() {
  const router = useRouter()

  const { pokemon, getPokemonById } = usePokemon()

  const pokemonId = useMemo(
    () => (router.query?.pokemonId ? String(router.query?.pokemonId) : undefined),
    [router]
  )

  useEffect(() => {
    if (pokemonId) {
      getPokemonById(pokemonId)
    }
  }, [pokemonId, getPokemonById])

  useEffect(() => {
    if (pokemon) {
      console.log('pokemon: ', pokemon)
    }
  }, [pokemon])

  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto mb-9">
      <h1>pokemonId: {pokemonId}</h1>
    </div>
  )
}

export default PokemonPage
