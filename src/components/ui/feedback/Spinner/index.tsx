import { ImSpinner2 } from 'react-icons/im'
import colors from 'tailwindcss/colors'
import style from './styles.module.css'
interface SpinnerProps {
  color?: string
  size?: number
}

function Spinner({ color = colors.white, size = 18 }: SpinnerProps) {
  return <ImSpinner2 className={style.root} size={size} style={{ color }} />
}

export default Spinner
