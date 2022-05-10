import cn from 'classnames'
import styles from './styles.module.css'
import { Card, CardProps } from '../Card'
import { IPokemon } from '../../../../types/Pokemon'
import Text from '../../typography/Text'
import Image from 'next/image'
import { Fragment } from 'react'
import PokemonBadge from '../../dataDisplay/PokemonBadge'
import ShimmerEffect from '../../feedback/ShimmerEffect'
import { getRange } from '../../../../utils/getRange'
interface PokemonCardProps extends CardProps {
  pokemon?: IPokemon
  isLoading?: boolean
}

export function PokemonCard({
  children,
  className,
  pokemon,
  isLoading,
  ...rest
}: PokemonCardProps) {
  return (
    <Card className={cn(styles.root, className)} {...rest}>
      {isLoading ? (
        <ShimmerEffect className="max-w-[150px]" />
      ) : (
        <>
          <Text className={styles.title}>{pokemon?.name}</Text>
          <Text className={styles.id}>#{pokemon?.id}</Text>
        </>
      )}

      <div className={styles['pokemon-types']}>
        {isLoading
          ? getRange(2).map((i) => <ShimmerEffect key={'poke-type' + i} />)
          : pokemon?.types?.map((t) => (
              <Fragment key={t.id}>
                <PokemonBadge type={t?.name} />
              </Fragment>
            ))}
      </div>
      <span className={styles['img-wrapper']}>
        {isLoading ? (
          <ShimmerEffect />
        ) : (
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
            alt={pokemon?.name}
            width={112}
            height={112}
            objectFit="cover"
          />
        )}
      </span>
    </Card>
  )
}

export default PokemonCard
