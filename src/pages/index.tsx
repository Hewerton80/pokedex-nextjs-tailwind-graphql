import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import PokemonBadge from '../components/ui/dataDisplay/PokemonBadge'
import InputSearchPokemon from '../components/ui/forms/InputSearchPokemon'
import { Card } from '../components/ui/layout/Card'
import PokemonCard from '../components/ui/layout/PokemonCard'
import PaginationBar from '../components/ui/navigation/PaginationBar'
import usePokemon, { IpokemonFilter } from '../hooks/usePokemon'
import { PokemonTypeName, PokemonTypeNameEnum } from '../types/PokemonType'
import { getRange } from '../utils/getRange'
import { useDebouncedCallback } from 'use-debounce'
import classNames from 'classnames'
import { TabItem, TabList, TabPanel } from '../components/ui/navigation/Tab'
import {
  PokemonGenerationName,
  PokemonGenerationNameEnum,
} from '../types/PokemonGeneration'
import Link from 'next/link'

interface IFilterTypes {
  type: PokemonTypeName
  isChecked: boolean
}

interface IFilterGenerations {
  generation: PokemonGenerationName
  isChecked: boolean
}

const Home: NextPage = () => {
  const { pokemons, isLoading, getPokemons } = usePokemon()

  const router = useRouter()

  const [inputSearchPokemonValue, setInputSearchPokemonValue] = useState('')
  const [selectedPokemonTypeFilter, setSeletedPokemonTypeFilter] = useState<
    PokemonTypeName | undefined
  >(undefined)
  const [selectedPokemonGenerationFilter, setSeletedPokemonGenerationFilter] = useState<
    PokemonGenerationName | undefined
  >(undefined)

  const [page, setPage] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  const [docsPerPage] = useState(48)
  const [totalPages, setTotalPages] = useState(0)

  const [showFilterTypes, setShowFilterTypes] = useState(false)
  const [showFilterGenerations, setShowFilterGenerations] = useState(false)

  const [filterTypes, setFilterTypes] = useState<IFilterTypes[]>(
    Object.keys(PokemonTypeNameEnum).map((type) => ({
      type: type as PokemonTypeName,
      isChecked: false,
    }))
  )

  const [filterGenerations, setFilterGenerations] = useState<IFilterGenerations[]>(
    Object.keys(PokemonGenerationNameEnum).map((generation) => ({
      generation: generation as PokemonGenerationName,
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
    const { name, currentPage, type, generationName } = router.query as IpokemonFilter
    return {
      name: name ? name.trim() : '',
      currentPage: currentPage ? Number(currentPage) : 1,
      type: type ? (type.trim() as PokemonTypeName) : undefined,
      generationName: generationName
        ? (generationName.trim() as PokemonGenerationName)
        : undefined,
    }
  }, [router])

  useEffect(() => {
    if (router.isReady) {
      const { name, currentPage, type, generationName } = getPokemonssFilterFromRouter()
      type && setShowFilterTypes(true)
      generationName && setShowFilterGenerations(true)
      setInputSearchPokemonValue(name)
      setSeletedPokemonTypeFilter(type)
      setSeletedPokemonGenerationFilter(generationName)
      getPokemons({ currentPage, name, type, generationName })
    }
  }, [router, getPokemons, getPokemonssFilterFromRouter])

  useEffect(() => {
    if (selectedPokemonTypeFilter) {
      setFilterTypes(([...currentFilterTypes]) => {
        return currentFilterTypes.map((currentFilterType) => ({
          ...currentFilterType,
          isChecked: currentFilterType.type === selectedPokemonTypeFilter,
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
  }, [selectedPokemonTypeFilter])

  useEffect(() => {
    if (selectedPokemonGenerationFilter) {
      setFilterGenerations(([...currentFilterGenerations]) => {
        return currentFilterGenerations.map((currentFilterGeneration) => ({
          ...currentFilterGeneration,
          isChecked:
            currentFilterGeneration.generation === selectedPokemonGenerationFilter,
        }))
      })
    } else {
      setFilterGenerations(([...currentFilterGenerations]) => {
        return currentFilterGenerations.map((currentFilterGeneration) => ({
          ...currentFilterGeneration,
          isChecked: false,
        }))
      })
    }
  }, [selectedPokemonGenerationFilter])

  const handleChangePage = useCallback(
    (toPage: number) => {
      setPage(toPage)
      router.push({ pathname: '/', query: { ...router.query, currentPage: toPage } })
    },
    [router]
  )

  const handleCheckPokemonType = useCallback(
    (pokemonType: PokemonTypeName) => {
      let podekemonTypeTmp = undefined
      if (pokemonType !== selectedPokemonTypeFilter) {
        setSeletedPokemonTypeFilter(pokemonType)
        podekemonTypeTmp = pokemonType
      } else {
        setSeletedPokemonTypeFilter(undefined)
      }
      setPage(1)
      router.push({
        pathname: '/',
        query: { ...router.query, type: podekemonTypeTmp, currentPage: 1 },
      })
    },
    [selectedPokemonTypeFilter, router]
  )

  const handleCheckPokemonGeneration = useCallback(
    (pokemonGeneration: PokemonGenerationName) => {
      let podekemonGenerationTmp = undefined
      if (pokemonGeneration !== selectedPokemonGenerationFilter) {
        setSeletedPokemonGenerationFilter(pokemonGeneration)
        podekemonGenerationTmp = pokemonGeneration
      } else {
        setSeletedPokemonGenerationFilter(undefined)
      }
      setPage(1)
      router.push({
        pathname: '/',
        query: {
          ...router.query,
          generationName: podekemonGenerationTmp,
          currentPage: 1,
        },
      })
    },
    [selectedPokemonGenerationFilter, router]
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

  const someOneGenerationIsChecked = useMemo(
    () => filterGenerations.some((t) => t.isChecked),
    [filterGenerations]
  )

  const podekemonsListElement = useMemo(() => {
    return pokemons?.docs?.map((pokemon, i) => (
      <Fragment key={String(pokemon?.id) + i}>
        <Link href={`/pokemon/${pokemon?.id}`}>
          <a className="col-span-4">
            <PokemonCard pokemon={pokemon} />
          </a>
        </Link>
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
      <Card className="flex flex-col mb-9 p-2">
        <TabList>
          <TabItem
            isActive={showFilterTypes}
            onClick={() => setShowFilterTypes(!showFilterTypes)}
          >
            Type
          </TabItem>
          <TabItem
            isActive={showFilterGenerations}
            onClick={() => setShowFilterGenerations(!showFilterGenerations)}
          >
            Generation
          </TabItem>
        </TabList>
        {showFilterTypes && (
          <TabPanel>
            {filterTypes.map((filterType) => (
              <PokemonBadge
                className={classNames(
                  someOneTypeIsChecked &&
                    (filterType.isChecked ? 'outline outline-2' : 'opacity-40')
                )}
                key={filterType.type}
                type={filterType.type}
                onClick={() => handleCheckPokemonType(filterType.type)}
              />
            ))}
          </TabPanel>
        )}
        {showFilterGenerations && (
          <TabPanel>
            {filterGenerations.map((generation) => (
              <PokemonBadge
                className={classNames(
                  someOneGenerationIsChecked &&
                    (generation.isChecked ? 'outline outline-2' : 'opacity-40')
                )}
                key={generation.generation}
                type={generation.generation}
                onClick={() => handleCheckPokemonGeneration(generation.generation)}
              />
            ))}
          </TabPanel>
        )}
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
