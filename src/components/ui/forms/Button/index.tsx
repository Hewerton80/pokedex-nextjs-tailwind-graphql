import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Variant } from '../../../../types/Global'
import Spinner from '../../feedback/Spinner'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  isLoading?: boolean
}

function Button({
  children,
  className,
  isLoading = false,
  variant = 'info',
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(styles.root, 'dark:text-light', styles[variant], className)}
      {...rest}
    >
      {isLoading ? <Spinner size={18} /> : children}
    </button>
  )
}

export default Button
