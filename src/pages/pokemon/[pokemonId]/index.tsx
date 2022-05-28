import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useMemo } from 'react'
import PokemonBadge from '../../../components/ui/dataDisplay/PokemonBadge'
import { Card, CardBody, CardHeader, CardTitle } from '../../../components/ui/layout/Card'
import Text from '../../../components/ui/typography/Text'
import usePokemon from '../../../hooks/usePokemon'
import { PokemonVulnerabilitiesByType } from '../../../types/PokemonType'
import { TiArrowRightOutline } from 'react-icons/ti'
import assets from '../../../../assets.json'
import ProgressBar from '../../../components/ui/dataDisplay/ProgressBar'
import Image from 'next/image'

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

  if (isLoading || !pokemon?.id) {
    return (
      <span className="mx-auto">
        <Image src="/images/loading.gif" alt="loding..." width={200} height={200} />
      </span>
    )
  }

  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto mb-9">
      <div className="flex justify-center items-center w-full mb-4">
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          className="max-w-[112px] w-full object-cover"
          // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon?.id}.svg`}
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(
            pokemon?.id
          )?.padStart(3, '0')}.png`}
          alt={pokemon?.name}
        />
        <div
          className={classNames('ml-6', 'text-gray text-2xl', 'first-letter:uppercase')}
        >
          <h1>{pokemon?.name}</h1>
          <h2>#{pokemon?.id}</h2>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 sm:col-span-6">
          <CardHeader>
            <CardTitle>Tipo do pokemon</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex justify-center space-x-2 mb-2">
              {pokemon?.types?.map((type, i) => (
                <PokemonBadge key={i + 'type'} type={type?.name} size="lg" />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <Text className="text-blue-typography font-bold">
                  Ineficiente contra:
                </Text>
                {PokemonVulnerabilitiesByType[
                  pokemon?.types?.[0]?.name!
                ]?.vulnerableTo?.map((vulnerability, i) => (
                  <PokemonBadge
                    key={i + 'vulnerability'}
                    type={vulnerability}
                    className="w-full"
                  />
                ))}
              </div>
              <div className="flex flex-col space-y-1">
                <Text className="text-blue-typography font-bold">Eficiente contra:</Text>
                {PokemonVulnerabilitiesByType[
                  pokemon?.types?.[0]?.name!
                ]?.resistantTo?.map((vulnerability, i) => (
                  <PokemonBadge
                    key={i + 'vulnerability'}
                    type={vulnerability}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="col-span-12 sm:col-span-6">
          <CardHeader>
            <CardTitle>Principais características</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col">
              <Text className="text-blue-typography text-sm first-letter:uppercase mb-6">
                <span className="font-bold">Habilidades: </span>
                {pokemon?.abilities?.map((ability) => ability?.name)?.join(', ')}
                <br />
                <span className="font-bold">Altura: </span>
                {pokemon?.height! / 10} m
                <br />
                <span className="font-bold">Peso: </span>
                {pokemon?.weight! / 10} kg
                <br />
              </Text>
              <ul className="flex flex-col space-y-4">
                {pokemon?.stats?.map((stat, i) => (
                  <li key={i + 'stat'}>
                    <ProgressBar
                      value={stat?.base_stat!}
                      max={220}
                      legend={stat?.name!}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
        {pokemon?.evolutionsChain?.length! > 1 && (
          <Card className="col-span-12">
            <CardHeader>
              <CardTitle>Evolução</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="flex justify-center flex-wrap">
                {pokemon?.evolutionsChain?.map((pokeEvolutions, i) => {
                  const isLessThanLength = i < pokemon?.evolutionsChain?.length! - 1
                  return (
                    <Fragment key={i + 'chain'}>
                      <div className="flex flex-col justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="max-w-[50px] sm:max-w-[80px] w-full object-cover mt-auto"
                          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(
                            pokeEvolutions?.id
                          )?.padStart(3, '0')}.png`}
                          // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeEvolutions?.id}.svg`}
                          alt={pokemon?.name}
                        />
                        <Text
                          className={classNames(
                            'text-blue-typography text-sm text-center first-letter:uppercase',
                            'mt-auto',
                            'hover:underline'
                          )}
                        >
                          <Link href={`/pokemon/${pokeEvolutions?.id}`}>
                            <a>{pokeEvolutions?.name}</a>
                          </Link>
                        </Text>
                      </div>
                      {isLessThanLength && (
                        <div className="flex items-center h-full mx-0 sm:mx-8 my-auto">
                          <TiArrowRightOutline
                            size={32}
                            color={assets.colors['blue-typography']}
                          />
                        </div>
                      )}
                    </Fragment>
                  )
                })}
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  )
}

export default PokemonPage
