import DivWitchClickOutsideEvent, {
  DivWitchClickOutsideEventProps,
} from '../DivWitchClickOutsideEvent'
import cn from 'classnames'
import styles from './styles.module.css'

interface DropDownProps extends DivWitchClickOutsideEventProps {
  onClickOption?: (index: number) => void
  dropDownItens: (string | JSX.Element)[]
}

function DropDown({
  children,
  className,
  dropDownItens,
  onClickOption,
  ...rest
}: DropDownProps) {
  return (
    <DivWitchClickOutsideEvent className={cn(styles.root, className)} {...rest}>
      <ul>
        {dropDownItens.map((text, i) => (
          <li key={i} role="button" onClick={() => onClickOption?.(i)}>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </DivWitchClickOutsideEvent>
  )
}

export default DropDown
