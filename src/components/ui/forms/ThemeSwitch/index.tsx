import { InputHTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { FiSun, FiMoon } from 'react-icons/fi'
import assets from '../../../../../assets.json'
interface ThemeSwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string
}

function ThemeSwitch({ text, className, ...rest }: ThemeSwitchProps) {
  return (
    <label htmlFor={rest?.id} className={cn('flex items-center', className)}>
      <span className={cn(styles.root)}>
        <input type="checkbox" {...rest} />
        <span />
        <FiSun className={styles.sun} size={24} color={assets.colors.warning} />
        <FiMoon className={styles.moon} size={24} color={assets.colors.warning} />
        <span className={styles.cicle}></span>
      </span>
      {text && <p>{text}</p>}
    </label>
  )
}

export default ThemeSwitch
