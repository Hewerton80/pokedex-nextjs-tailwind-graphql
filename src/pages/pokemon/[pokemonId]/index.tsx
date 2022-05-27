import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import PokemonBadge from '../../../components/ui/dataDisplay/PokemonBadge'
import ShimmerEffect from '../../../components/ui/feedback/ShimmerEffect'
import { Card, CardBody, CardHeader, CardTitle } from '../../../components/ui/layout/Card'
import Text from '../../../components/ui/typography/Text'
import usePokemon from '../../../hooks/usePokemon'
import { PokemonVulnerabilitiesByType } from '../../../types/PokemonType'

function PokemonPage() {
  const router = useRouter()

  const { pokemon, isLoading, getPokemonById } = usePokemon()

  const pokemonId = useMemo(
    () => (router.query?.pokemonId ? String(router.query?.pokemonId) : undefined),
    [router]
  )

  useEffect(() => {
    if (pokemonId) {
      getPokemonById(pokemonId)
    }
  }, [pokemonId, getPokemonById])

  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto mb-9">
      <div className="flex justify-center items-center w-full mb-4">
        {isLoading || !pokemon?.id ? (
          <ShimmerEffect className="h-28 w-28" />
        ) : (
          <>
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
              className="max-w-[112px] w-full object-cover"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon?.id}.svg`}
              alt={pokemon?.name}
            />
            <div
              className={classNames(
                'ml-6',
                'text-gray text-2xl',
                'first-letter:uppercase'
              )}
            >
              <h1>{pokemon?.name}</h1>
              <h2>#{pokemon?.id}</h2>
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>Tipo do pokemon</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex justify-center space-x-2 mb-2">
              {pokemon?.types?.map((type, i) => (
                <PokemonBadge key={i + 'type'} type={type?.name} size="lg" />
              ))}
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col space-y-1">
                <Text className="text-blue-typography font-bold">
                  Ineficiente contra:
                </Text>
                {PokemonVulnerabilitiesByType[
                  pokemon?.types?.[0]?.name!
                ]?.vulnerableTo?.map((vulnerability, i) => (
                  <PokemonBadge key={i + 'vulnerability'} type={vulnerability} />
                ))}
              </div>
              <div className="flex flex-col space-y-1">
                <Text className="text-blue-typography font-bold">Eficiente contra:</Text>
                {PokemonVulnerabilitiesByType[
                  pokemon?.types?.[0]?.name!
                ]?.resistantTo?.map((vulnerability, i) => (
                  <PokemonBadge key={i + 'vulnerability'} type={vulnerability} />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>Melhores movimentos</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col">
              {pokemon?.abilities?.map((ability, i) => (
                <Text
                  className="text-blue-typography text-lg first-letter:uppercase"
                  key={i + 'ability'}
                >
                  {ability?.name}
                </Text>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default PokemonPage
