import cn from 'classnames'
import styles from './styles.module.css'
import { Card, CardProps } from '../Card'
import { IPokemon } from '../../../../types/Pokemon'
import Text from '../../typography/Text'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
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
  const [imgSrc, setImgSrc] = useState('')

  useEffect(() => {
    if (pokemon?.id) {
      setImgSrc(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon?.id}.gif`
      )
    }
  }, [pokemon])
  return (
    <Card
      className={cn(styles.root, 'hover:bg-light dark:hover:bg-muted', className)}
      {...rest}
    >
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
          imgSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
              src={imgSrc}
              alt={pokemon?.name}
              width={50}
              height={46}
              loading="lazy"
              onError={() =>
                setImgSrc(
                  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`
                )
              }
            />
          )
        )}
      </span>
    </Card>
  )
}

export default PokemonCard
