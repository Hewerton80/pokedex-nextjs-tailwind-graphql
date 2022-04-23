import { HTMLAttributes, LiHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'

interface ListProps extends HTMLAttributes<HTMLUListElement> {}
interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  isActive?: boolean
}

export function List({ children, className, ...rest }: ListProps) {
  return (
    <ul className={cn(styles.root, className)} {...rest}>
      {children}
    </ul>
  )
}

export function ListItem({ children, className, isActive, ...rest }: ListItemProps) {
  return (
    <li
      className={cn(
        className,
        isActive && 'bg-gray-lightest dark:bg-secondary',
        'dark:hover:bg-secondary'
      )}
      {...rest}
    >
      {children}
    </li>
  )
}
