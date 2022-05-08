import classNames from 'classnames'
import { ReactNode } from 'react'

interface TextProps {
  children?: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

function Text({ children, as = 'p', className }: TextProps) {
  if (as === 'h1') {
    return <h1 className={classNames(className)}>{children}</h1>
  } else if (as === 'h2') {
    return <h2 className={classNames(className)}>{children}</h2>
  } else if (as === 'h3') {
    return <h3 className={classNames(className)}>{children}</h3>
  } else if (as === 'h4') {
    return <h4 className={classNames(className)}>{children}</h4>
  } else if (as === 'h5') {
    return <h5 className={classNames(className)}>{children}</h5>
  } else if (as === 'h6') {
    return <h6 className={classNames(className)}>{children}</h6>
  } else if (as === 'p') {
    return <p className={classNames(className)}>{children}</p>
  } else {
    return <span>{children}</span>
  }
}

export default Text
