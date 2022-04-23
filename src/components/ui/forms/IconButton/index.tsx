import Button, { ButtonProps } from '../Button'
import cn from 'classnames'

interface IconButtonProps extends ButtonProps {
  icon?: JSX.Element
}

function IconButton({ icon, className, ...rest }: IconButtonProps) {
  return (
    <Button
      className={cn('h-10 w-10 rounded-full p-0.5', className)}
      type="button"
      {...rest}
    >
      {icon}
    </Button>
  )
}

export default IconButton
