import cn from 'classnames'
import { Callback } from '../../../../types/Global'
import { PokemonGenerationName } from '../../../../types/PokemonGeneration'
import { PokemonTypeName } from '../../../../types/PokemonType'
import styles from './styles.module.css'

interface PokemonBadgeProps {
  className?: string
  type?: PokemonTypeName | PokemonGenerationName
  onClick?: Callback
}

function PokemonBadge({ type = 'normal', className, onClick }: PokemonBadgeProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'pokemon-badge',
        'outline-black dark:outline-white',
        styles.root,
        styles[type],
        className
      )}
    >
      {type}
    </span>
  )
}

export default PokemonBadge
