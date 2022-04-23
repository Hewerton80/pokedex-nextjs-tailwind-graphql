import cn from 'classnames'
import { HTMLAttributes } from 'react'
import styles from './styles.module.css'

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  erro?: string
}

function FormGroup({ children, className, ...rest }: FormGroupProps) {
  return (
    <div className={cn(styles.root, className)} {...rest}>
      {children}
    </div>
  )
}

export default FormGroup
