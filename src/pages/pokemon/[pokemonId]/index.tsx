import { useRouter } from 'next/router'
import { useMemo } from 'react'

function PokemonPage() {
  const router = useRouter()

  const pokemonId = useMemo(
    () => (router.query?.pokemonId ? String(router.query?.pokemonId) : undefined),
    [router]
  )

  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto mb-9">
      <h1>pokemonId: {pokemonId}</h1>
    </div>
  )
}

export default PokemonPage
