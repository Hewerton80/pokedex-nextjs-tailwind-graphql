import { HTMLAttributes, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import ThemeSwitch from '../../ui/forms/ThemeSwitch'

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

function Header({ className, ...rest }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('dark')
    }
    localStorage.setItem('theme', 'dark')
  }, [])

  useEffect(() => {
    // const isDarkModeByOperatingSystemPreference = window.matchMedia(
    //   '(prefers-color-scheme: dark)'
    // ).matches
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  return (
    <header
      className={cn(styles.root, 'dark:bg-dark-card dark:border-white/10', className)}
      {...rest}
    >
      <div className={styles.header_inner}>
        <div className={styles.header_left}>
          <h2>Gerador de dados fakes</h2>
        </div>
        <div className={styles.header_right}>
          <ThemeSwitch
            id="theme-ThemeSwitch"
            checked={theme === 'dark'}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
