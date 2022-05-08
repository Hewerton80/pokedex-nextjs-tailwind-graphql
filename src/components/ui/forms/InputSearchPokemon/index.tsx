import cn from 'classnames'
import styles from './styles.module.css'
import ValidationError from '../../feedback/ValidationError'
import { InputTextProps } from '../InputText'

export interface InputSearchPokemon extends InputTextProps {}

function InputSearchPokemon({ className, ...rest }: InputSearchPokemon) {
  return (
    <>
      <input
        className={cn(
          styles.root,
          'dark:bg-transparent dark:border-white/10 dark:text-light',
          className
        )}
        {...rest}
        placeholder="Buscar um Pokémon, p.ex. Pidgeot"
      />
    </>
  )
}

export default InputSearchPokemon
