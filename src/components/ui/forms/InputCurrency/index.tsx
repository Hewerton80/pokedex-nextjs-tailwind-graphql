import { addCurrencyMask } from '../../../../utils/mask'
import InputText, { InputTextProps } from '../InputText'

interface InputTextCurrencyProps extends InputTextProps {
  onChangeMaskValue?: (value: string) => void
}

function InputTextCurrency({
  className,
  onChangeMaskValue,
  ...rest
}: InputTextCurrencyProps) {
  return (
    <>
      <InputText
        {...rest}
        placeholder="00,00"
        onChange={(e) => onChangeMaskValue?.(addCurrencyMask(e.target.value))}
      />
    </>
  )
}

export default InputTextCurrency
