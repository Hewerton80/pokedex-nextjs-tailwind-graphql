import cn from 'classnames'
import { LabelHTMLAttributes } from 'react'

interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

function FormLabel({ children, className, required, ...rest }: FormLabelProps) {
  return (
    <label
      className={cn('text-sm text-black mb-2', 'dark:text-light', className)}
      {...rest}
    >
      {children}
      {required && <span className="text-danger">*</span>}
    </label>
  )
}

export default FormLabel
