import cn from 'classnames'
import { Callback } from '../../../../types/Global'
import { PokemonGenerationName } from '../../../../types/PokemonGeneration'
import { PokemonTypeName } from '../../../../types/PokemonType'
import styles from './styles.module.css'

interface PokemonBadgeProps {
  className?: string
  type?: PokemonTypeName | PokemonGenerationName
  onClick?: Callback
  size?: 'sm' | 'md' | 'lg'
}

function PokemonBadge({
  type = 'normal',
  className,
  size = 'md',
  onClick,
}: PokemonBadgeProps) {
  return (
    <span
      className={cn(
        'pokemon-badge',
        'outline-black dark:outline-white',
        styles.root,
        styles[type],
        styles[size],
        className
      )}
      onClick={onClick}
    >
      {type}
    </span>
  )
}

export default PokemonBadge
