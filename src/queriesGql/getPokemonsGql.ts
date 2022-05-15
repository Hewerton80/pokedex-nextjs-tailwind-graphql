import { gql } from '@apollo/client'
import { IpokemonFilter } from '../hooks/usePokemon'

export const getPokemonGql = ({
  perPage,
  currentPage,
  name,
  type,
  generationName,
}: IpokemonFilter) => {
  const gqlQueryOrder = `order_by: { id: asc }`
  const gqlQueryLimit = `limit: ${perPage}`
  const gqlQueryOffset = `offset: ${(Number(currentPage) - 1) * Number(perPage)}`

  const gqlQueryType = type
    ? `pokemon_v2_pokemontypes: {pokemon_v2_type: {name: {_eq: "${type}"}}}`
    : ''
  const pokemonQueryName = `${name?.trim() ? `name: {_ilike: "%${name?.trim()}%"}` : ''}`
  const gqlQueryNameAndType = `pokemon_v2_pokemons: { ${pokemonQueryName} , ${gqlQueryType} }`

  const queryPokemonGeneration = generationName
    ? `pokemon_v2_generation: {name: {_eq: "${generationName}"}}`
    : ''
  const gqlQueryWhere = `where: { ${gqlQueryNameAndType}, ${queryPokemonGeneration} }`
  const gqlQuery = `${gqlQueryOrder},${gqlQueryLimit},${gqlQueryOffset},${gqlQueryWhere}`

  return gql`
    query getPokemons {
      species: pokemon_v2_pokemonspecies(${gqlQuery}) {
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
      species_total: pokemon_v2_pokemonspecies_aggregate (${gqlQueryWhere}) {
        aggregate {
          count
        }
      }
    }
  `
}

export const getPokemonByIdGql = (id: string) => {
  return gql`
    query getPokemonById {
      species: pokemon_v2_pokemonspecies(where: { id: { _eq: ${id} } }) {
        id
        pokemon_v2_pokemons {
          pokemon_v2_pokemontypes {
            pokemon_v2_type {
              name
              id
            }
          }
          height
          base_experience
          name
          order
          id
          weight
          pokemon_v2_pokemonstats {
            effort
            base_stat
            pokemon_v2_stat {
              game_index
              is_battle_only
              move_damage_class_id
              name
            }
          }
          pokemon_v2_pokemonabilities {
            id
            slot
            is_hidden
            pokemon_v2_ability {
              name
              is_main_series
              id
              pokemon_v2_abilityeffecttexts {
                short_effect
                id
              }
            }
          }
        }
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            id
            name
          }
        }
        pokemon_v2_generation {
          name
          id
        }
        capture_rate
        base_happiness
        forms_switchable
        gender_rate
        has_gender_differences
        hatch_counter
        is_baby
        is_legendary
        is_mythical
        name
      } 
    }
  `
}
