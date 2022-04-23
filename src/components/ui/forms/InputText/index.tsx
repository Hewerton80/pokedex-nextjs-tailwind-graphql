import { forwardRef, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ValidationError from '../../feedback/ValidationError'

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'url'
    | 'tel'
    | 'time'
    | 'datetime-local'
    | 'date'
    | 'number'
}

function InputText({ className, type = 'text', ...rest }: InputTextProps, ref: any) {
  return (
    <>
      <input
        ref={ref}
        className={cn(styles.root, 'dark:border-white/10 dark:text-light', className)}
        type={type}
        {...rest}
      />
    </>
  )
}

export default forwardRef(InputText)
