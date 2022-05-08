import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import PokemonTypeBadge from '../components/ui/dataDisplay/PokemonTypeBadge'
import InputSearchPokemon from '../components/ui/forms/InputSearchPokemon'
import { Card } from '../components/ui/layout/Card'
import PokemonCard from '../components/ui/layout/PokemonCard'
import PaginationBar from '../components/ui/navigation/PaginationBar'
import usePokemon, { IpokemonFilter } from '../hooks/usePokemon'
import { IPokemonType, PokemonTypeNameEnum } from '../types/PokemonType'
import { getRange } from '../utils/getRange'
import { useDebouncedCallback } from 'use-debounce'
import classNames from 'classnames'

interface IFilterTypes {
  type: keyof typeof PokemonTypeNameEnum
  isChecked: boolean
}

const Home: NextPage = () => {
  const { pokemons, isLoading, getPokemons } = usePokemon()

  const router = useRouter()

  const [inputSearchPokemonValue, setInputSearchPokemonValue] = useState('')
  const [pokemonTypeFilter, setPokemonTypeFilter] = useState<
    keyof typeof PokemonTypeNameEnum | undefined
  >(undefined)

  const [page, setPage] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  const [docsPerPage] = useState(48)
  const [totalPages, setTotalPages] = useState(0)

  const [filterTypes, setFilterTypes] = useState<IFilterTypes[]>(
    Object.keys(PokemonTypeNameEnum).map((type) => ({
      type: type as keyof typeof PokemonTypeNameEnum,
      isChecked: false,
    }))
  )

  useEffect(() => {
    if (Object.keys(pokemons).length > 0) {
      setTotalDocs(pokemons.totalDocs)
      setTotalPages(pokemons.totalPages)
    }
  }, [pokemons])

  const getPokemonssFilterFromRouter = useCallback(() => {
    const { name, currentPage, type } = router.query as IpokemonFilter
    return {
      name: name ? name.trim() : '',
      currentPage: currentPage ? Number(currentPage) : 1,
      type: type ? (type.trim() as keyof typeof PokemonTypeNameEnum) : undefined,
    }
  }, [router])

  useEffect(() => {
    if (router.isReady) {
      const { name, currentPage, type } = getPokemonssFilterFromRouter()
      setInputSearchPokemonValue(name)
      setPokemonTypeFilter(type)
      getPokemons({ currentPage, name, type })
    }
  }, [router, getPokemons, getPokemonssFilterFromRouter])

  // useEffect(() => {
  //   setFilterdPokemons(pokemons)
  // }, [pokemons])

  // useEffect(() => {
  //   if (inputSearchPokemonToFilter.trim()) {
  //     const filterdPokemons = pokemons?.docs?.filter((pokemon) =>
  //       pokemon?.name?.toLowerCase()?.includes(inputSearchPokemonToFilter?.toLowerCase())
  //     )
  //     setFilterdPokemons(filterdPokemons)
  //   } else {
  //     setFilterdPokemons(pokemons)
  //   }
  // }, [pokemons, inputSearchPokemonToFilter])

  // useEffect(() => {
  //   if (someOneTypeIsChecked) {
  //   } else {
  //     setFilterdPokemons(pokemons)
  //   }
  // }, [someOneTypeIsChecked])

  useEffect(() => {
    if (pokemonTypeFilter) {
      setFilterTypes(([...currentFilterTypes]) => {
        return currentFilterTypes.map((currentFilterType) => ({
          ...currentFilterType,
          isChecked: currentFilterType.type === pokemonTypeFilter,
        }))
      })
    } else {
      setFilterTypes(([...currentFilterTypes]) => {
        return currentFilterTypes.map((currentFilterType) => ({
          ...currentFilterType,
          isChecked: false,
        }))
      })
    }
  }, [pokemonTypeFilter])

  const handleChangePage = useCallback(
    (toPage: number) => {
      setPage(toPage)
      router.push({ pathname: '/', query: { ...router.query, currentPage: toPage } })
    },
    [router]
  )

  const handleCheckPokemonType = useCallback(
    (pokemonType: keyof typeof PokemonTypeNameEnum) => {
      let podekemonTypeTmp = undefined
      if (pokemonType !== pokemonTypeFilter) {
        setPokemonTypeFilter(pokemonType)
        podekemonTypeTmp = pokemonType
      } else {
        setPokemonTypeFilter(undefined)
      }
      setPage(1)
      router.push({
        pathname: '/',
        query: { ...router.query, type: podekemonTypeTmp, currentPage: 1 },
      })
    },
    [pokemonTypeFilter, router]
  )

  const handleChangeInputSearchPokemon = useDebouncedCallback(
    useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setInputSearchPokemonValue(e.target.value)
        setPage(1)
        router.push({
          pathname: '/',
          query: { ...router.query, name: e.target.value, currentPage: 1 },
        })
      },
      [router]
    ),
    1000
  )

  const someOneTypeIsChecked = useMemo(
    () => filterTypes.some((t) => t.isChecked),
    [filterTypes]
  )

  const podekemonsListElement = useMemo(() => {
    return pokemons?.docs?.map((pokemon, i) => (
      <Fragment key={String(pokemon?.id) + i}>
        <PokemonCard className="col-span-4" pokemon={pokemon} />
      </Fragment>
    ))
  }, [pokemons])

  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto mb-9">
      <InputSearchPokemon
        className="mb-9"
        value={inputSearchPokemonValue}
        onChange={(e) => {
          handleChangeInputSearchPokemon(e)
          setInputSearchPokemonValue(e.target.value)
        }}
      />
      <Card className="flex-row flex-wrap -mt-2 pb-2 mb-9">
        {filterTypes.map((filterType) => (
          <PokemonTypeBadge
            className={classNames(
              'ml-2 mt-2 outline-black dark:outline-white',
              someOneTypeIsChecked &&
                (filterType.isChecked ? 'outline outline-2' : 'opacity-40')
            )}
            key={filterType.type}
            type={filterType.type}
            onClick={() => handleCheckPokemonType(filterType.type)}
          />
        ))}
      </Card>
      <div className="grid grid-cols-12 gap-2 mb-9">
        {isLoading || handleChangeInputSearchPokemon.isPending()
          ? getRange(48).map((i) => (
              <Fragment key={'is-loading' + i}>
                <PokemonCard className="col-span-4" isLoading />
              </Fragment>
            ))
          : podekemonsListElement}
      </div>
      <div className="flex w-full">
        {
          <PaginationBar
            currentPage={page}
            onChangePage={handleChangePage}
            perPage={docsPerPage}
            totalPages={totalPages}
            totalRecords={totalDocs}
            disabled={isLoading || handleChangeInputSearchPokemon.isPending()}
          />
        }
      </div>
    </div>
  )
}

export default Home
