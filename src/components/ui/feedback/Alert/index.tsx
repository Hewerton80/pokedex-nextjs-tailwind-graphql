import { HTMLAttributes } from 'react'
import styles from './styles.module.css'
import cn from 'classnames'
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoSadOutline,
} from 'react-icons/io5'

const variants = {
  success: {
    icon: <IoCheckmarkCircleOutline className="text-success" />,
  },
  info: {
    icon: <IoAlertCircleOutline className="text-info" />,
  },
  danger: {
    icon: <IoSadOutline className="text-danger" />,
  },
}

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant: keyof typeof variants
}

function Alert({ variant, children, className, ...rest }: AlertProps) {
  return (
    <div className={cn(styles.root, styles[variant], className)} {...rest}>
      {variants[variant].icon}
      <span>{children}</span>
    </div>
  )
}

export default Alert
