import cn from 'classnames'
import { Callback } from '../../../../types/Global'
import { PokemonTypeNameEnum } from '../../../../types/PokemonType'
import styles from './styles.module.css'

interface PokemonTypeBadgeProps {
  className?: string
  type?: keyof typeof PokemonTypeNameEnum
  onClick?: Callback
}

function PokemonTypeBadge({
  type = 'normal',
  className,
  onClick,
}: PokemonTypeBadgeProps) {
  return (
    <span onClick={onClick} className={cn(styles.root, styles[type], className)}>
      {type}
    </span>
  )
}

export default PokemonTypeBadge
