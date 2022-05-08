import { HTMLAttributes } from 'react'
import styles from './styles.module.css'
import cn from 'classnames'

interface ShimmerEffectProps extends HTMLAttributes<HTMLDivElement> {}

function ShimmerEffect({ className, ...rest }: ShimmerEffectProps) {
  return <div className={cn('shimmer', styles.root, className)} {...rest} />
}

export default ShimmerEffect
