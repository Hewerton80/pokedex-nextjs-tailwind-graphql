import { SelectHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ValidationError from '../../feedback/ValidationError'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

function Select({ className, error, ...rest }: SelectProps) {
  return (
    <>
      <select
        className={cn(
          styles.root,
          error && styles.error,
          'dark:border-white/10 dark:text-light',
          className
        )}
        {...rest}
      />
      {error && <ValidationError>{error}</ValidationError>}
    </>
  )
}

export default Select
