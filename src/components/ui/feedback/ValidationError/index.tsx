import { HTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface ValidationErrorProps extends HTMLAttributes<HTMLParagraphElement> {}

function ValidationError({ children, className, ...rest }: ValidationErrorProps) {
  return (
    <p className={cn(styles.root, className)} {...rest}>
      {children}
    </p>
  )
}

export default ValidationError
