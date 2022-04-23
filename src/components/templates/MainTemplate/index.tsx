import { HTMLAttributes, useContext } from 'react'
import cn from 'classnames'
import Header from '../../common/Header'

interface MainTemplateProps extends HTMLAttributes<HTMLDivElement> {}

function MainTemplate({ children, ...rest }: MainTemplateProps) {
  return (
    <div
      className={cn(
        'relative',
        'flex flex-col',
        'min-h-screen max-w-screen',
        'overflow-x-hidden'
      )}
      {...rest}
    >
      <Header />
      <div
        className={cn('flex', 'w-full h-full pt-[35px]', 'overflow-x-hidden')}
        style={{
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <div className="flex flex-col flex-1 px-7">{children}</div>
      </div>
    </div>
  )
}

export default MainTemplate
