import { HTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ children, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(styles.card, 'dark:bg-dark-card dark:border-dark-card', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...rest }: CardProps) {
  return (
    <div className={cn(styles.card_header, className)} {...rest}>
      {children}
    </div>
  )
}

export function CardActions({ children, className, ...rest }: CardProps) {
  return (
    <div className={cn(styles.card_actions, className)} {...rest}>
      {children}
    </div>
  )
}

export function CardBody({ children, className, ...rest }: CardProps) {
  return (
    <div className={cn(styles.card_body, className)} {...rest}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...rest }: CardProps) {
  return (
    <div className={cn(styles.card_title, className)} {...rest}>
      <h4 className="dark:text-light">{children}</h4>
    </div>
  )
}

export function CardFooter({ children, className, ...rest }: CardProps) {
  return (
    <div className={cn(styles.card_footer, className)} {...rest}>
      {children}
    </div>
  )
}
