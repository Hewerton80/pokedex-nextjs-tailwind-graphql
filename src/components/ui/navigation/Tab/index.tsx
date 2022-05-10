import classNames from 'classnames'
import { ReactNode, useContext } from 'react'
import styles from './styles.module.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import { Callback } from '../../../../types/Global'

interface TabProps {
  children?: ReactNode
  className?: string
}
interface TabListProps extends TabProps {}

interface TabItemProps extends TabProps {
  onClick?: Callback
  isActive?: boolean
}

interface TabPanelProps extends TabProps {}

export function TabList({ children, className }: TabListProps) {
  return (
    <nav className={classNames(className, styles.root)}>
      <ul>{children}</ul>{' '}
    </nav>
  )
}

export function TabItem({ children, className, isActive, onClick }: TabItemProps) {
  return (
    <li onClick={onClick} className={classNames(className, styles.item)}>
      <p>{children}</p>{' '}
      <IoMdArrowDropdown className={classNames(isActive && 'rotate-180')} />
    </li>
  )
}

export function TabPanel({ children, className }: TabPanelProps) {
  return <div className={classNames(className, styles.panel)}>{children}</div>
}
