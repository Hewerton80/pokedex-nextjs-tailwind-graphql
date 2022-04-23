import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  startTransition,
  useDeferredValue,
} from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import DivWitchClickOutsideEvent from '../../overlay/DivWitchClickOutsideEvent'
import InputText from '../InputText'
import { FaCaretDown } from 'react-icons/fa'
import { List, ListItem } from '../../dataDisplay/List'
import ValidationError from '../../feedback/ValidationError'

export interface ISelectBoxOptions {
  value: string
  text: string
}

interface SelectBoxProps {
  id?: string
  className?: string
  options: ISelectBoxOptions[]
  selectedOption: ISelectBoxOptions
  placeholder?: string
  error?: string
  disabled?: boolean
  onChange?: (value: ISelectBoxOptions) => void
}

function SelectBox({
  className,
  options,
  id,
  selectedOption = { value: '', text: '' },
  placeholder = '',
  error,
  disabled,
  onChange,
}: SelectBoxProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')

  const [filteredOptions, setFilteredOptions] = useState<ISelectBoxOptions[]>(options)

  const isFocusedDeferredValue = useDeferredValue(isFocused)

  const avaliableOptions = useMemo(() => {
    let avaliableOptionsTmp = [...options]
    if (selectedOption.value && selectedOption.text) {
      avaliableOptionsTmp = avaliableOptionsTmp.filter(
        (opt) => opt.value !== selectedOption.value
      )
      avaliableOptionsTmp = [selectedOption, ...avaliableOptionsTmp]
    }

    avaliableOptionsTmp = avaliableOptionsTmp.sort((a, b) => (a.text >= b.text ? 1 : -1))
    return avaliableOptionsTmp
  }, [options, selectedOption])

  useEffect(() => {
    startTransition(() => {
      const searchTrimmed = search.trim()
      if (searchTrimmed) {
        setFilteredOptions(() =>
          avaliableOptions.filter(({ text }) =>
            text.trim().toLowerCase().includes(searchTrimmed.toLowerCase())
          )
        )
      } else {
        setFilteredOptions(avaliableOptions)
      }
    })
  }, [search, avaliableOptions])

  const selectedValueText = useMemo(() => {
    const indexValueText = avaliableOptions.findIndex(
      (opt) => opt.value === selectedOption.value
    )
    if (indexValueText >= 0) {
      return avaliableOptions[indexValueText].text
    }
    return selectedOption.text
  }, [selectedOption, avaliableOptions])

  const handleChangeOptions = useCallback(
    (valueDate: ISelectBoxOptions) => {
      onChange?.(valueDate)
      setIsFocused(false)
    },
    [onChange]
  )

  const handleClickSearchbox = useCallback(() => {
    if (!(isFocused || disabled)) {
      setIsFocused(true)
    }
  }, [isFocused, disabled])

  const handleClickOutSide = useCallback(() => {
    if (isFocusedDeferredValue) {
      setIsFocused(false)
    }
  }, [isFocusedDeferredValue])

  return (
    <>
      <div
        id={id}
        className={cn(styles.root, disabled && styles.disabled, className)}
        role="searchbox"
        onClick={handleClickSearchbox}
      >
        <span className="dark:border-white/10">
          <p className="dark:text-light">
            {selectedValueText || <span className="text-secondary ">{placeholder}</span>}
          </p>
        </span>
        {isFocused && (
          <DivWitchClickOutsideEvent
            className="dark:bg-dark-card dark:border-white/10"
            onClickOutside={handleClickOutSide}
          >
            <span>
              <InputText
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </span>
            <List className="max-h-96 overflow-y-auto ">
              {filteredOptions.map((opt, i) => (
                <ListItem
                  key={opt.value + i}
                  className="dark:text-light"
                  role="button"
                  onClick={() =>
                    handleChangeOptions({ value: opt.value, text: opt.text })
                  }
                  isActive={selectedOption.value === opt.value}
                >
                  {opt.text}
                </ListItem>
              ))}
            </List>
          </DivWitchClickOutsideEvent>
        )}
        <FaCaretDown className={cn(isFocused && 'rotate-180')} />
      </div>
      {error && <ValidationError>{error}</ValidationError>}
    </>
  )
}

export default SelectBox
