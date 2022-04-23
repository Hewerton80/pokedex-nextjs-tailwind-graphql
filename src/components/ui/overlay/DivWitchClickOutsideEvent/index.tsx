import { useRef, useEffect, HTMLAttributes, DetailedHTMLProps } from 'react'

export interface DivWitchClickOutsideEventProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClickOutside?: () => void
}

function DivWitchClickOutsideEvent({
  children,
  onClickOutside,
  ...rest
}: DivWitchClickOutsideEventProps) {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!divRef.current?.contains(e.target as Node)) {
        onClickOutside?.()
      }
    }

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [onClickOutside])

  return (
    <div ref={divRef} {...rest}>
      {children}
    </div>
  )
}

export default DivWitchClickOutsideEvent
