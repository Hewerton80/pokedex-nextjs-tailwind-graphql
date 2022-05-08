import { gql } from '@apollo/client'
import { IpokemonFilter } from '../hooks/usePokemon'

export const getPokemonGql = ({ perPage, currentPage, name, type }: IpokemonFilter) => {
  const gqlQueryOrder = `order_by: { id: asc }`
  const gqlQueryLimit = `limit: ${perPage}`
  const gqlQueryOffset = `offset: ${(Number(currentPage) - 1) * Number(perPage)}`

  const gqlQueryType = type
    ? `pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: "${type}"}}}`
    : ''
  const pokemonQueryName = `${name?.trim() ? `name: {_ilike: "%${name?.trim()}%"}` : ''}`
  const gqlQueryNameAndType = `pokemon_v2_pokemons: { ${pokemonQueryName} , ${gqlQueryType} }`

  const gqlQueryWhere = `where: { ${gqlQueryNameAndType} }`
  const gqlQuery = `${gqlQueryOrder},${gqlQueryLimit},${gqlQueryOffset},${gqlQueryWhere}`
  // console.log(gqlQueryWhere)
  // console.log(gqlQueryType)
  return gql`
    query getPokemons {
      gen3_species: pokemon_v2_pokemonspecies(${gqlQuery}) {
        pokemon_v2_pokemons(limit: 1) {
          id
          name
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
              id
            }
          }
        }
      }
      gen3_species_total: pokemon_v2_pokemonspecies_aggregate (${gqlQueryWhere}){
        aggregate {
          count
        }
      }
    }
  `
}
