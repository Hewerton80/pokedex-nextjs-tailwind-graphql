import { FormHTMLAttributes } from 'react'
import cn from 'classnames'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

function Form({ children, className, ...rest }: FormProps) {
  return (
    <form className={cn('flex flex-col w-full', className)} {...rest}>
      {children}
    </form>
  )
}

export default Form
